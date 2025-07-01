import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/src/auth/hooks";
import { useNotificationSettings } from "@/src/notifications";
import { useUserService, useUserStatistics } from "@/src/user";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { NotificationSettings } from "./components/notification-settings";
import { ProfileActions } from "./components/profile-actions";
import { ProfileHeader } from "./components/profile-header";
import { UserStatistics } from "./components/user-statistics";
import useStyles from "./styles";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const userService = useUserService();
  const [profile, setProfile] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const { styles } = useStyles();
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
        showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <ProfileHeader profile={profile} />
          <UserStatistics userStats={userStats || undefined} />
          <NotificationSettings
            notificationsEnabled={notificationsEnabled}
            shoppingReminders={shoppingReminders}
            toggleNotifications={toggleNotifications}
            setShoppingReminders={setShoppingReminders}
          />
          <ProfileActions signOut={signOut} />
        </SafeAreaView>
      </ScrollView>
    </ThemedView>
  );
}
