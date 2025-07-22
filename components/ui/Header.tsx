import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet } from "react-native";

interface HeaderProps {
  children: React.ReactNode;
}

interface HeaderTitleProps {
  children: string;
}

interface HeaderSubtitleProps {
  children: string;
}

function HeaderRoot({ children }: HeaderProps) {
  return <ThemedView style={styles.container}>{children}</ThemedView>;
}

function HeaderTitle({ children }: HeaderTitleProps) {
  return (
    <ThemedText type="title" style={styles.title}>
      {children}
    </ThemedText>
  );
}

function HeaderSubtitle({ children }: HeaderSubtitleProps) {
  const subtitleColor = useThemeColor({}, "icon");

  return (
    <ThemedText style={[styles.subtitle, { color: subtitleColor }]}>
      {children}
    </ThemedText>
  );
}

export const Header = Object.assign(HeaderRoot, {
  Title: HeaderTitle,
  Subtitle: HeaderSubtitle,
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
});
