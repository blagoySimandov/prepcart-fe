import { FeatureUnavailableModal } from "@/components/shared/feature-unavailable-modal";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export function RestrictedCatalogSearch() {
  const [showModal, setShowModal] = useState(false);
  const tint = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <IconSymbol
            name="magnifyingglass"
            size={64}
            color={tint}
            style={styles.icon}
          />
        </View>

        <ThemedText type="title" style={styles.title}>
          Discount Search
        </ThemedText>

        <ThemedText type="default" style={styles.subtitle}>
          Search through thousands of products from various stores
        </ThemedText>

        <TouchableOpacity
          style={[styles.searchButton, { borderColor, backgroundColor: tint }]}
          onPress={() => setShowModal(true)}
        >
          <IconSymbol name="magnifyingglass" size={20} color="#fff" />
          <ThemedText
            type="defaultSemiBold"
            lightColor="#fff"
            darkColor="#000"
            style={styles.buttonText}
          >
            Start Searching
          </ThemedText>
        </TouchableOpacity>
      </View>

      <FeatureUnavailableModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Discount Search Unavailable"
        message="The catalog search feature is currently only available in Bulgaria. We're working to expand to more countries soon!"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    maxWidth: 300,
  },
  iconContainer: {
    marginBottom: 24,
  },
  icon: {
    opacity: 0.6,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    opacity: 0.7,
    lineHeight: 20,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});

