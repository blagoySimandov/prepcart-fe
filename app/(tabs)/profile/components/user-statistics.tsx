import React from "react";
import { Text, View } from "react-native";
import useStyles from "../styles";

interface UserStatisticsProps {
  userStats?: {
    totalSavings?: Record<string, number>;
    totalDiscoveredDiscounts?: number;
  };
}

export function UserStatistics({ userStats }: UserStatisticsProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>
          {Object.entries(userStats?.totalSavings || {})
            .map(
              ([currency, amount]) =>
                `${(amount as number).toFixed(2)} ${currency}`
            )
            .join("\n") || "0.00"}
        </Text>
        <Text style={styles.statLabel}>Total Savings</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>
          {userStats?.totalDiscoveredDiscounts || 0}
        </Text>
        <Text style={styles.statLabel}>Discounts Found</Text>
      </View>
    </View>
  );
}
