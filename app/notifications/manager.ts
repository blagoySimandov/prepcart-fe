import { NotificationTriggerInput } from "expo-notifications";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

export class NotificationManager {
  static async requestPermissions(): Promise<boolean> {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Please enable notifications in your device settings to receive cooking reminders and shopping list updates.",
        );
        return false;
      }

      // TODO: Configure notification categories and handlers
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: false,
        }),
      });

      return true;
    } catch (error) {
      console.error("Error requesting notification permissions:", error);
      return false;
    }
  }

  static async scheduleCookingReminder(recipeName: string): Promise<void> {
    // TODO: Implement smart cooking reminders based on meal planning
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time to cook!",
          body: `How about making "${recipeName}" today?`,
          data: { type: "cooking_reminder", recipeName },
        },
        trigger: {
          type: "timeInterval",
          seconds: 3600,
        } as NotificationTriggerInput,
      });
    } catch (error) {
      console.error("Error scheduling cooking reminder:", error);
    }
  }
}
