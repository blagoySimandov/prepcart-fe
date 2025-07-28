import { Linking } from "react-native";
import { checkAppUpdate, UPDATE_URL } from ".";
import { useAlert } from "@/components/providers/alert-provider";

export function useAlertPromptIfNeeded() {
  const updateStatus = checkAppUpdate();
  const { showAlert } = useAlert();

  if (updateStatus === "force") {
    return showAlert(
      "Update available",
      "Update now to get the latest features.",
      [
        {
          text: "Update",
          onPress: () => {
            Linking.openURL(UPDATE_URL);
          },
        },
      ],
    );
  }

  if (updateStatus === "suggest") {
    return showAlert("Update available", "You can update now or later.", [
      {
        text: "Update",
        style: "default",
        onPress: () => {
          Linking.openURL(UPDATE_URL);
        },
      },
      {
        text: "Later",
        style: "cancel",
        onPress: () => {},
      },
    ]);
  }

  return null;
}
