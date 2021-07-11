import * as Analytics from "expo-firebase-analytics";
import Constants, { AppOwnership } from "expo-constants";
import { User } from "../../../api/server/shared-tools/endpoints-interfaces/user";
import { fromBirthDateToAge } from "../../../api/tools/date-tools";
import {
   getCisGenderName,
   getCisGendersUserIsAttractedTo,
   getGenderName,
   getGendersUserIsAttractedTo,
   isAttractedToOppositeSex
} from "../../strings/gender";

export function analyticsLogUser(user: Partial<User>) {
   if (user == null) {
      return;
   }

   /**
    * If we send props without profile completed the information
    * related with the tags will be incorrect. Example: An incomplete
    * profile has no tags subscribed, this means the user likes
    * all genders but it's not the case.
    */
   const userPropertiesAnalytics = user.profileCompleted
      ? getUserPropertiesInAnalyticsFormat(user)
      : {};

   if (Constants.appOwnership !== AppOwnership.Expo) {
      Analytics.setUserId(user.userId);
      Analytics.setUserProperties(userPropertiesAnalytics);
   }

   console.log("///////////////////////////////////////");
   console.log(`Analytics log user`);
   console.log(userPropertiesAnalytics);
   console.log("///////////////////////////////////////");
}

export function getUserPropertiesInAnalyticsFormat(user: Partial<User>): Record<string, string> {
   const userProperties = {
      country: user.country,
      age: user.birthDate ? fromBirthDateToAge(user.birthDate) : undefined,
      cityName: user.cityName,
      height: user.height,
      isCoupleProfile: user.isCoupleProfile,
      language: user.language,
      targetAgeMin: user.targetAgeMin,
      targetAgeMax: user.targetAgeMax,
      targetDistance: user.targetDistance,
      genderCis: getCisGenderName(user.tagsSubscribed ?? [], false),
      genderFull: getGenderName(user.tagsSubscribed ?? [], false, false),
      attractedToCis: getCisGendersUserIsAttractedTo(user.tagsBlocked ?? [], false),
      attractedToFull: getGendersUserIsAttractedTo(user.tagsBlocked ?? [], false),
      attractedToOppositeSex: isAttractedToOppositeSex(
         user.tagsSubscribed,
         user.tagsBlocked,
         user.isCoupleProfile
      ),
      likesGroupSex: user.tagsSubscribed.find(tag => tag.tagId === "q01-a00") != null,
      likesFeminism: user.tagsSubscribed.find(tag => tag.tagId === "q00-a00") != null,
      likesToMeetPeopleAndNotSpam: user.tagsSubscribed.find(tag => tag.tagId === "q02-a01") != null,
      blocksPeopleWhoLikesGroupSex: user.tagsBlocked.find(tag => tag.tagId === "q01-a00") != null,
      blocksPeopleWhoDontLikeGroupSex:
         user.tagsBlocked.find(tag => tag.tagId === "q01-a01") != null,
      blocksPeopleWhoLikesFeminism: user.tagsBlocked.find(tag => tag.tagId === "q00-a00") != null,
      blocksPeopleWhoDontLikeFeminism:
         user.tagsBlocked.find(tag => tag.tagId === "q00-a01") != null,
      blocksPeopleWhoWantsToPromote: user.tagsBlocked.find(tag => tag.tagId === "q02-a00") != null
   };

   /**
    * Removed undefined values and converts all to string before sending.
    */
   const userPropertiesReadyToSend: Record<string, string> = {};
   Object.keys(userProperties).forEach(key => {
      if (
         userProperties[key] == null ||
         userProperties[key] === "" ||
         (Array.isArray(userProperties[key]) && userProperties[key].length === 0)
      ) {
         return;
      }

      userPropertiesReadyToSend[key] = String(userProperties[key]);
   });

   return userPropertiesReadyToSend;
}