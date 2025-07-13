import { ProductCandidate } from "@/src/catalog-search/types";
import React from "react";
import { ProductCard } from "./product-card";

interface ProductListItemProps {
  item: ProductCandidate;
  isAdding: boolean;
  onAddToList: (item: ProductCandidate) => void;
  onViewPdf: (item: ProductCandidate) => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({
  item,
  isAdding,
  onAddToList,
  onViewPdf,
}) => (
  <ProductCard
    item={item}
    isAdding={isAdding}
    onAddToList={onAddToList}
    onViewPdf={onViewPdf}
  />
);
