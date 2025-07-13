import { ProductCandidate } from "@/src/catalog-search/types";
import { useRemoteConfig } from "@/src/remote-config/context";
import { useStoreNames } from "@/src/shared/hooks/use-store-names";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";
import { HighlightedText } from "./highlighted-text";

interface ProductHeaderProps {
  item: ProductCandidate;
  themeColors: any;
}

export function ProductHeader({ item, themeColors }: ProductHeaderProps) {
  const { isHighlightingEnabled } = useRemoteConfig();
  const { getStoreName } = useStoreNames();

  return (
    <View style={styles.itemHeader}>
      <View style={styles.itemTitleSection}>
        {isHighlightingEnabled ? (
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
        ) : (
          <Text style={[styles.itemName, { color: themeColors.text }]}>
            {item.productName}
          </Text>
        )}
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
        <Text style={[styles.discountText, { color: themeColors.badgeText }]}>
          -{item.discountPercent}%
        </Text>
      </View>
    </View>
  );
}
