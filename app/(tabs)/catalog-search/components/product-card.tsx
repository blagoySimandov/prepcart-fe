import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ProductCandidate } from "@/src/catalog-search/types";
import React from "react";
import { View } from "react-native";
import { styles } from "../styles";
import { ProductActions } from "./product-actions";
import { ProductHeader } from "./product-header";
import { ProductPrice } from "./product-price";

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
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  return (
    <View
      style={[
        styles.itemCard,
        {
          backgroundColor: themeColors.background,
          shadowColor: themeColors.text,
        },
      ]}>
      <ProductHeader item={item} themeColors={themeColors} />
      <ProductPrice
        priceBeforeDiscount={item.priceBeforeDiscount}
        discountPercent={item.discountPercent}
        themeColors={themeColors}
      />
      <ProductActions
        item={item}
        isAdding={isAdding}
        themeColors={themeColors}
        onAddToList={onAddToList}
        onViewPdf={onViewPdf}
      />
    </View>
  );
}
