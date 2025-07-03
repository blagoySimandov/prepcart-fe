import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";
import {
  calculateDiscountedPrice,
  calculateSavings,
} from "../utils/product-card-helpers";

interface ProductPriceProps {
  priceBeforeDiscount: number;
  discountPercent: number;
  themeColors: any;
}

export function ProductPrice({
  priceBeforeDiscount,
  discountPercent,
  themeColors,
}: ProductPriceProps) {
  const discountedPrice = calculateDiscountedPrice(
    priceBeforeDiscount,
    discountPercent
  );
  const savings = calculateSavings(priceBeforeDiscount, discountPercent);

  return (
    <View style={styles.priceSection}>
      <View style={styles.priceRow}>
        <Text
          style={[styles.originalPrice, { color: themeColors.tabIconDefault }]}>
          {priceBeforeDiscount.toFixed(2)} BGN
        </Text>
        <Text style={[styles.discountedPrice, { color: themeColors.tint }]}>
          {discountedPrice.toFixed(2)} BGN
        </Text>
      </View>
      <Text style={[styles.savingsText, { color: themeColors.tint }]}>
        You save {savings.toFixed(2)} BGN
      </Text>
    </View>
  );
}
