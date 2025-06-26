import { Discount } from "@/src/discounts/types";
import React from "react";
import { FlatList } from "react-native";
import { DiscountItem } from "./discount-item";

interface DiscountListProps {
  discounts: Discount[];
}

export function DiscountList({ discounts }: DiscountListProps) {
  const renderDiscount = ({ item }: { item: Discount }) => (
    <DiscountItem discount={item} />
  );

  const keyExtractor = (item: Discount, index: number) =>
    item.id || `${item.product_name}-${item.discount_percent}-${index}`;

  return (
    <FlatList
      data={discounts}
      renderItem={renderDiscount}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />
  );
}
