import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { View } from "react-native";
import { useStyles } from "./styles";
import { HeaderProps, TitleProps } from "./types";
import { TEXT_TYPES } from "@/constants/ui";
import { LABELS } from "../../messages";

export function Header({ children }: HeaderProps) {
  const { styles } = useStyles();

  return <View style={styles.container}>{children}</View>;
}

export function HeaderTitle({ children, isModified }: TitleProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.titleContainer}>
      <ThemedText type={TEXT_TYPES.title} style={styles.title}>
        {children}
      </ThemedText>
      {isModified && (
        <View style={styles.modifiedBadge}>
          <ThemedText style={styles.modifiedBadgeText}>{LABELS.modified}</ThemedText>
        </View>
      )}
    </View>
  );
}
// Attach Title as a property for compound component pattern
Header.Title = HeaderTitle;
