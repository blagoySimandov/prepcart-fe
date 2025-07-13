import { useUserTheme } from "@/hooks/useUserTheme";
import { Alert, BackHandler, Platform, Switch, Text, View } from "react-native";
import useStyles from "../styles";

export function ThemeSwitcher() {
  const [theme, setUserTheme] = useUserTheme();
  const { styles, colors } = useStyles();

  const handleThemeChange = async (value: boolean) => {
    await setUserTheme(value ? "dark" : "light");

    // Force quit the app to ensure theme changes take effect
    setTimeout(() => {
      if (Platform.OS === "android") {
        Alert.alert(
          "Theme Changed",
          "Restarting app to apply theme changes...",
          [{ text: "OK", onPress: () => BackHandler.exitApp() }],
          { cancelable: false }
        );
      } else {
        // On iOS, we can't force quit, so show mandatory restart instruction
        Alert.alert(
          "Theme Changed",
          "Please close and reopen the app now to apply theme changes.",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
    }, 100);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Appearance</Text>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Text style={styles.settingTitle}>Dark Mode</Text>
          <Text style={styles.settingDescription}>
            Use dark theme for better viewing in low light
          </Text>
        </View>
        <Switch
          value={theme === "dark"}
          onValueChange={handleThemeChange}
          trackColor={{ false: colors.border, true: colors.tint }}
          thumbColor={Platform.OS === "ios" ? undefined : "#FFFFFF"}
        />
      </View>
    </View>
  );
}
