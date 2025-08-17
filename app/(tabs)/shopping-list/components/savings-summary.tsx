import { IconSymbol } from "@/components/ui/IconSymbol";
import { useCountryRestriction } from "@/src/hooks/use-country-restriction";
import { ShoppingItem } from "@/src/user/shopping-list/types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";

interface SavingsSummaryProps {
  items: ShoppingItem[];
  onClose?: () => void;
}

export function SavingsSummary({ items, onClose }: SavingsSummaryProps) {
  const { styles, colors } = useStyles();
  const { isDiscountsAvailable } = useCountryRestriction();

  // Hide savings summary if discounts are not available in user's country
  if (isDiscountsAvailable === false) {
    return null;
  }

  const itemSavingsByCurrency: Record<string, number> = {};
  let itemsWithSavings = 0;
  items.forEach((item) => {
    if (item.detectedDiscounts && item.detectedDiscounts.length > 0) {
      const bestDiscount = item.detectedDiscounts.find(
        (d) => d.quantity_multiplier && d.quantity_multiplier > 0,
      );
      if (bestDiscount && bestDiscount.quantity_multiplier) {
        const perUnitSavings =
          bestDiscount.price_before_discount_local *
          (bestDiscount.discount_percent / 100);
        const totalSavings = bestDiscount.quantity_multiplier * perUnitSavings;
        const currency = bestDiscount.currency_local || "BGN";
        itemSavingsByCurrency[currency] =
          (itemSavingsByCurrency[currency] || 0) + totalSavings;
        itemsWithSavings++;
      }
    }
  });

  const totalSavings = itemSavingsByCurrency;
  const hasSavings = Object.keys(totalSavings).length > 0;

  if (!hasSavings) {
    return null;
  }

  const renderSavingsAmount = () => {
    if (hasSavings) {
      const [currency, amount] = Object.entries(totalSavings)[0] || [
        null,
        null,
      ];
      return currency && amount != null
        ? `${amount.toFixed(2)} ${currency}`
        : "0.00";
    }
    return "0.00";
  };

  const totalItemsText =
    itemsWithSavings > 0
      ? `${itemsWithSavings} item${itemsWithSavings !== 1 ? "s" : ""}`
      : "items";

  return (
    <View style={styles.savingsSummary}>
      <View style={styles.savingsHeader}>
        <View style={styles.savingsContent}>
          <IconSymbol name="tag.fill" size={16} color={colors.accent} />
          <Text style={styles.savingsTitle}>Potential Savings</Text>
          <Text style={styles.savingsAmount}>{renderSavingsAmount()}</Text>
        </View>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.savingsCloseButton}>
            <IconSymbol name="xmark" size={16} color={colors.icon} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.savingsSubtext}>
        {totalItemsText} with savings calculated
      </Text>
    </View>
  );
}
