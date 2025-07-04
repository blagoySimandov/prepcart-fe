import "@/firebaseConfig";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AlertProvider } from "@/components/providers/AlertProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RemoteConfigProvider } from "@/src/remote-config/context";
import { UserServiceProvider } from "@/src/user";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <RemoteConfigProvider>
      <UserServiceProvider>
        <AlertProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </AlertProvider>
      </UserServiceProvider>
    </RemoteConfigProvider>
  );
}
