import { IconSymbol } from "@/components/ui/IconSymbol";
import { ShoppingItem } from "@/src/user/shopping-list/types";
import React from "react";
import { Text, View } from "react-native";
import { useStyles } from "../styles";

interface SavingsSummaryProps {
  items: ShoppingItem[];
  apiTotalSavings?: Record<string, number>;
}

export function SavingsSummary({
  items,
  apiTotalSavings,
}: SavingsSummaryProps) {
  const { styles, colors } = useStyles();

  const hasSavings = apiTotalSavings && Object.keys(apiTotalSavings).length > 0;

  if (!hasSavings) {
    return null;
  }

  const renderSavingsAmount = () => {
    if (hasSavings) {
      return Object.entries(apiTotalSavings)
        .map(([currency, amount]) => `${amount.toFixed(2)} ${currency}`)
        .join(" + ");
    }
    return "0.00";
  };

  const itemsWithDiscounts = items.filter(
    (item) => item.detectedDiscounts && item.detectedDiscounts.length > 0,
  ).length;

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
