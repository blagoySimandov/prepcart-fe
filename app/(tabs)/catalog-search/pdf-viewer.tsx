import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PdfViewer } from "./components/pdf-viewer";

export default function PdfViewerScreen() {
  const { source, page, productName } = useLocalSearchParams<{
    source: string;
    page: string;
    productName: string;
  }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  const handleError = (error: any) => {
    Alert.alert("PDF Error", "Failed to load PDF. Please try again later.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  if (!source) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.errorText, { color: themeColors.text }]}>
          No PDF source provided
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.tint }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <IconSymbol size={24} name="chevron.left" color={themeColors.tint} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            {productName || "Product Brochure"}
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              { color: themeColors.tabIconDefault },
            ]}>
            Page {page || 1}
          </Text>
        </View>
      </View>
      <PdfViewer
        source={source}
        initialPage={parseInt(page || "1", 10)}
        onError={handleError}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 50,
  },
});
