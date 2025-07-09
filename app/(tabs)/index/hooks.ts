import { QUICK_ACTIONS } from "./constants";

export const useHomeData = (onQuickAdd: () => void) => {
  const quickActions = QUICK_ACTIONS.map((action) =>
    action.title === "Quick Add" ? { ...action, onPress: onQuickAdd } : action,
  );

  return { quickActions };
};
