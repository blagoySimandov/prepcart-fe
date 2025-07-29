import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ingredient } from "@/src/user/recipes/types";
import { useStyles } from "./styles";
import { useAddToShoppingList } from "./hooks";
import { MODAL_MESSAGES, SERVING_OPTIONS } from "./constants";
import { formatQuantityDisplay } from "../../utils/ingredient-formatter";
import { ICON_SIZES } from "@/constants/ui";

interface AddToShoppingListModalProps {
  visible: boolean;
  onClose: () => void;
  ingredients: Ingredient[];
}

export function AddToShoppingListModal({
  visible,
  onClose,
  ingredients,
}: AddToShoppingListModalProps) {
  const { styles, colors } = useStyles();
  const {
    selectedIngredients,
    servingMultiplier,
    isAdding,
    formattedIngredients,
    toggleIngredient,
    selectAll,
    deselectAll,
    setServingMultiplier,
    handleAddToShoppingList,
  } = useAddToShoppingList(ingredients, onClose);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>{MODAL_MESSAGES.title}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                  disabled={isAdding}
                >
                  <MaterialIcons
                    name="close"
                    size={ICON_SIZES.large}
                    color={colors.icon}
                  />
                </TouchableOpacity>
              </View>

              {ingredients.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    {MODAL_MESSAGES.emptyIngredients}
                  </Text>
                </View>
              ) : (
                <>
                  {/* Servings Selector */}
                  <View style={styles.servingsSection}>
                    <Text style={styles.servingsLabel}>
                      {MODAL_MESSAGES.servings}
                    </Text>
                    <View style={styles.servingsSelector}>
                      {SERVING_OPTIONS.map((option) => (
                        <TouchableOpacity
                          key={option.value}
                          style={[
                            styles.servingOption,
                            servingMultiplier === option.value &&
                              styles.servingOptionSelected,
                          ]}
                          onPress={() => setServingMultiplier(option.value)}
                          disabled={isAdding}
                        >
                          <Text
                            style={[
                              styles.servingOptionText,
                              servingMultiplier === option.value &&
                                styles.servingOptionTextSelected,
                            ]}
                          >
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Selection Controls */}
                  <View style={styles.selectionControls}>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={selectAll}
                      disabled={isAdding}
                    >
                      <Text style={styles.controlButtonText}>
                        {MODAL_MESSAGES.selectAll}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={deselectAll}
                      disabled={isAdding}
                    >
                      <Text style={styles.controlButtonText}>
                        {MODAL_MESSAGES.deselectAll}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Ingredients List */}
                  <ScrollView style={styles.ingredientsList}>
                    {formattedIngredients.map((ingredient, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.ingredientItem}
                        onPress={() => toggleIngredient(ingredient.name)}
                        disabled={isAdding}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            selectedIngredients.has(ingredient.name) &&
                              styles.checkboxChecked,
                          ]}
                        >
                          {selectedIngredients.has(ingredient.name) && (
                            <MaterialIcons
                              name="check"
                              size={16}
                              color={colors.buttonText}
                            />
                          )}
                        </View>
                        <View style={styles.ingredientInfo}>
                          <Text style={styles.ingredientName}>
                            {ingredient.name}
                          </Text>
                          {ingredient.isToTaste ? (
                            <Text style={styles.ingredientQuantity}>
                              to taste
                            </Text>
                          ) : (
                            !ingredient.shouldOmitQuantity && (
                              <Text style={styles.ingredientQuantity}>
                                {formatQuantityDisplay(
                                  ingredient.quantity,
                                  ingredient.unit
                                )}
                              </Text>
                            )
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  {/* Footer Buttons */}
                  <View style={styles.footer}>
                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={onClose}
                      disabled={isAdding}
                    >
                      <Text
                        style={[styles.buttonText, styles.cancelButtonText]}
                      >
                        {MODAL_MESSAGES.cancelButton}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.addButton]}
                      onPress={handleAddToShoppingList}
                      disabled={isAdding || selectedIngredients.size === 0}
                    >
                      {isAdding ? (
                        <ActivityIndicator color={colors.buttonText} />
                      ) : (
                        <Text
                          style={[styles.buttonText, styles.addButtonText]}
                        >
                          {MODAL_MESSAGES.addButton}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}