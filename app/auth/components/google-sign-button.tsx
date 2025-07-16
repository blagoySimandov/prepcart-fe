import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <MaterialIcons name="account-circle" size={20} color="white" />
      <ThemedText
        type="defaultSemiBold"
        lightColor="#fff"
        darkColor="#000"
        style={{ fontSize: 18 }}
      >
        Sign in with Google
      </ThemedText>
    </TouchableOpacity>
  );
}
