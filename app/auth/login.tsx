import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuth } from "@/src/auth/hooks";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
  const tint = useThemeColor({}, "tint");
  const styles = useStyles();
  const [isAnonymous, setIsAnonymous] = useState<boolean | null>(null);
  const [showDisplayNamePrompt, setShowDisplayNamePrompt] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");

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

  const handleSaveDisplayName = async () => {
    if (!displayName.trim()) {
      Alert.alert("Invalid Name", "Please enter a valid display name.");
      return;
    }

    try {
      await updateDisplayName(displayName.trim());
      setShowDisplayNamePrompt(false);
      router.replace("/(tabs)" as any);
    } catch (error) {
      console.error("Error updating display name:", error);
      Alert.alert("Error", "Failed to update display name. Please try again.");
    }
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
          <TouchableOpacity
            style={[styles.button, { backgroundColor: tint }]}
            onPress={handleGoogleSignIn}>
            <ThemedText
              type="defaultSemiBold"
              lightColor="#fff"
              darkColor="#000">
              Sign in with Google
            </ThemedText>
          </TouchableOpacity>

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

      {/* Display Name Prompt Modal */}
      <Modal
        visible={showDisplayNamePrompt}
        transparent
        animationType="fade"
        onRequestClose={handleSkipDisplayName}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor }]}>
            <ThemedText type="title" style={styles.modalTitle}>
              Add Your Name
            </ThemedText>
            <ThemedText type="default" style={styles.modalSubtitle}>
              Help others recognize you by adding your display name (optional)
            </ThemedText>

            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor: borderColor || "#ccc",
                  color: textColor,
                  backgroundColor: backgroundColor,
                },
              ]}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Enter your name"
              placeholderTextColor={textColor ? `${textColor}80` : "#999"}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleSaveDisplayName}
            />

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.skipButton,
                  { borderColor: borderColor || "#ccc" },
                ]}
                onPress={handleSkipDisplayName}>
                <ThemedText type="defaultSemiBold">Skip</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.saveButton,
                  { backgroundColor: tint },
                ]}
                onPress={handleSaveDisplayName}>
                <ThemedText
                  type="defaultSemiBold"
                  lightColor="#fff"
                  darkColor="#000">
                  Save
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
