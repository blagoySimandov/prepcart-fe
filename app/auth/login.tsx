import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "./hooks";

export default function LoginScreen() {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      console.log("Starting Google sign in...");
      const result = await signInWithGoogle();
      console.log("Sign in successful:", result);

      if (result.user) {
        console.log("Redirecting to tabs...");
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  // If user is already authenticated, redirect to tabs
  if (user) {
    console.log("User already authenticated, redirecting...");
    router.replace("/(tabs)");
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PrepCart</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
