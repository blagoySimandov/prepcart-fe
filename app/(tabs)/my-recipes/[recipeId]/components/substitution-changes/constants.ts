import { COMMON_COLORS } from "@/constants/colors";

export const CHANGES_CONSTANTS = {
  MODAL_TITLE: "Recipe Changes",
  DIFFICULTY_LABEL: "Difficulty:",
  EXPECTED_OUTCOME_LABEL: "Expected Outcome:",
  INGREDIENTS_SECTION: "Ingredient Changes",
  INSTRUCTIONS_SECTION: "Instruction Changes",
  COOKING_TIME_ADJUSTMENT: "Cooking Time Adjustment:",
  MINUTES_SUFFIX: "minutes",
  TIPS_SECTION: "Critical Tips",
  CANCEL_BUTTON: "Cancel",
  APPLY_BUTTON: "Apply Changes",
  ACTION_LABELS: {
    add: "ADD",
    modify: "MODIFY",
    remove: "REMOVE",
  } as const,
  ACTION_COLORS: {
    add: COMMON_COLORS.success,
    modify: COMMON_COLORS.warning,
    remove: COMMON_COLORS.error,
  } as const,
} as const;