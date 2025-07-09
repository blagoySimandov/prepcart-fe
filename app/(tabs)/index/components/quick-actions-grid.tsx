import { IconSymbol } from "@/components/ui/IconSymbol";
import { RelativePathString, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useStyles } from "../styles";
import { QuickAction } from "../types";

interface QuickActionsGridProps {
  actions: QuickAction[];
}

export function QuickActionsGrid({ actions }: QuickActionsGridProps) {
  const { styles } = useStyles();

  return (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.title}
            style={[
              styles.quickActionCard,
              { backgroundColor: action.color + "20" },
            ]}
            onPress={() =>
              action.route
                ? router.push(action.route as RelativePathString) // Hack to fix type error...
                : action.onPress?.()
            }
          >
            <View style={styles.quickActionIcon}>
              <IconSymbol name={action.icon} size={24} color={action.color} />
            </View>
            <Text style={styles.quickActionTitle}>{action.title}</Text>
            <Text style={styles.quickActionDescription}>
              {action.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
