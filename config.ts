import * as Notifications from "expo-notifications";
import { ThemeExt } from "./common-tools/themes/types/Themed";
import WhiteTheme from "./common-tools/themes/WhiteTheme";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////  APPEARANCE  //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Set the theme changing this variable, current themes available:
 * ThemeFemaleColors
 * LightTheme
 * DarkTheme
 *
 * */
export const currentTheme: ThemeExt = (WhiteTheme as unknown) as ThemeExt;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  REGISTRATION  /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The amount of images the users can upload to their profile.
 * If you are going to increase the amount make sure the server supports it.
 */
export const PROFILE_IMAGES_AMOUNT = 6;

/**
 * If USE_AUTOMATIC_TARGET_AGE is true then the target age is the user age +- this value
 */
export const AUTOMATIC_TARGET_AGE: number = 10;

export const MIN_AGE_ALLOWED: number = 18;
export const MAX_AGE_ALLOWED: number = 179;

/**
 * Distances values available in KM
 */
export const AVAILABLE_DISTANCES: number[] = [50, 70, 90, 200, 600, 1000];

/**
 * If USE_AUTOMATIC_TARGET_DISTANCE is true then the target distance is this value. It must be a value from
 * the previous setting array.
 */
export const DEFAULT_TARGET_DISTANCE: number = 90;

/**
 * Allow the user to change the aspect ratio of the images, bad for profile page design but the users
 * have more freedom to get the best image
 */
export const LOCK_IMAGES_ASPECT_RATIO: boolean = true;

/**
 * Only works if LOCK_IMAGES_ASPECT_RATIO = true. The aspect ratio can be configured here. It's recommended
 * that the aspect ratio fits the design of the profile page.
 */
export const IMAGES_ASPECT_RATIO: [number, number] = [4, 4];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////  NOTIFICATIONS  /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const PUSH_NOTIFICATIONS_CHANNELS = [
   {
      id: "default",
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: currentTheme.colors.deviceNotificationLed
   }
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////  PERFORMANCE  /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RESIZE_IMAGE_BEFORE_UPLOADING_TO_WIDTH: number = 512;
export const IMAGE_QUALITY_WHEN_UPLOADING: number = 0.9;
// How many cards left for evaluation before calling for more cards in the background
export const REQUEST_MORE_CARDS_ANTICIPATION: number = 10;
// How often in time the user evaluations are sent to the server in milliseconds
export const REQUEST_MORE_CARDS_AFTER_TIME: number = 60 * 1000;
// The maximum amount of user evaluations pending to send before sending them
export const MAX_ATTRACTIONS_QUEUE_SIZE: number = 35;
// How often group list refreshes, this also reveals new groups to the user
export const NOTIFICATIONS_REFRESH_INTERVAL: number = 1 * 60 * 1000;
// When the user is on the group page the voting results may change and needs to be updated often
export const VOTING_RESULT_REFRESH_INTERVAL: number = 2 * 60 * 1000;
// How often chat is refreshed
export const CHAT_REFRESH_INTERVAL: number = 6 * 1000;
// How often the badge of unread chat messages is refreshed when the user is on the group page
export const UNREAD_CHAT_BADGE_REFRESH_INTERVAL: number = 12 * 1000;
