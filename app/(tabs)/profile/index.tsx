import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/src/auth/hooks";
import { useNotificationSettings } from "@/src/notifications";
import { useUserService, useUserStatistics } from "@/src/user";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NotificationSettings } from "./components/notification-settings";
import { ProfileActions } from "./components/profile-actions";
import { ProfileHeader } from "./components/profile-header";
import { ThemeSwitcher } from "./components/theme-switcher";
import { UserStatistics } from "./components/user-statistics";
import useStyles from "./styles";

export default function ProfileScreen() {
  const { signOut, deleteAccount, updateDisplayName, reauthenticateUser } =
    useAuth();
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

  const fetchProfile = useCallback(async () => {
    if (userService) {
      setIsLoadingProfile(true);
      const userProfile = await userService.getProfile();
      setProfile(userProfile);
      setIsLoadingProfile(false);
    }
  }, [userService]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleUpdateDisplayName = async (displayName: string) => {
    await updateDisplayName(displayName);
    await fetchProfile();
  };

  const insets = useSafeAreaInsets();
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
        contentContainerStyle={{ paddingBottom: insets.bottom + 64 }}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <ProfileHeader
            profile={profile}
            onUpdateDisplayName={handleUpdateDisplayName}
          />
          <UserStatistics userStats={userStats || undefined} />
          <NotificationSettings
            notificationsEnabled={notificationsEnabled}
            shoppingReminders={shoppingReminders}
            toggleNotifications={toggleNotifications}
            setShoppingReminders={setShoppingReminders}
          />
          <ThemeSwitcher />
          <ProfileActions
            signOut={signOut}
            deleteAccount={deleteAccount}
            reauthenticateUser={reauthenticateUser}
          />
        </SafeAreaView>
      </ScrollView>
    </ThemedView>
  );
}
