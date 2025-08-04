import "dotenv/config";
const runtimeVersion = "1.0.2";

export default {
  expo: {
    version: runtimeVersion,
    runtimeVersion: runtimeVersion,
    updates: {
      url: "https://u.expo.dev/bf57ef5d-3e73-4242-9426-3537b1a08a77",
      runtimeVersion: {
        policy: runtimeVersion,
      },
    },
    name: "PrepCart",
    slug: "PrepCart",
    orientation: "portrait",
    icon: "./assets/splash-screens/icon.png",
    scheme: "prepcart",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-screens/splash.png",
      resizeMode: "contain",
      backgroundColor: "#FF5631",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      runtimeVersion: runtimeVersion,
      supportsTablet: true,
      bundleIdentifier: "com.simandoff.prepcart",
      googleServicesFile: "./GoogleService-Info.plist",
      usesAppleSignIn: true,
    },
    android: {
      package: "com.simandoff.prepcart",
      googleServicesFile: "./google-services.json",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "@react-native-google-signin/google-signin",
      "@react-native-firebase/app",
      "expo-router",
      "expo-web-browser",
      "expo-av",
      "expo-video",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      [
        "expo-splash-screen",
        {
          backgroundColor: "#FF5631",
          image: "./assets/splash-screens/splash.png",
          dark: {
            image: "./assets/splash-screens/splash.png",
            backgroundColor: "#FF5631",
          },
          imageWidth: 200,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: "bf57ef5d-3e73-4242-9426-3537b1a08a77",
      },
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      typesenseApiKey: process.env.EXPO_PUBLIC_TYPESENSE_API_KEY,
    },
  },
};
