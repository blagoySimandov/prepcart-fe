import "dotenv/config";

export default {
  expo: {
    name: "PrepCart",
    slug: "PrepCart",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/splash-screens/icon.png",
    scheme: "prepcart",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-screens/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ff5630",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.simandoff.prepcart",
      googleServicesFile: "./GoogleService-Info.plist",
    },
    android: {
      package: "com.simandoff.prepcart",
      adaptiveIcon: {
        foregroundImage: "./assets/splash-screens/icon.png",
        backgroundColor: "#FFF8F3",
      },
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
          backgroundColor: "#232323",
          image: "./assets/splash-screens/splash.png",
          dark: {
            image: "./assets/splash-screens/splash.png",
            backgroundColor: "#232323",
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
        projectId: "d7612470-b4e7-44b8-ac5e-c9d7a9053477",
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
