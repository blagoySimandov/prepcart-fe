import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View, Modal, FlatList } from "react-native";
import { useStyles } from "./styles";
import {
  AmountProps,
  BaseContainerProps,
  IngredientProps,
  NameProps,
  UnitProps,
  SwapIngredientBtnProps,
} from "./types";
import { useUnitConversion } from "../../hooks";
import {
  formatQuantity,
  convertUnit,
  roundToPrecision,
  normalizeUnit,
} from "../../utils/unit-conversion/converter";
import { DetailModal } from "../detail-modal";
import { DetailSection } from "../detail-section";
import { ICON_SIZES } from "@/constants/ui";
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
              status === MODIFICATION_STATUS.modify && styles.modifyIndicator,
              status === MODIFICATION_STATUS.remove && styles.removeIndicator,
            ]}
          />
        )}
        {children}
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
            <MaterialIcons
              name={ICON_NAMES.info}
              size={14}
              color={
                status === MODIFICATION_STATUS.add
                  ? COMMON_COLORS.success
                  : status === MODIFICATION_STATUS.modify
                    ? COMMON_COLORS.warning
                    : COMMON_COLORS.error
              }
            />
          </TouchableOpacity>
        )}
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

function Amount({ children, value }: AmountProps) {
  const { styles, colors } = useStyles();

  const formatDisplayValue = () => {
    const val = value ?? children;
    if (typeof val === "number") {
      // Round to 2 decimal places
      const rounded = roundToPrecision(val, 2);

      // Format with fractions if applicable
      if (rounded % 1 !== 0) {
        const whole = Math.floor(rounded);
        const fraction = rounded - whole;

        const fractionMap: { [key: number]: string } = {
          0.25: "¼",
          0.33: "⅓",
          0.5: "½",
          0.67: "⅔",
          0.75: "¾",
        };

        for (const [key, symbol] of Object.entries(fractionMap)) {
          if (Math.abs(fraction - parseFloat(key)) < 0.01) {
            return whole > 0 ? `${whole}${symbol}` : symbol;
          }
        }
      }

      return rounded.toString();
    }
    return val;
  };

  return (
    <View style={styles.amountContainer}>
      <ThemedText style={[styles.amount, { color: colors.tint }]}>
        {formatDisplayValue()}
      </ThemedText>
    </View>
  );
}

function Unit({
  children,
  value,
  quantity,
  ingredientName,
  recipeId,
  onUnitConverted,
  currentConversion,
}: UnitProps) {
  const { styles, colors } = useStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const quantityToSend = quantity ?? null;
  const unitConversion = useUnitConversion(
    quantityToSend,
    value || children?.toString() || null,
    ingredientName || "",
    recipeId || "",
  );

  const displayUnit = currentConversion?.unit || unitConversion.currentUnit;

  if (
    unitConversion.isInitialized &&
    unitConversion.isConverted &&
    onUnitConverted &&
    !currentConversion &&
    displayUnit !== value
  ) {
    setTimeout(() => {
      onUnitConverted(unitConversion.currentUnit, unitConversion.currentValue);
    }, 0);
  }

  const handleUnitPress = () => {
    if (unitConversion.isConvertible) {
      if (unitConversion.availableConversions.length === 1) {
        unitConversion.cycleUnit();
        const availableUnits = [
          unitConversion.originalUnit,
          ...unitConversion.availableConversions,
        ];
        const currentIndex = availableUnits.indexOf(unitConversion.currentUnit);
        const nextIndex = (currentIndex + 1) % availableUnits.length;
        const nextUnit = availableUnits[nextIndex];

        const result = convertUnit(
          unitConversion.originalValue,
          unitConversion.originalUnit,
          nextUnit,
        );
        onUnitConverted?.(result.unit, result.value);
      } else {
        setModalVisible(true);
      }
    }
  };

  const handleUnitSelect = (targetUnit: string) => {
    unitConversion.convertToUnit(targetUnit);
    setModalVisible(false);

    if (targetUnit === unitConversion.originalUnit) {
      onUnitConverted?.(
        unitConversion.originalUnit,
        unitConversion.originalValue,
      );
    } else {
      const result = convertUnit(
        unitConversion.originalValue,
        unitConversion.originalUnit,
        targetUnit,
      );
      onUnitConverted?.(result.unit, result.value);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.unitContainer}
        onPress={handleUnitPress}
        disabled={!unitConversion.isConvertible}
      >
        <ThemedText
          style={[
            styles.unit,
            unitConversion.isConvertible && styles.unitClickable,
            unitConversion.isConverted && styles.unitConverted,
          ]}
        >
          {displayUnit}
        </ThemedText>
      </TouchableOpacity>

      {unitConversion.isConvertible && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <ThemedView style={styles.modalContent}>
              <ThemedText style={styles.modalTitle}>Convert Unit</ThemedText>
              <FlatList
                data={[
                  unitConversion.originalUnit,
                  ...unitConversion.availableConversions,
                ]}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                  const isCurrentUnit = item === displayUnit;
                  const baseValue = quantity || 0;
                  const baseUnit = normalizeUnit(
                    value || children?.toString() || "",
                  );
                  let modalDisplayValue = baseValue;
                  if (item !== baseUnit) {
                    const result = convertUnit(baseValue, baseUnit, item);
                    modalDisplayValue = result.value;
                  }

                  return (
                    <TouchableOpacity
                      style={[
                        styles.unitOption,
                        isCurrentUnit && styles.unitOptionActive,
                      ]}
                      onPress={() => handleUnitSelect(item)}
                    >
                      <ThemedText
                        style={[
                          styles.unitOptionText,
                          isCurrentUnit && styles.unitOptionTextActive,
                        ]}
                      >
                        {formatQuantity(modalDisplayValue, item)}
                      </ThemedText>
                      {isCurrentUnit && (
                        <MaterialIcons
                          name={ICON_NAMES.check}
                          size={ICON_SIZES.small}
                          color={colors.tint}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            </ThemedView>
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
}

function Name({
  children,
  isRemoved,
  style,
}: NameProps & { isRemoved?: boolean }) {
  const { styles } = useStyles();

  return (
    <ThemedText style={[styles.name, isRemoved && styles.removeName, style]}>
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
