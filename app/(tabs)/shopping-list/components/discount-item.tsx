import { IconSymbol } from "@/components/ui/IconSymbol";
import { Discount } from "@/src/discounts/types";
import { useStoreNames } from "@/src/shared/hooks/use-store-names";
import React from "react";
import { Text, View } from "react-native";
import { useStyles } from "../styles";

interface DiscountItemProps {
  discount: Discount;
}

export function DiscountItem({ discount }: DiscountItemProps) {
  const { styles, colors } = useStyles();

  const discountedPrice =
    discount.price_before_discount_local *
    (1 - discount.discount_percent / 100);
  const perUnitSavings =
    discount.price_before_discount_local * (discount.discount_percent / 100);

  const totalSavings = discount.quantity_multiplier
    ? discount.quantity_multiplier * perUnitSavings
    : null;

  const { getStoreName } = useStoreNames();
  const storeName = getStoreName(discount.store_id);
  const currency = discount.currency_local || "BGN";

  return (
    <View style={styles.discountItemCard}>
      <View style={styles.discountItemHeader}>
        <Text style={styles.discountStoreName}>{storeName}</Text>
        <View style={styles.discountContainer}>
          <View style={styles.discountBadge}>
            <Text style={styles.discountBadgeText}>
              {discount.discount_percent}% OFF
            </Text>
          </View>
          {discount.quantity_multiplier && (
            <View style={styles.bestMatchIndicator}>
              <Text style={styles.bestMatchText}>BEST MATCH</Text>
            </View>
          )}
          {discount.requires_loyalty_card && (
            <View style={styles.loyaltyCardIndicator}>
              <IconSymbol name="creditcard" size={12} color={colors.accent} />
            </View>
          )}
        </View>
      </View>

      <Text style={styles.discountProductName} numberOfLines={3}>
        {discount.product_name}
      </Text>

      {discount.requires_loyalty_card && (
        <View style={styles.loyaltyCardNotice}>
          <IconSymbol name="info.circle" size={14} color={colors.warning} />
          <Text style={styles.loyaltyCardNoticeText}>
            {storeName} card required for this discount
          </Text>
        </View>
      )}

      <View style={styles.priceContainer}>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Original Price</Text>
          <Text style={styles.originalPrice}>
            {discount.price_before_discount_local.toFixed(2)} {currency}
          </Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Per-Unit Savings</Text>
          <Text style={styles.savingsAmount}>
            - {perUnitSavings.toFixed(2)} {currency}
          </Text>
        </View>
        {totalSavings && (
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>Total Savings</Text>
            <Text style={styles.savingsAmount}>
              - {totalSavings.toFixed(2)} {currency}
            </Text>
          </View>
        )}
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Final Price</Text>
          <Text style={styles.discountedPrice}>
            {discountedPrice.toFixed(2)} {currency}
          </Text>
        </View>
      </View>
    </View>
  );
}
