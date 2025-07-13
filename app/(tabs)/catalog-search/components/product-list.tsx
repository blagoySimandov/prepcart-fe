import { ProductCandidate } from "@/src/catalog-search/types";
import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { styles } from "../styles";
import { ProductListItem } from "./product-list-item";

interface ProductListProps {
  results: ProductCandidate[];
  addingItems: Set<string>;
  onAddToList: (item: ProductCandidate) => void;
  onViewPdf: (item: ProductCandidate) => void;
  onLoadMore: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  results,
  addingItems,
  onAddToList,
  onViewPdf,
  onLoadMore,
}) => {
  const renderItem: ListRenderItem<ProductCandidate> = ({ item }) => (
    <ProductListItem
      item={item}
      isAdding={addingItems.has(item.id)}
      onAddToList={onAddToList}
      onViewPdf={onViewPdf}
    />
  );

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.1}
    />
  );
};
