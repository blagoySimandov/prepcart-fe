import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { View } from "react-native";
import { useStyles } from "./styles";
import { HeaderProps, TitleProps } from "./types";

export function Header({ children }: HeaderProps) {
  const { styles } = useStyles();

  return <View style={styles.container}>{children}</View>;
}

export function HeaderTitle({ children }: TitleProps) {
  const { styles } = useStyles();

  return (
    <ThemedText type="title" style={styles.title}>
      {children}
    </ThemedText>
  );
}

// Attach Title as a property for compound component pattern
Header.Title = HeaderTitle;
