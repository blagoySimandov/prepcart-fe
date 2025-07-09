import React from "react";
import { Platform, Switch, Text, View } from "react-native";
import useStyles from "../styles";

interface NotificationSettingsProps {
  notificationsEnabled: boolean;
  shoppingReminders: boolean;
  toggleNotifications: (enabled: boolean) => void;
  setShoppingReminders: (enabled: boolean) => void;
}

export function NotificationSettings({
  notificationsEnabled,
  shoppingReminders,
  toggleNotifications,
  setShoppingReminders,
}: NotificationSettingsProps) {
  const { styles, colors } = useStyles();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Notifications</Text>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Text style={styles.settingTitle}>Push Notifications</Text>
          <Text style={styles.settingDescription}>
            Enable notifications for reminders and updates
          </Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: colors.border, true: colors.tint }}
          thumbColor={Platform.OS === "ios" ? undefined : "#FFFFFF"}
        />
      </View>

      <View
        style={[
          styles.settingItem,
          !notificationsEnabled && styles.disabledSetting,
        ]}
      >
        <View style={styles.settingLeft}>
          <Text style={styles.settingTitle}>Shopping Reminders</Text>
          <Text style={styles.settingDescription}>
            Get reminded about your shopping lists
          </Text>
        </View>
        <Switch
          value={shoppingReminders && notificationsEnabled}
          onValueChange={setShoppingReminders}
          disabled={!notificationsEnabled}
          trackColor={{ false: colors.border, true: colors.tint }}
          thumbColor={Platform.OS === "ios" ? undefined : "#FFFFFF"}
        />
      </View>
    </View>
  );
}
