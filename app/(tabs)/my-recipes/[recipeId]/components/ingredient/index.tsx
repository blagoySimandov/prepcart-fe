import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View, Modal, TouchableWithoutFeedback } from "react-native";
import { useStyles } from "./styles";
import {
  AmountProps,
  BaseContainerProps,
  IngredientProps,
  NameProps,
  UnitProps,
  SwapIngredientBtnProps,
} from "./types";

function IngredientBase({ children, status, modificationDetail }: IngredientProps) {
  const { styles, colors } = useStyles();
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <View style={[
        styles.container,
        status === "added" && styles.addedContainer,
        status === "modified" && styles.modifiedContainer,
      ]}>
        {status && (
          <View style={[
            styles.statusIndicator,
            status === "added" && styles.addedIndicator,
            status === "modified" && styles.modifiedIndicator,
          ]} />
        )}
        {status && (
          <TouchableOpacity
            style={[
              styles.statusBadge,
              status === "added" && styles.addedBadge,
              status === "modified" && styles.modifiedBadge,
            ]}
            onPress={() => setShowDetail(true)}
          >
            <ThemedText style={styles.statusBadgeText}>{status}</ThemedText>
            <MaterialIcons name="info" size={12} color="white" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        )}
        {children}
      </View>
      
      {modificationDetail && (
        <Modal
          visible={showDetail}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDetail(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowDetail(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.detailModal}>
                  <View style={styles.detailModalHeader}>
                    <ThemedText style={styles.detailModalTitle}>
                      {status === "added" ? "Added Ingredient" : "Modified Ingredient"}
                    </ThemedText>
                    <TouchableOpacity onPress={() => setShowDetail(false)}>
                      <MaterialIcons name="close" size={20} color={colors.icon} />
                    </TouchableOpacity>
                  </View>
                  
                  {modificationDetail.originalQuantity && (
                    <View style={styles.detailSection}>
                      <ThemedText style={styles.detailLabel}>Original:</ThemedText>
                      <ThemedText style={styles.detailText}>
                        {modificationDetail.originalQuantity} {modificationDetail.originalUnit}
                      </ThemedText>
                    </View>
                  )}
                  
                  <View style={styles.detailSection}>
                    <ThemedText style={styles.detailLabel}>Reason:</ThemedText>
                    <ThemedText style={styles.detailText}>
                      {modificationDetail.reason}
                    </ThemedText>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
}

function BaseContainer({ children }: BaseContainerProps) {
  const { styles } = useStyles();

  return <View style={styles.baseContainer}>{children}</View>;
}

function Amount({ children }: AmountProps) {
  const { styles, colors } = useStyles();

  return (
    <View style={styles.amountContainer}>
      <ThemedText style={[styles.amount, { color: colors.tint }]}>
        {children}
      </ThemedText>
    </View>
  );
}

function Unit({ children }: UnitProps) {
  const { styles } = useStyles();

  return <ThemedText style={styles.unit}>{children}</ThemedText>;
}

function Name({ children }: NameProps) {
  const { styles } = useStyles();

  return <ThemedText style={styles.name}>{children}</ThemedText>;
}

function SwapIngredientBtn({ onPress }: SwapIngredientBtnProps) {
  const { styles, colors } = useStyles();

  return (
    <TouchableOpacity style={styles.swapButton} onPress={onPress}>
      <MaterialIcons name="swap-horiz" size={18} color={colors.icon} />
    </TouchableOpacity>
  );
}

export const Ingredient = Object.assign(IngredientBase, {
  BaseContainer,
  Amount,
  Unit,
  Name,
  SwapIngredientBtn,
});
