import { useStyles } from "@/app/(tabs)/styles";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";
import { SymbolViewProps } from "expo-symbols";
import { Text, TouchableOpacity, View } from "react-native";

interface QuickAction {
  title: string;
  description: string;
  icon: SymbolViewProps["name"];
  route: string;
  color: string;
}

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
            onPress={() => router.push(action.route)}>
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
