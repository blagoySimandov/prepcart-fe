import { Discount } from "@/src/discounts/types";
import React from "react";
import { Modal, View } from "react-native";
import { useStyles } from "../styles";
import { DiscountList } from "./discount-list";
import { DiscountModalHeader } from "./discount-modal-header";

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
  const { styles } = useStyles();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <DiscountModalHeader onClose={onClose} />
          <DiscountList discounts={discounts} />
        </View>
      </View>
    </Modal>
  );
}
