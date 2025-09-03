import { useAlert } from "@/components/providers/alert-provider";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Discount } from "@/src/discounts/types";
import { useStoreNames } from "@/src/shared/hooks/use-store-names";
import { ShoppingItem as ShoppingItemType } from "@/src/user/shopping-list/types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import { useStyles } from "../styles";
import { SWIPE_THRESHOLD, SWIPE_ACTION_WIDTH } from "./constants";

interface SwipeableShoppingItemProps {
  item: ShoppingItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (item: ShoppingItemType) => void;
  onShowDiscounts: (discounts: Discount[]) => void;
  discounts: Discount[];
  bestDiscountData?: Discount;
}

export function SwipeableShoppingItem({
  item,
  onToggle,
  onDelete,
  onEdit,
  onShowDiscounts,
  discounts,
  bestDiscountData,
}: SwipeableShoppingItemProps) {
  const { styles, colors } = useStyles();
  const { showAlert } = useAlert();
  const { getStoreName } = useStoreNames();
  const hasDiscounts = discounts.length > 0;

  const translateX = useSharedValue(0);
  const leftActionOpacity = useSharedValue(0);
  const rightActionOpacity = useSharedValue(0);

  const handleDeleteItem = (id: string, name: string) => {
    showAlert("Delete Item", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => onDelete(id) },
    ]);
  };

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      leftActionOpacity.value = 0;
      rightActionOpacity.value = 0;
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      
      if (event.translationX > 0) {
        leftActionOpacity.value = Math.min(1, event.translationX / SWIPE_ACTION_WIDTH);
        rightActionOpacity.value = 0;
      } else {
        rightActionOpacity.value = Math.min(1, Math.abs(event.translationX) / SWIPE_ACTION_WIDTH);
        leftActionOpacity.value = 0;
      }
    },
    onEnd: (event) => {
      const { translationX, velocityX } = event;
      
      if (Math.abs(translationX) > SWIPE_THRESHOLD || Math.abs(velocityX) > 1000) {
        if (translationX > 0) {
          runOnJS(onToggle)(item.id);
        } else {
          runOnJS(handleDeleteItem)(item.id, item.name);
        }
      }
      
      translateX.value = withSpring(0);
      leftActionOpacity.value = withSpring(0);
      rightActionOpacity.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const leftActionStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      leftActionOpacity.value,
      [0, 1],
      [colors.card, colors.success || "#4CAF50"]
    );
    
    return {
      opacity: leftActionOpacity.value,
      backgroundColor,
    };
  });

  const rightActionStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      rightActionOpacity.value,
      [0, 1],
      [colors.card, colors.error]
    );
    
    return {
      opacity: rightActionOpacity.value,
      backgroundColor,
    };
  });

  return (
    <View style={styles.swipeableContainer}>
      <Animated.View style={[styles.leftAction, leftActionStyle]}>
        <IconSymbol 
          name={item.completed ? "xmark" : "checkmark"} 
          size={24} 
          color={colors.background || "#FFFFFF"} 
        />
      </Animated.View>
      
      <Animated.View style={[styles.rightAction, rightActionStyle]}>
        <IconSymbol 
          name="trash" 
          size={24} 
          color={colors.background || "#FFFFFF"} 
        />
      </Animated.View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[animatedStyle]}>
          <View
            style={[
              styles.itemCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <TouchableOpacity
              style={styles.itemContent}
              onPress={() => onToggle(item.id)}
            >
              <View style={styles.itemLeft}>
                <View
                  style={[
                    styles.checkbox,
                    { borderColor: colors.tint },
                    item.completed && { backgroundColor: colors.tint },
                  ]}
                >
                  {item.completed && (
                    <IconSymbol
                      name="checkmark"
                      size={16}
                      color={colors.buttonText}
                    />
                  )}
                </View>
                <View style={styles.itemInfo}>
                  <Text
                    style={[
                      styles.itemName,
                      { color: colors.text },
                      item.completed && styles.completedText,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={[styles.itemDetails, { color: colors.icon }]}>
                    {item.quantity} {item.unit}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {hasDiscounts && bestDiscountData && (
              <TouchableOpacity
                style={styles.storeDiscountBadge}
                onPress={() => onShowDiscounts(discounts)}
              >
                <Text style={styles.storeDiscountStoreName}>
                  {getStoreName(bestDiscountData.store_id)}
                </Text>
                <Text style={styles.storeDiscountPercentage}>
                  {bestDiscountData.discount_percent}%
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
              <IconSymbol name="pencil" size={20} color={colors.tint} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}