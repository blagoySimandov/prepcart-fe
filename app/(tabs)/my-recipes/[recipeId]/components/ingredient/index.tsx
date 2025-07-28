import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useStyles } from "./styles";
import {
  AmountProps,
  BaseContainerProps,
  IngredientProps,
  NameProps,
  UnitProps,
  SwapIngredientBtnProps,
} from "./types";
import { DetailModal } from "../detail-modal";
import { DetailSection } from "../detail-section";
import { ICON_SIZES, SPACING } from "@/constants/ui";
import { ICON_NAMES } from "@/constants/icons";
import { COMMON_COLORS } from "@/constants/colors";
import { MODIFICATION_STATUS } from "../../constants";
import { MODAL_TITLES, LABELS } from "../../messages";
import { useDetailModal } from "../hooks";

function IngredientBase({
  children,
  status,
  modificationDetail,
}: IngredientProps) {
  const { styles } = useStyles();
  const modal = useDetailModal();

  return (
    <>
      <View
        style={[
          styles.container,
          status === MODIFICATION_STATUS.add && styles.addContainer,
          status === MODIFICATION_STATUS.modify && styles.modifyContainer,
          status === MODIFICATION_STATUS.remove && styles.removeContainer,
        ]}
      >
        {status && (
          <View
            style={[
              styles.statusIndicator,
              status === MODIFICATION_STATUS.add && styles.addIndicator,
              status === MODIFICATION_STATUS.modify &&
                styles.modifyIndicator,
              status === MODIFICATION_STATUS.remove && styles.removeIndicator,
            ]}
          />
        )}
        {status && (
          <TouchableOpacity
            style={[
              styles.statusBadge,
              status === MODIFICATION_STATUS.add && styles.addBadge,
              status === MODIFICATION_STATUS.modify && styles.modifyBadge,
              status === MODIFICATION_STATUS.remove && styles.removeBadge,
            ]}
            onPress={modal.open}
          >
            <ThemedText style={styles.statusBadgeText}>{status}</ThemedText>
            <MaterialIcons
              name={ICON_NAMES.info}
              size={ICON_SIZES.xs}
              color={COMMON_COLORS.white}
              style={{ marginLeft: SPACING.xs }}
            />
          </TouchableOpacity>
        )}
        {children}
      </View>

      {modificationDetail && (
        <DetailModal
          visible={modal.isVisible}
          onClose={modal.close}
          title={
            status === MODIFICATION_STATUS.add
              ? MODAL_TITLES.addedIngredient
              : status === MODIFICATION_STATUS.modify
                ? MODAL_TITLES.modifiedIngredient
                : MODAL_TITLES.removedIngredient
          }
        >
          {modificationDetail.originalQuantity && (
            <DetailSection label={LABELS.original}>
              {modificationDetail.originalQuantity}{" "}
              {modificationDetail.originalUnit || " "}
            </DetailSection>
          )}
          <DetailSection label={LABELS.reason}>
            {modificationDetail.reason}
          </DetailSection>
        </DetailModal>
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

function Name({ children, isRemoved }: NameProps & { isRemoved?: boolean }) {
  const { styles } = useStyles();

  return (
    <ThemedText style={[styles.name, isRemoved && styles.removeName]}>
      {children}
    </ThemedText>
  );
}

function SwapIngredientBtn({ onPress }: SwapIngredientBtnProps) {
  const { styles, colors } = useStyles();

  return (
    <TouchableOpacity style={styles.swapButton} onPress={onPress}>
      <MaterialIcons
        name={ICON_NAMES.swapHoriz}
        size={ICON_SIZES.large}
        color={colors.icon}
      />
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
