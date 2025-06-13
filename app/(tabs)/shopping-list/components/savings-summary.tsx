import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { Text, View } from "react-native";
import { useStyles } from "../styles";

interface SavingsSummaryProps {
  totalSavings: number;
  itemsWithDiscounts: number;
}

export function SavingsSummary({
  totalSavings,
  itemsWithDiscounts,
}: SavingsSummaryProps) {
  const { styles, colors } = useStyles();

  if (totalSavings <= 0) {
    return null;
  }

  return (
    <View style={styles.savingsSummary}>
      <View style={styles.savingsContent}>
        <IconSymbol name="tag.fill" size={16} color={colors.accent} />
        <Text style={styles.savingsTitle}>Potential Savings</Text>
        <Text style={styles.savingsAmount}>{totalSavings.toFixed(2)} BGN</Text>
      </View>
      <Text style={styles.savingsSubtext}>
        {itemsWithDiscounts} item{itemsWithDiscounts !== 1 ? "s" : ""} at LIDL
      </Text>
    </View>
  );
}
