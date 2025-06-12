export default {
  expo: {
    name: "prepcartv2",
    slug: "prepcartv2",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      firebaseApiKey: "AIzaSyCv-NV0p8JX2o2qzuyHeTHJhhpfAIXW1xY",
      firebaseAuthDomain: "prepcart-prod.firebaseapp.com",
      firebaseProjectId: "prepcart-prod",
      firebaseStorageBucket: "prepcart-prod.firebasestorage.app",
      firebaseMessagingSenderId: "60659278182",
      firebaseAppId: "1:60659278182:web:90b5b603a46cf22a1968a7",
      firebaseMeasurementId: "G-LGPYPWN70K",
    },
  },
};
