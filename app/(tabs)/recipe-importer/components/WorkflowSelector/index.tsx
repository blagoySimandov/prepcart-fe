import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { WorkflowSelectorProps } from "./types";
import useStyles from "./styles";

export function WorkflowSelector({
  onRecipeImportPress,
  onCalorieAnalysisPress,
}: WorkflowSelectorProps) {
  const { styles } = useStyles();

  const workflows = [
    {
      id: "recipe-import",
      label: "📝 Recipe Import",
      description: "Import recipes from URL",
      onPress: onRecipeImportPress,
    },
    {
      id: "calorie-analysis",
      label: "📸 Calorie Analysis",
      description: "Analyze food photos",
      onPress: onCalorieAnalysisPress,
    },
  ];

  return (
    <View style={styles.workflowSelector}>
      {workflows.map((workflow) => (
        <TouchableOpacity
          key={workflow.id}
          style={styles.workflowButton}
          onPress={workflow.onPress}>
          <ThemedText style={styles.workflowButtonText}>
            {workflow.label}
          </ThemedText>
          <ThemedText style={styles.workflowDescription}>
            {workflow.description}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}
