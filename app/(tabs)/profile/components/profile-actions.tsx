import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { Linking, Text, TouchableOpacity } from "react-native";
import useStyles from "../styles";
import { useAlert } from "@/components/providers/alert-provider";

const HELP_AND_SUPPORT_LINK = "https://prepcart.it.com";

interface ProfileActionsProps {
  signOut: () => void;
  deleteAccount: () => Promise<void>;
  reauthenticateUser: () => Promise<boolean>;
}

export function ProfileActions({
  signOut,
  deleteAccount,
  reauthenticateUser,
}: ProfileActionsProps) {
  const { styles, colors } = useStyles();
  const { showAlert } = useAlert();

  const handleSignOut = () => {
    showAlert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: signOut,
      },
    ]);
  };

  const attemptAccountDeletion = async (): Promise<void> => {
    try {
      await deleteAccount();
    } catch (error: any) {
      console.error("Account deletion failed:", error);

      if (error.message === "REQUIRES_REAUTHENTICATION") {
        showAlert(
          "Re-authentication Required",
          "For security reasons, you need to sign in again to delete your account.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Sign In Again",
              style: "default",
              onPress: async () => {
                try {
                  const reauthSuccess = await reauthenticateUser();
                  if (reauthSuccess) {
                    await deleteAccount();
                  } else {
                    showAlert(
                      "Authentication Failed",
                      "Could not verify your identity. Please try again.",
                      [{ text: "OK", style: "default" }],
                    );
                  }
                } catch (reauthError) {
                  console.error("Reauthentication failed:", reauthError);
                  showAlert(
                    "Authentication Failed",
                    "Could not verify your identity. Please try again.",
                    [{ text: "OK", style: "default" }],
                  );
                }
              },
            },
          ],
        );
      } else {
        showAlert(
          "Error",
          "Failed to delete account. Please try again or contact support.",
          [{ text: "OK", style: "default" }],
        );
      }
    }
  };

  const handleDeleteAccount = () => {
    showAlert(
      "Delete Account",
      "Are you sure you want to permanently delete your account? This action cannot be undone and will delete all your data.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Account",
          style: "destructive",
          onPress: attemptAccountDeletion,
        },
      ],
    );
  };

  const handleHelpAndSupport = () => {
    Linking.openURL(HELP_AND_SUPPORT_LINK);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleHelpAndSupport}
      >
        <IconSymbol name="questionmark.circle" size={24} color={colors.icon} />
        <Text style={[styles.actionButtonText, { color: colors.text }]}>
          Help & Support
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleDeleteAccount}
      >
        <IconSymbol name="trash" size={24} color={colors.error} />
        <Text style={[styles.actionButtonText, styles.signOutText]}>
          Delete Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleSignOut}>
        <IconSymbol name="door.left.hand.open" size={24} color={colors.error} />
        <Text style={[styles.actionButtonText, styles.signOutText]}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </>
  );
}
