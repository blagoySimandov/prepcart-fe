import { getStoreName } from "@/src/discounts/constants";
import { Discount } from "@/src/discounts/types";
import React from "react";
import { Text, View } from "react-native";
import { useStyles } from "../styles";

interface DiscountItemProps {
  discount: Discount;
}

export function DiscountItem({ discount }: DiscountItemProps) {
  const { styles } = useStyles();

  const discountedPrice =
    discount.price_before_discount_local *
    (1 - discount.discount_percent / 100);
  const savings = discount.price_before_discount_local - discountedPrice;
  const storeName = getStoreName(discount.store_id);

  return (
    <View style={styles.discountItemCard}>
      <View style={styles.discountItemHeader}>
        <Text style={styles.discountStoreName}>{storeName}</Text>
        <View style={styles.discountBadge}>
          <Text style={styles.discountBadgeText}>
            {discount.discount_percent}% OFF
          </Text>
        </View>
      </View>

      <Text style={styles.discountProductName} numberOfLines={3}>
        {discount.product_name}
      </Text>

      <View style={styles.priceContainer}>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Original Price</Text>
          <Text style={styles.originalPrice}>
            {discount.price_before_discount_local.toFixed(2)}{" "}
            {discount.currency_local}
          </Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Discount</Text>
          <Text style={styles.savingsAmount}>
            - {savings.toFixed(2)} {discount.currency_local}
          </Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Final Price</Text>
          <Text style={styles.discountedPrice}>
            {discountedPrice.toFixed(2)} {discount.currency_local}
          </Text>
        </View>
      </View>

      {discount.similarity_score && (
        <View style={styles.similarityContainer}>
          <Text style={styles.similarityText}>
            Match confidence: {discount.similarity_score.toFixed(1)}%
          </Text>
        </View>
      )}
    </View>
  );
}
