import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useStyles } from "../styles";

interface GoogleSignButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export function GoogleSignButton({
  onPress,
  disabled = false,
}: GoogleSignButtonProps) {
  const tint = useThemeColor({}, "tint");
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? `${tint}80` : tint,
          opacity: disabled ? 0.6 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      <ThemedText type="defaultSemiBold" lightColor="#fff" darkColor="#000">
        Sign in with Google
      </ThemedText>
    </TouchableOpacity>
  );
}
