import { ShoppingItem } from "@/src/user/shopping-list/types";
import React, { useRef } from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { useItemActions } from "../hooks/use-item-actions";
import { useItemForm } from "../hooks/use-item-form";
import { useStyles } from "../styles";
import { DetailedInputView, DetailedInputViewRef } from "./detailed-input-view";
import { ModalActions } from "./modal-actions";
import { ModalHeader } from "./modal-header";
import { SimpleInputView, SimpleInputViewRef } from "./simple-input-view";

interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
  onAddItem: (item: { name: string; quantity: string }) => void;
  onUpdateItem: (id: string, item: { name: string; quantity: string }) => void;
  itemToEdit?: ShoppingItem | null;
}

export function AddItemModal({
  visible,
  onClose,
  onAddItem,
  onUpdateItem,
  itemToEdit,
}: AddItemModalProps) {
  const { styles } = useStyles();
  const simpleInputRef = useRef<SimpleInputViewRef>(null);
  const detailedInputRef = useRef<DetailedInputViewRef>(null);

  const {
    isExpanded,
    isEditMode,
    simpleText,
    detailedName,
    detailedQuantity,
    detailedUnit,
    setSimpleText,
    setDetailedName,
    setDetailedQuantity,
    setDetailedUnit,
    toggleExpand,
    clearForm,
  } = useItemForm(itemToEdit);

  const { handleParseAndAdd, handleDetailedAdd } = useItemActions({
    onAddItem,
    onUpdateItem,
    onClose,
    clearForm,
    itemToEdit,
  });

  const handleSave = () => {
    if (isExpanded || isEditMode) {
      detailedInputRef.current?.handleSubmit();
    } else {
      simpleInputRef.current?.handleSubmit();
    }
  };

  const saveButtonText = isEditMode ? "Save" : isExpanded ? "Add Item" : "Add";

  return (
    <Modal
      key={itemToEdit?.id || "new"}
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modal}>
          <View style={styles.addItemModalContent}>
            <ModalHeader
              isEditMode={isEditMode}
              isExpanded={isExpanded}
              onToggleExpand={toggleExpand}
            />

            {!isExpanded ? (
              <SimpleInputView
                ref={simpleInputRef}
                value={simpleText}
                onValueChange={setSimpleText}
                onParseAndAdd={handleParseAndAdd}
              />
            ) : (
              <DetailedInputView
                ref={detailedInputRef}
                name={detailedName}
                quantity={detailedQuantity}
                unit={detailedUnit}
                onNameChange={setDetailedName}
                onQuantityChange={setDetailedQuantity}
                onUnitChange={setDetailedUnit}
                onAddItem={handleDetailedAdd}
              />
            )}

            <ModalActions
              onCancel={onClose}
              onSave={handleSave}
              saveText={saveButtonText}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
