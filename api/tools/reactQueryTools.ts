import { Method } from "axios";
import I18n from "i18n-js";
import { Alert, LogBox, AppState } from "react-native";
import { QueryClient, QueryObserverResult, UseMutationOptions, focusManager } from "react-query";
import { AxiosRequestConfigExtended, httpRequest, tryToGetErrorMessage } from "./httpRequest";

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: Infinity
      },
      mutations: {}
   }
});
LogBox.ignoreLogs(["Setting a timer"]);

/**
 * This replaces the default focus manager (browser compatible) with a react native focus manager
 */
focusManager.setEventListener(setFocus => {
   const handleAppStateChange = appState => {
      if (appState === "active") {
         setFocus();
      }
   };

   AppState.addEventListener("change", handleAppStateChange);

   return () => {
      AppState.removeEventListener("change", handleAppStateChange);
   };
});

export async function defaultRequestFunction<D = void, R = void>(
   url: string,
   method: Method,
   data?: D
): Promise<R> {
   const axiosObject: AxiosRequestConfigExtended = {
      url,
      method
   };

   // Get requests does not support data object, only params
   if (method.toLowerCase() === "get") {
      axiosObject.params = data;
   } else {
      axiosObject.data = data;
   }

   return httpRequest<R>(axiosObject);
}

export function defaultErrorHandler<T>(
   queryResult: QueryObserverResult<T>
): QueryObserverResult<T> {
   if (!queryResult.isError) {
      return queryResult;
   }
   const error = (queryResult as QueryObserverResult<T, RequestError>).error;
   if (error.response == null) {
      Alert.alert(
         "ಠ_ಠ",
         I18n.t("There seems to be a connection problem"),
         [
            {
               text: I18n.t("Try again"),
               onPress: async () => queryResult.refetch()
            }
         ],
         { cancelable: __DEV__ }
      );
   } else {
      Alert.alert(
         I18n.t("Error"),
         tryToGetErrorMessage(error),
         [
            {
               text: I18n.t("OK")
            }
         ],
         { cancelable: true }
      );
   }

   return queryResult;
}

export function defaultErrorHandlerForMutations<T>(
   options: UseMutationOptions<void, RequestError, T, unknown>
): UseMutationOptions<void, RequestError, T, unknown> {
   const newOptions = { ...options };
   newOptions.onError = error => {
      Alert.alert(
         I18n.t("Error"),
         tryToGetErrorMessage(error),
         [
            {
               text: I18n.t("OK")
            }
         ],
         { cancelable: true }
      );
   };
   return newOptions;
}

export function invalidateQueriesInOptions<T = void>(
   queriesList: string[],
   options: UseMutationOptions<void, RequestError, T>
): UseMutationOptions<void, RequestError, T> {
   const newOptions = { ...options };
   if (queriesList == null || queriesList.length === 0) {
      return newOptions;
   }

   newOptions.onSuccess = (data, variables, context) => {
      if (newOptions?.onSuccess != null) {
         newOptions.onSuccess(data, variables, context);
      }
      invalidateQueriesMultiple(queriesList);
   };
   return newOptions;
}

export function invalidateQueriesMultiple(queriesList: string[]) {
   queriesList.forEach(query => queryClient.invalidateQueries(query));
}

export function defaultOptionsForMutations<T>(props: {
   queriesToInvalidate?: string[];
   extraOptions?: MutationExtraOptions;
   options: UseMutationOptions<void, RequestError, T>;
}): UseMutationOptions<void, RequestError, T> {
   const { queriesToInvalidate, extraOptions, options = {} } = props;
   let newOptions = defaultErrorHandlerForMutations(options);
   newOptions =
      extraOptions?.autoInvalidateQueries === false
         ? options
         : invalidateQueriesInOptions(queriesToInvalidate, newOptions);
   return newOptions;
}

export interface RequestError {
   message: string;
   response: any;
}

export interface MutationExtraOptions {
   autoInvalidateQueries?: boolean;
}
