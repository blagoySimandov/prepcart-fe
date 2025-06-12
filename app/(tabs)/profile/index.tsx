import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUserProfile } from "./hooks";
import useStyles from "./styles";
import { useNotificationSettings } from "@/app/notifications";

export default function ProfileScreen() {
  const { profile } = useUserProfile();
  const { styles, colors } = useStyles();
  const {
    notificationsEnabled,
    shoppingReminders,
    cookingReminders,
    toggleNotifications,
    setShoppingReminders,
    setCookingReminders,
  } = useNotificationSettings();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {},
      },
    ]);
  };

  //TODO: Divide into components
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>
            <Text style={styles.userName}>{profile.name}</Text>
            <Text style={styles.userEmail}>{profile.email}</Text>
            <Text style={styles.memberSince}>
              Member since {formatDate(profile.memberSince)}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.recipesImported}</Text>
              <Text style={styles.statLabel}>Recipes Imported</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {profile.shoppingListsCreated}
              </Text>
              <Text style={styles.statLabel}>Shopping Lists</Text>
            </View>
          </View>

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

            <View
              style={[
                styles.settingItem,
                !notificationsEnabled && styles.disabledSetting,
              ]}
            >
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Cooking Reminders</Text>
                <Text style={styles.settingDescription}>
                  Get suggestions for when to cook your recipes
                </Text>
              </View>
              <Switch
                value={cookingReminders && notificationsEnabled}
                onValueChange={setCookingReminders}
                disabled={!notificationsEnabled}
                trackColor={{ false: colors.border, true: colors.tint }}
                thumbColor={Platform.OS === "ios" ? undefined : "#FFFFFF"}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol name="person.circle" size={24} color={colors.tint} />
            <Text style={[styles.actionButtonText, styles.editProfileText]}>
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol name="gear" size={24} color={colors.icon} />
            <Text style={[styles.actionButtonText, { color: colors.text }]}>
              App Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol
              name="questionmark.circle"
              size={24}
              color={colors.icon}
            />
            <Text style={[styles.actionButtonText, { color: colors.text }]}>
              Help & Support
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleSignOut}>
            <IconSymbol
              name="door.left.hand.open"
              size={24}
              color={colors.error}
            />
            <Text style={[styles.actionButtonText, styles.signOutText]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </ThemedView>
  );
}
