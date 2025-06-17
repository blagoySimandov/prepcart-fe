import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { Text, View } from "react-native";
import { useStyles } from "../styles";

interface SavingsSummaryProps {
  totalSavings: number;
  itemsWithDiscounts: number;
  apiTotalSavings?: Record<string, number>;
}

export function SavingsSummary({
  totalSavings,
  itemsWithDiscounts,
  apiTotalSavings,
}: SavingsSummaryProps) {
  const { styles, colors } = useStyles();

  const hasApiSavings =
    apiTotalSavings && Object.keys(apiTotalSavings).length > 0;
  const displaySavings = hasApiSavings ? apiTotalSavings : null;
  const fallbackSavings = totalSavings;

  if (!hasApiSavings && fallbackSavings <= 0) {
    return null;
  }

  const renderSavingsAmount = () => {
    if (hasApiSavings && displaySavings) {
      return Object.entries(displaySavings)
        .map(([currency, amount]) => `${amount.toFixed(2)} ${currency}`)
        .join(" + ");
    }
    return `${fallbackSavings.toFixed(2)} BGN`;
  };

  const totalItemsText =
    itemsWithDiscounts > 0
      ? `${itemsWithDiscounts} item${itemsWithDiscounts !== 1 ? "s" : ""}`
      : "items";

  return (
    <View style={styles.savingsSummary}>
      <View style={styles.savingsContent}>
        <IconSymbol name="tag.fill" size={16} color={colors.accent} />
        <Text style={styles.savingsTitle}>Potential Savings</Text>
        <Text style={styles.savingsAmount}>{renderSavingsAmount()}</Text>
      </View>
      <Text style={styles.savingsSubtext}>
        {totalItemsText} with discounts found
      </Text>
    </View>
  );
}
