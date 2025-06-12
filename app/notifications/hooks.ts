import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { NotificationManager } from "./manager";

export const useNotificationSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [shoppingReminders, setShoppingReminders] = useState(true);
  const [cookingReminders, setCookingReminders] = useState(true);

  useEffect(() => {
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationsEnabled(status === "granted");
  };

  const toggleNotifications = async (enabled: boolean) => {
    if (enabled) {
      const granted = await NotificationManager.requestPermissions();
      setNotificationsEnabled(granted);
    } else {
      setNotificationsEnabled(false);
      // TODO: Implement notification cancellation logic
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  return {
    notificationsEnabled,
    shoppingReminders,
    cookingReminders,
    toggleNotifications,
    setShoppingReminders,
    setCookingReminders,
  };
};
