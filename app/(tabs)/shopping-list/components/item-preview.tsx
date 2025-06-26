import { ItemParser } from "@/src/utils/item-parser";
import React from "react";
import { Text, View } from "react-native";
import { useStyles } from "../styles";

interface ItemPreviewProps {
  input: string;
}

export function ItemPreview({ input }: ItemPreviewProps) {
  const { styles, colors } = useStyles();

  if (!input.trim()) {
    return (
      <View style={styles.previewContainer}>
        <Text style={styles.previewPlaceholder}>
          Type something to see how it&apos;s parsed...
        </Text>
      </View>
    );
  }

  const breakdown = ItemParser.getParseBreakdown(input);
  const { parsed, parts } = breakdown;

  const renderHighlightedText = () => {
    if (parts.length === 0) {
      return (
        <Text style={styles.previewText}>
          <Text style={styles.nameText}>{parsed.name}</Text>
        </Text>
      );
    }

    const result: React.ReactNode[] = [];
    let lastPosition = 0;

    parts.forEach((part, index) => {
      // Add any text before this part
      if (part.position > lastPosition) {
        const beforeText = input.slice(lastPosition, part.position);
        if (beforeText.trim()) {
          result.push(
            <Text key={`before-${index}`} style={styles.previewText}>
              {beforeText}
            </Text>
          );
        }
      }

      // Add the highlighted part
      const partStyle =
        part.type === "quantity"
          ? styles.quantityText
          : part.type === "unit"
          ? styles.unitText
          : styles.nameText;

      result.push(
        <Text key={`part-${index}`} style={[styles.previewText, partStyle]}>
          {part.value}
        </Text>
      );

      lastPosition = part.position + part.value.length;
    });

    // Add any remaining text
    if (lastPosition < input.length) {
      const remainingText = input.slice(lastPosition);
      if (remainingText.trim()) {
        result.push(
          <Text key="remaining" style={styles.previewText}>
            {remainingText}
          </Text>
        );
      }
    }

    return result;
  };

  return (
    <View style={styles.previewContainer}>
      <View style={styles.previewHeader}>
        <Text style={styles.previewLabel}>Smart Preview:</Text>
      </View>

      <View style={styles.highlightedTextContainer}>
        <Text style={styles.previewText}>{renderHighlightedText()}</Text>
      </View>

      <View style={styles.previewResult}>
        <View style={styles.previewResultItem}>
          <Text style={styles.previewResultLabel}>Name:</Text>
          <Text style={styles.previewResultValue}>{parsed.name}</Text>
        </View>
        <View style={styles.previewResultItem}>
          <Text style={styles.previewResultLabel}>Quantity:</Text>
          <Text style={styles.previewResultValue}>{parsed.quantity}</Text>
        </View>
        <View style={styles.previewResultItem}>
          <Text style={styles.previewResultLabel}>Unit:</Text>
          <Text style={styles.previewResultValue}>{parsed.unit}</Text>
        </View>
      </View>

      <View style={styles.previewLegend}>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendColor, { backgroundColor: colors.quantity }]}
          />
          <Text style={styles.legendText}>Quantity</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendColor, { backgroundColor: colors.unit }]}
          />
          <Text style={styles.legendText}>Unit</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendColor, { backgroundColor: colors.name }]}
          />
          <Text style={styles.legendText}>Name</Text>
        </View>
      </View>
    </View>
  );
}
