import { formatTime } from "@/src/user/util";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { useStyles } from "../styles";

interface RecipeStatsProps {
  ingredientsCount: number;
  instructionsCount: number;
  cookTimeMinutes: number;
  style?: StyleProp<ViewStyle>;
}

export function RecipeStats({
  ingredientsCount,
  instructionsCount,
  cookTimeMinutes,
  style,
}: RecipeStatsProps) {
  const styles = useStyles();

  return (
    <View style={[styles.statsContainer, style]}>
      <View style={styles.statItem}>
        <View style={styles.statIconContainer}>
          <Text style={styles.statIcon}>🥘</Text>
        </View>
        <Text style={styles.statLabel}>Ingredients</Text>
        <Text style={styles.statValue}>{ingredientsCount}</Text>
      </View>

      <View style={styles.statDivider} />

      <View style={styles.statItem}>
        <View style={styles.statIconContainer}>
          <Text style={styles.statIcon}>👨‍🍳</Text>
        </View>
        <Text style={styles.statLabel}>Steps</Text>
        <Text style={styles.statValue}>{instructionsCount}</Text>
      </View>

      <View style={styles.statDivider} />

      <View style={styles.statItem}>
        <View style={styles.statIconContainer}>
          <Text style={styles.statIcon}>⏱️</Text>
        </View>
        <Text style={styles.statLabel}>Cook Time</Text>
        <Text style={styles.statValue}>
          {formatTime(cookTimeMinutes * 60, { showSeconds: false })} min
        </Text>
      </View>
    </View>
  );
}
