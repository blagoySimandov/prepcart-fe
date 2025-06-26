import { ShoppingItem } from "@/src/user/shopping-list/types";
import { ItemParser } from "@/src/utils/item-parser";
import { useEffect, useState } from "react";
import { LayoutAnimation, Platform, UIManager } from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function useItemForm(itemToEdit?: ShoppingItem | null) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [simpleText, setSimpleText] = useState("");
  const [detailedName, setDetailedName] = useState("");
  const [detailedQuantity, setDetailedQuantity] = useState("");
  const [detailedUnit, setDetailedUnit] = useState("");

  const isEditMode = itemToEdit != null;

  // Initialize state from itemToEdit
  useEffect(() => {
    if (itemToEdit) {
      setDetailedName(itemToEdit.name);
      const quantityMatch = itemToEdit.quantity.match(
        /^(\d+(?:\.\d+)?)\s*(.*)$/
      );
      if (quantityMatch) {
        setDetailedQuantity(quantityMatch[1]);
        setDetailedUnit(quantityMatch[2] || "pcs");
      } else {
        setDetailedQuantity("1");
        setDetailedUnit("pcs");
      }
      setIsExpanded(true);
      setSimpleText("");
    } else {
      setDetailedName("");
      setDetailedQuantity("");
      setDetailedUnit("");
      setSimpleText("");
      setIsExpanded(false);
    }
  }, [itemToEdit]);

  const toggleExpand = () => {
    if (isEditMode) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (!isExpanded) {
      if (simpleText.trim()) {
        const parsed = ItemParser.parse(simpleText.trim());
        if (parsed && parsed.name) {
          setDetailedName(parsed.name);
          setDetailedQuantity(parsed.quantity.toString());
          setDetailedUnit(parsed.unit);
        } else {
          setDetailedName(simpleText.trim());
          setDetailedQuantity("1");
          setDetailedUnit("pcs");
        }
      }
    } else {
      if (detailedName.trim()) {
        if (
          detailedQuantity &&
          detailedUnit &&
          (detailedQuantity !== "1" || detailedUnit !== "pcs")
        ) {
          setSimpleText(
            `${detailedName.trim()} ${detailedQuantity} ${detailedUnit}`
          );
        } else {
          setSimpleText(detailedName.trim());
        }
      }
    }

    setIsExpanded(!isExpanded);
  };

  const clearForm = () => {
    setSimpleText("");
    setDetailedName("");
    setDetailedQuantity("");
    setDetailedUnit("");
  };

  return {
    // State
    isExpanded,
    isEditMode,
    simpleText,
    detailedName,
    detailedQuantity,
    detailedUnit,

    // State setters
    setSimpleText,
    setDetailedName,
    setDetailedQuantity,
    setDetailedUnit,

    // Actions
    toggleExpand,
    clearForm,
  };
}
