import { AlertProvider } from "@/components/providers/alert-provider";
import "@/firebaseConfig";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RemoteConfigProvider } from "@/src/remote-config/context";
import { UserServiceProvider } from "@/src/user";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <RemoteConfigProvider>
      <UserServiceProvider>
        <AlertProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </AlertProvider>
      </UserServiceProvider>
    </RemoteConfigProvider>
  );
}
