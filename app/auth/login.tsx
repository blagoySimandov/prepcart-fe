import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuth } from "@/src/auth/hooks";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, Platform, View } from "react-native";
import { CountrySelectionModal } from "./components/country-selection-modal";
import { DisplayNameModal } from "./components/display-name-modal";
import { GoogleSignButton } from "./components/google-sign-button";
import { useStyles } from "./styles";

enum OnboardingStep {
  NONE = "none",
  DISPLAY_NAME = "display_name",
  COUNTRY = "country",
  COMPLETE = "complete",
}

export default function LoginScreen() {
  const {
    signInWithGoogle,
    signInWithApple,
    updateDisplayName,
    updateUserCountry,
    checkUserHasCountry,
    user,
    loading,
  } = useAuth();
  const router = useRouter();
  const styles = useStyles();
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>(OnboardingStep.NONE);
  const [isAnonymous, setIsAnonymous] = useState<boolean | null>(null);
  const backgroundColor = useThemeColor({}, "background");

  const startOnboardingFlow = useCallback(async () => {
    try {
      if (isAnonymous) {
        setOnboardingStep(OnboardingStep.DISPLAY_NAME);
        return;
      }

      const hasCountry = await checkUserHasCountry();
      if (!hasCountry) {
        setOnboardingStep(OnboardingStep.COUNTRY);
      } else {
        setOnboardingStep(OnboardingStep.COMPLETE);
      }
    } catch (error) {
      console.error("Error checking onboarding requirements:", error);
      setOnboardingStep(OnboardingStep.COMPLETE);
    }
  }, [isAnonymous, checkUserHasCountry]);

  useEffect(() => {
    if (!loading && user && onboardingStep === OnboardingStep.NONE) {
      startOnboardingFlow();
    }
  }, [user, loading, onboardingStep, startOnboardingFlow]);

  useEffect(() => {
    if (onboardingStep === OnboardingStep.COMPLETE) {
      router.replace("/(tabs)" as any);
    }
  }, [onboardingStep, router]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setIsAnonymous(false); //google sign in is never anonymous
    } catch (error) {
      console.error("Google Sign in error:", error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const { isAnonymous } = await signInWithApple();
      setIsAnonymous(isAnonymous);
    } catch (error) {
      console.error("Apple Sign in error:", error);
    }
  };

  const handleSaveDisplayName = async (displayName: string) => {
    try {
      await updateDisplayName(displayName);
      // Check if we need to ask for country next
      const hasCountry = await checkUserHasCountry();
      if (!hasCountry) {
        setOnboardingStep(OnboardingStep.COUNTRY);
      } else {
        setOnboardingStep(OnboardingStep.COMPLETE);
      }
    } catch (error) {
      console.error("Error saving display name:", error);
      setOnboardingStep(OnboardingStep.COMPLETE);
    }
  };

  const handleSkipDisplayName = async () => {
    try {
      // Check if we need to ask for country next
      const hasCountry = await checkUserHasCountry();
      if (!hasCountry) {
        setOnboardingStep(OnboardingStep.COUNTRY);
      } else {
        setOnboardingStep(OnboardingStep.COMPLETE);
      }
    } catch (error) {
      console.error("Error checking country:", error);
      setOnboardingStep(OnboardingStep.COMPLETE);
    }
  };

  const handleSelectCountry = async (country: string) => {
    try {
      await updateUserCountry(country);
      setOnboardingStep(OnboardingStep.COMPLETE);
    } catch (error) {
      console.error("Error saving country:", error);
      setOnboardingStep(OnboardingStep.COMPLETE);
    }
  };

  const handleSkipCountry = () => {
    setOnboardingStep(OnboardingStep.COMPLETE);
  };

  if (loading || (user && onboardingStep === OnboardingStep.COMPLETE)) {
    return null;
  }

  return (
    <>
      <ThemedView style={{ ...styles.container, backgroundColor }}>
        <Image
          source={require("../../assets/splash-screens/icon-circle.png")}
          style={styles.logo}
        />
        <ThemedText type="title" style={styles.title}>
          Welcome to PrepCart
        </ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Sign in to continue
        </ThemedText>

        <View style={styles.buttonsContainer}>
          <GoogleSignButton onPress={handleGoogleSignIn} />

          {Platform.OS === "ios" && (
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={styles.appleButton}
              onPress={handleAppleSignIn}
            />
          )}
        </View>
      </ThemedView>

      <DisplayNameModal
        visible={onboardingStep === OnboardingStep.DISPLAY_NAME}
        onSave={handleSaveDisplayName}
        onSkip={handleSkipDisplayName}
      />

      <CountrySelectionModal
        visible={onboardingStep === OnboardingStep.COUNTRY}
        onSelect={handleSelectCountry}
        onSkip={handleSkipCountry}
      />
    </>
  );
}
