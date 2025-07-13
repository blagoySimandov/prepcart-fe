import { useUserTheme } from "@/hooks/useUserTheme";
import { Appearance, Platform, Switch, Text, View } from "react-native";
import useStyles from "../styles";

export function ThemeSwitcher() {
  const [theme, setUserTheme] = useUserTheme();
  const { styles, colors } = useStyles();

  const handleThemeChange = async (isDarkTheme: boolean) => {
    await setUserTheme(isDarkTheme ? "dark" : "light");
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
