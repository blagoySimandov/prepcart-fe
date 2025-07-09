import { useAlert } from "@/components/providers/AlertProvider";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { Linking, Text, TouchableOpacity } from "react-native";
import useStyles from "../styles";

const HELP_AND_SUPPORT_LINK = "https://prepcart.it.com";

interface ProfileActionsProps {
  signOut: () => void;
}

export function ProfileActions({ signOut }: ProfileActionsProps) {
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

      <TouchableOpacity style={styles.actionButton} onPress={handleSignOut}>
        <IconSymbol name="door.left.hand.open" size={24} color={colors.error} />
        <Text style={[styles.actionButtonText, styles.signOutText]}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </>
  );
}
