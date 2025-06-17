import { IconSymbol } from "@/components/ui/IconSymbol";
import { getStoreName } from "@/src/discounts/constants";
import { Discount } from "@/src/discounts/types";
import React from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";

interface DiscountModalProps {
  visible: boolean;
  onClose: () => void;
  discounts: Discount[];
}

export function DiscountModal({
  visible,
  onClose,
  discounts,
}: DiscountModalProps) {
  const { styles, colors } = useStyles();

  const renderDiscount = ({ item }: { item: Discount }) => {
    const discountedPrice =
      item.price_before_discount_local * (1 - item.discount_percent / 100);
    const savings = item.price_before_discount_local - discountedPrice;
    const storeName = getStoreName(item.store_id);

    return (
      <View style={styles.discountItemCard}>
        <View style={styles.discountItemHeader}>
          <Text style={styles.discountStoreName}>{storeName}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountBadgeText}>
              {item.discount_percent}% OFF
            </Text>
          </View>
        </View>

        <Text style={styles.discountProductName} numberOfLines={3}>
          {item.product_name}
        </Text>

        <View style={styles.priceContainer}>
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>Original Price</Text>
            <Text style={styles.originalPrice}>
              {item.price_before_discount_local.toFixed(2)}{" "}
              {item.currency_local}
            </Text>
          </View>
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>Discount</Text>
            <Text style={styles.savingsAmount}>
              - {savings.toFixed(2)} {item.currency_local}
            </Text>
          </View>
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>Final Price</Text>
            <Text style={styles.discountedPrice}>
              {discountedPrice.toFixed(2)} {item.currency_local}
            </Text>
          </View>
        </View>

        {item.similarity_score && (
          <View style={styles.similarityContainer}>
            <Text style={styles.similarityText}>
              Match confidence: {item.similarity_score.toFixed(1)}%
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Available Discounts</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <IconSymbol name="xmark" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={discounts}
            renderItem={renderDiscount}
            keyExtractor={(item, index) =>
              item.id ||
              `${item.product_name}-${item.discount_percent}-${index}`
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
}
