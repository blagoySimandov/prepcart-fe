import { IconSymbol } from "@/components/ui/IconSymbol";
import { ProductCandidate } from "@/src/catalog-search/types";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

interface ProductActionsProps {
  item: ProductCandidate;
  isAdding: boolean;
  themeColors: any;
  onAddToList: (item: ProductCandidate) => void;
  onViewPdf: (item: ProductCandidate) => void;
}

export function ProductActions({
  item,
  isAdding,
  themeColors,
  onAddToList,
  onViewPdf,
}: ProductActionsProps) {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity
        style={[styles.addToListButton, { backgroundColor: themeColors.tint }]}
        onPress={() => onAddToList(item)}
        disabled={isAdding}
      >
        {isAdding ? (
          <ActivityIndicator size={16} color="white" />
        ) : (
          <IconSymbol size={16} name="plus.circle" color="white" />
        )}
        <Text style={styles.addToListButtonText}>
          {isAdding ? "Adding..." : "Add to List"}
        </Text>
      </TouchableOpacity>
      {item.sourceFileUri && (
        <TouchableOpacity
          style={[styles.pdfButton, { backgroundColor: themeColors.tint }]}
          onPress={() => onViewPdf(item)}
        >
          <IconSymbol size={16} name="doc.text" color="white" />
          <Text style={styles.pdfButtonText}>View Brochure</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
