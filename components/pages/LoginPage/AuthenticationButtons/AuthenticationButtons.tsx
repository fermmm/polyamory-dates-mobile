import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { UseAuthentication } from "../../../../api/authentication/useAuthentication";
import { useServerInfo } from "../../../../api/server/server-info";
import { AuthenticationProvider } from "../../../../api/server/shared-tools/authentication/AuthenticationProvider";
import {
   LoginStep,
   logAnalyticsLoginStep
} from "../../../../common-tools/analytics/loginPage/loginSteps";
import { useTheme } from "../../../../common-tools/themes/useTheme/useTheme";
import { Styles } from "../../../../common-tools/ts-tools/Styles";
import { currentTheme } from "../../../../config";
import ButtonStyled from "../../../common/ButtonStyled/ButtonStyled";

interface PropsAuthenticationButtons {
   show: boolean;
   authentication: UseAuthentication;
}

export const AuthenticationButtons: FC<PropsAuthenticationButtons> = props => {
   const { authentication, show } = props;
   const { getNewToken } = authentication;
   const { data: serverInfo, isLoading: isLoadingServerInfo } = useServerInfo();
   const { colors } = useTheme();
   const color = colors.textLogin;
   const facebookLoginAvailable =
      Boolean(process.env.FACEBOOK_APP_ID) && Boolean(process.env.FACEBOOK_APP_NAME);
   const googleLoginAvailable = Boolean(process.env.GOOGLE_CLIENT_WEB_EXPO);

   const anyLoginAvailable =
      facebookLoginAvailable || googleLoginAvailable || serverInfo.emailLoginEnabled;

   const handleGoogleButtonPress = () => {
      getNewToken(AuthenticationProvider.Google);
      logAnalyticsLoginStep(LoginStep.ClickedLoginButtonGl);
   };

   const handleFacebookButtonPress = () => {
      getNewToken(AuthenticationProvider.Facebook);
      logAnalyticsLoginStep(LoginStep.ClickedLoginButtonFb);
   };

   const handleEmailButtonPress = () => {
      getNewToken(AuthenticationProvider.Email);
      logAnalyticsLoginStep(LoginStep.ClickedLoginButtonMl);
   };

   if (!show) {
      return null;
   }

   if (isLoadingServerInfo) {
      return null;
   }

   return (
      <View style={styles.mainContainer}>
         {googleLoginAvailable && (
            <ButtonStyled
               color={color}
               style={styles.button}
               contentStyle={styles.buttonContent}
               icon={() => <Icon name={"google"} color={color} size={22} />}
               onPress={handleGoogleButtonPress}
            >
               Iniciar sesión con Google
            </ButtonStyled>
         )}
         {facebookLoginAvailable && (
            <ButtonStyled
               color={color}
               style={styles.button}
               contentStyle={styles.buttonContent}
               icon={() => <Icon name={"facebook"} color={color} size={23} />}
               onPress={handleFacebookButtonPress}
            >
               Iniciar sesión con Facebook
            </ButtonStyled>
         )}
         {serverInfo.emailLoginEnabled && (
            <ButtonStyled
               color={color}
               style={styles.button}
               contentStyle={styles.buttonContent}
               icon={() => <Icon name={"email-outline"} color={color} size={23} />}
               onPress={handleEmailButtonPress}
            >
               Iniciar sesión con tu email
            </ButtonStyled>
         )}
         {!anyLoginAvailable && (
            <Text style={styles.errorText}>
               Error: No login providers configured, you must create and complete the .env file.
            </Text>
         )}
      </View>
   );
};

const styles: Styles = StyleSheet.create({
   mainContainer: {
      alignItems: "center",
      width: "100%"
   },
   button: {
      borderColor: currentTheme.colors.textLogin,
      width: "100%"
   },
   buttonContent: {
      justifyContent: "flex-start"
   },
   errorText: {
      color: currentTheme.colors.textLogin
   }
});
