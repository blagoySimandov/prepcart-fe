import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuth } from "@/src/auth/hooks";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const { signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();
  const tint = useThemeColor({}, "tint");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/(tabs)");
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  if (loading || user) {
    return null;
  }

  return (
    <ThemedView style={{ ...styles.container }}>
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

      <TouchableOpacity
        style={[styles.button, { backgroundColor: tint }]}
        onPress={handleSignIn}
      >
        <ThemedText type="defaultSemiBold" lightColor="#fff" darkColor="#000">
          Sign in with Google
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 50,
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
});
