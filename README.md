# Poly - Mobile Android / IOS app.

This project uses TypeScript + React Native + Expo with "bare" workflow (not the "managed" workflow).

## Installation

1. Make sure you have Node.js installed at least version 14, to verify run `node -v`. If you don't have it download from nodejs.org or better: [using NVM (Node Version Manager)](https://tecadmin.net/install-nodejs-with-nvm/)

2. Clone the repo, in the repo folder run `npm install`

3. Duplicate the file `.env.example` and rename it: `.env`. In Linux and MacOS you can use this command: 
  `cp .env.example .env`.

4. Create an empty file named `google-services.json` in the root of the project (where .env file is located).
This is required by expo to compile, the file will be empty but you will replace it with a real one when you publish the app in the future.

5. Install "Expo Go" app from your phone store, you will need it to test the app in your phone.

6. The login on this app works with Facebook and/or Google and you need to do some work to get any of the login systems up and running. The easiest to configure is Facebook: Create a Facebook app as Facebook developer and then use your app info to complete `FACEBOOK_APP_ID` and `FACEBOOK_APP_NAME` in the .env file. Also add `rRW++LUjmZZ+58EbN5DVhGAnkX4=` on the "Key Hashes" field in your Facebook app configuration (required to authorize Expo Go to use your Facebook app). [More info here](https://docs.expo.io/versions/v36.0.0/sdk/facebook/#registering-your-app-with-facebook).

7. Open the Android folder with Android Studio, that will trigger a downloading of many things required to build the project and also packages required by Android Studio and the emulator.

8. **(Optional)** Setup Google login: [Open this link](https://docs.expo.io/guides/authentication/#development-in-the-expo-go-app), follow the instructions under "Development in the Expo Go app" and "Android Native". First you may need to create the app in Google Cloud Platform. If you see an instruction that says "select 'Generate new keystore' option" don't follow it, it's incorrect and dangerous. Complete the .env file with the keys you get when following those steps, both keys should look like: ```123456789123-abcd123abcd123abcd123abcd123abcd123.apps.googleusercontent.com```

----

## Start coding and testing

```
npm start
```
This displays a QR. On Android Scan the QR with the Expo Go app. In IOS create an Expo account.

----

## Run in emulator:

```
npm run start:native
```

In another terminal:

```
npm run emulator:android
```

## Make a release build

To make a release build you must open at least once the android folder with Android Studio because it installs required packages. Also you must run ```npm run emulator:android``` at least once because also installs some required packages. After that you must follow these steps:

1. Download a keystore or generate one if you don't have it using the credentials manager:  ```npm run credentials```
2. When finished previous step you should get a .jks file, and the 3 passwords required to use this file, these are called: "Store password", "Key alias" and "Key password".
3. Rename the .jks file to upload_keystore.jks and move it to the android folder
4. Create a file inside the android folder called keystore.properties with the following content (don't use any quotes ""):

```
  storeFile=../upload_keystore.jks
  storePassword=THE STORE PASSWORD FROM STEP 2
  keyAlias=THE KEY ALIAS FROM STEP 2
  keyPassword=THE KEY PASSWORD FROM STEP 2
```

Create .apk file:
```
npm run build:apk
```
The build will be on android/app/build/outputs/apk/release

Create bundle .aab to upload to Google Play
```
npm run build:bundle
```
The build will be on android/app/build/outputs/bundle/release

----

## Make a quick update

```
npm run publish
```
This will download the latest code when booting the app and run it at restart if the code finished downloading in the background. Useful to send updates without requiring the users to go to Google Play. Some native code changes require a new .apk/.pem traditional update.
Also new installations comes with the code at the moment of .apk/.pem build. So they will run the old version at first boot, to prevent this you still have to upload each new version to Google Play.  

----

## Publishing the app

For final build and publishing of the app you may find useful the [instructions on the Expo documentation](https://docs.expo.io/distribution/introduction/). Also before publishing the app the following tasks are required:

1. **Facebook login**: In the last part of step 6 in the installation process of this readme you added the Expo Go "Facebook Key Hash" in your Facebook app settings, that is the key hash to authorize the Expo Go app to login with your Facebook app. When building your standalone .apk or .pem it has it's own Facebook Key Hash, you need to also authorize that. To get the Facebook Key Hash of your build run `expo fetch:android:hashes`, and repeat the last part of step 6 with that key.

2. **Push notifications**: Push notifications works on Expo Go but in the built app you need to read and follow instructions under "Credentials" on [this page](https://docs.expo.io/push-notifications/push-notifications-setup/#credentials). After that you need to follow instructions on [this page](https://docs.expo.io/push-notifications/using-fcm/), and don't forget to follow instructions on the section "Uploading Server Credentials".
