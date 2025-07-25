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

function IngredientBase({ children }: IngredientProps) {
  const { styles } = useStyles();

  return <View style={styles.container}>{children}</View>;
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
