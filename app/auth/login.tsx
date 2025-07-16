import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuth } from "@/src/auth/hooks";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Platform, View } from "react-native";
import { DisplayNameModal } from "./components/display-name-modal";
import { GoogleSignButton } from "./components/google-sign-button";
import { useStyles } from "./styles";

export default function LoginScreen() {
  const {
    signInWithGoogle,
    signInWithApple,
    updateDisplayName,
    user,
    loading,
  } = useAuth();
  const router = useRouter();
  const styles = useStyles();
  const [isAnonymous, setIsAnonymous] = useState<boolean | null>(null);
  const [showDisplayNamePrompt, setShowDisplayNamePrompt] = useState(false);
  const backgroundColor = useThemeColor({}, "background");

  useEffect(() => {
    if (!loading && user && !showDisplayNamePrompt) {
      if (isAnonymous) {
        setShowDisplayNamePrompt(true);
      } else {
        router.replace("/(tabs)" as any);
      }
    }
  }, [user, loading, router, isAnonymous, showDisplayNamePrompt]);

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
    await updateDisplayName(displayName);
    setShowDisplayNamePrompt(false);
    router.replace("/(tabs)" as any);
  };

  const handleSkipDisplayName = () => {
    setShowDisplayNamePrompt(false);
    router.replace("/(tabs)" as any);
  };

  if (loading || (user && !showDisplayNamePrompt && !isAnonymous)) {
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
        visible={showDisplayNamePrompt}
        onSave={handleSaveDisplayName}
        onSkip={handleSkipDisplayName}
      />
    </>
  );
}
