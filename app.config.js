import "dotenv/config";

export default {
  expo: {
    name: "prepcartv2",
    slug: "prepcartv2",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    splash: {
      resizeMode: "contain",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.simandoff.prepcart",
      googleServicesFile: "./google-services.json",
    },
    android: {
      package: "com.simandoff.prepcart",
      googleServicesFile: "./GoogleService-Info.plist",
    },
    web: {
      favicon: "./assets/favicon.png",
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
    },
  },
};
