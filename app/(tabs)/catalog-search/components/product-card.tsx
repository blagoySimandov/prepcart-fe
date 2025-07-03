import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getStoreName } from "@/src/catalog-search/constants";
import { ProductCandidate } from "@/src/catalog-search/types";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import {
  calculateDiscountedPrice,
  calculateSavings,
} from "../utils/product-card-helpers";
import { HighlightedText } from "./highlighted-text";

type ProductCardProps = {
  item: ProductCandidate;
  isAdding: boolean;
  onAddToList: (item: ProductCandidate) => void;
  onViewPdf: (item: ProductCandidate) => void;
};

export function ProductCard({
  item,
  isAdding,
  onAddToList,
  onViewPdf,
}: ProductCardProps) {
  console.log("item", item);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  const discountedPrice = calculateDiscountedPrice(
    item.priceBeforeDiscount,
    item.discountPercent
  );
  const savings = calculateSavings(
    item.priceBeforeDiscount,
    item.discountPercent
  );

  return (
    <View
      style={[
        styles.itemCard,
        {
          backgroundColor: themeColors.background,
          shadowColor: themeColors.text,
        },
      ]}>
      <View style={styles.itemHeader}>
        <View style={styles.itemTitleSection}>
          <HighlightedText
            text={item.productName}
            highlightResult={item._highlightResult?.["discount.product_name"]}
            style={[styles.itemName, { color: themeColors.text }].reduce(
              (acc, style) => ({ ...acc, ...style }),
              {}
            )}
            highlightStyle={{
              fontWeight: "bold",
              backgroundColor: themeColors.tint,
              color: "white",
            }}
          />
          <View style={styles.storeRow}>
            <View
              style={[
                styles.storeBadge,
                { backgroundColor: themeColors.tabIconDefault },
              ]}>
              <Text style={styles.storeBadgeText}>
                {getStoreName(item.storeId)}
              </Text>
            </View>
            <Text
              style={[styles.pageInfo, { color: themeColors.tabIconDefault }]}>
              Page {item.pageNumber}
            </Text>
          </View>
        </View>
        <View
          style={[styles.discountBadge, { backgroundColor: themeColors.tint }]}>
          <Text style={styles.discountText}>-{item.discountPercent}%</Text>
        </View>
      </View>

      <View style={styles.priceSection}>
        <View style={styles.priceRow}>
          <Text
            style={[
              styles.originalPrice,
              { color: themeColors.tabIconDefault },
            ]}>
            {item.priceBeforeDiscount.toFixed(2)} BGN
          </Text>
          <Text style={[styles.discountedPrice, { color: themeColors.tint }]}>
            {discountedPrice.toFixed(2)} BGN
          </Text>
        </View>
        <Text style={[styles.savingsText, { color: themeColors.tint }]}>
          You save {savings.toFixed(2)} BGN
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.addToListButton,
            { backgroundColor: themeColors.tint },
          ]}
          onPress={() => onAddToList(item)}
          disabled={isAdding}>
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
            onPress={() => onViewPdf(item)}>
            <IconSymbol size={16} name="doc.text" color="white" />
            <Text style={styles.pdfButtonText}>View Brochure</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
