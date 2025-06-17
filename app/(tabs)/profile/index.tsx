import { useNotificationSettings } from "@/src/notifications";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/src/auth/hooks";
import { useUserService } from "@/src/user";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useStyles from "./styles";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const userService = useUserService();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { styles, colors } = useStyles();
  const {
    notificationsEnabled,
    shoppingReminders,
    cookingReminders,
    toggleNotifications,
    setShoppingReminders,
    setCookingReminders,
  } = useNotificationSettings();

  useEffect(() => {
    const fetchProfile = async () => {
      if (userService) {
        setIsLoading(true);
        const userProfile = await userService.getProfile();
        setProfile(userProfile);
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [userService]);

  const formatDate = (date: Date) => {
    if (!date) return "";
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
        onPress: signOut,
      },
    ]);
  };

  if (isLoading || !profile) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View style={styles.profileHeader}>
            {profile.photoURL ? (
              <Image source={{ uri: profile.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {profile.displayName
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </Text>
              </View>
            )}
            <Text style={styles.userName}>{profile.displayName}</Text>
            <Text style={styles.userEmail}>{profile.email}</Text>
            <Text style={styles.memberSince}>
              Member since {formatDate(profile.createdAt?.toDate())}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {profile.recipesImported || 0}
              </Text>
              <Text style={styles.statLabel}>Recipes Imported</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {profile.shoppingListsCreated || 0}
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
