import { useStoreNames } from "@/src/shared/hooks/use-store-names";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

interface LoyaltyCardIndicatorProps {
  storeId: string;
  themeColors: any;
}

export function LoyaltyCardIndicator({
  storeId,
  themeColors,
}: LoyaltyCardIndicatorProps) {
  const { getStoreName } = useStoreNames();
  const storeName = getStoreName(storeId);

  return (
    <View
      style={[styles.loyaltyCardIndicator, { borderColor: themeColors.tint }]}>
      <Ionicons
        name="card"
        size={16}
        color={themeColors.tint}
        style={styles.loyaltyCardIcon}
      />
      <Text style={[styles.loyaltyCardText, { color: themeColors.tint }]}>
        This discount requires {storeName} card
      </Text>
    </View>
  );
}
