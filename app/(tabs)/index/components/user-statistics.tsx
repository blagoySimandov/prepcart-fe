import { useCountryRestriction } from "@/src/hooks/use-country-restriction";
import { useUserStatistics } from "@/src/user/hooks";
import { ActivityIndicator, Text, View } from "react-native";
import { useStyles } from "../styles";

export function UserStatistics() {
  const { styles, colors } = useStyles();
  const { stats, loading } = useUserStatistics();
  const { isDiscountsAvailable } = useCountryRestriction();

  // Hide statistics if discounts are not available in user's country
  if (isDiscountsAvailable === false) {
    return null;
  }

  return (
    <View style={styles.statsContainer}>
      <Text style={styles.sectionTitle}>Your Lifetime Stats</Text>
      {loading ? (
        <ActivityIndicator size="large" color={colors.tint} />
      ) : stats ? (
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {stats.totalDiscoveredDiscounts || 0}
            </Text>
            <Text style={styles.statLabel}>Discounts Found</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {Object.entries(stats.totalSavings || {})
                .map(
                  ([currency, amount]) =>
                    `${(amount as number).toFixed(2)} ${currency}`,
                )
                .join("\n") || "0.00 BGN"}
            </Text>
            <Text style={styles.statLabel}>Total Saved</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.emptyState}>
          No stats available yet. Start finding discounts!
        </Text>
      )}
    </View>
  );
}
