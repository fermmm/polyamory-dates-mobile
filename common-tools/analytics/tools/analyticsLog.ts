import * as Analytics from "expo-firebase-analytics";
import Constants, { AppOwnership } from "expo-constants";

/**
 * Wrapper for Analytics.logEvent() that allows disabling analytics and/or logging in console what is sent.
 * The name of the event. Should contain 1 to 40 alphanumeric characters or underscores. The name must start
 * with an alphabetic character. Some event names are reserved. The "firebase_", "google_", and "ga_" prefixes
 * are reserved and should not be used.
 */
export async function analyticsLogEvent(
   name: string,
   properties?: {
      [key: string]: any;
   }
): Promise<void> {
   console.log("///////////////////////////////////////");
   console.log(`Analytics log: ${name}`);
   if (properties != null) {
      console.log(properties);
   }
   console.log("///////////////////////////////////////");
   if (Constants.appOwnership !== AppOwnership.Expo) {
      Analytics.logEvent(name, properties);
   }
}