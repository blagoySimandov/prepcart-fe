import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/src/auth/hooks";
import { useNotificationSettings } from "@/src/notifications";
import { useUserService, useUserStatistics } from "@/src/user";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useStyles from "./styles";
const HELP_AND_SUPPORT_LINK = "https://prepcart.com/help";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const userService = useUserService();
  const [profile, setProfile] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const { styles, colors } = useStyles();
  const { stats: userStats } = useUserStatistics();
  const {
    notificationsEnabled,
    shoppingReminders,
    toggleNotifications,
    setShoppingReminders,
  } = useNotificationSettings();

  useEffect(() => {
    const fetchProfile = async () => {
      if (userService) {
        setIsLoadingProfile(true);
        const userProfile = await userService.getProfile();
        setProfile(userProfile);
        setIsLoadingProfile(false);
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
  const handleHelpAndSupport = () => {
    Linking.openURL(HELP_AND_SUPPORT_LINK);
  };

  if (isLoadingProfile || !profile) {
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
                {Object.entries(userStats?.totalSavings || {})
                  .map(
                    ([currency, amount]) =>
                      `${(amount as number).toFixed(2)} ${currency}`,
                  )
                  .join("\n") || "0.00"}
              </Text>
              <Text style={styles.statLabel}>Total Savings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {userStats?.totalDiscoveredDiscounts || 0}
              </Text>
              <Text style={styles.statLabel}>Discounts Found</Text>
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
          </View>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleHelpAndSupport}
          >
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
