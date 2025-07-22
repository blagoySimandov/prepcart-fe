import { FilterOption } from "../../hooks";

export const FILTER_OPTIONS = [
  {
    key: "all" as FilterOption,
    label: "All Recipes",
    description: "Show all recipes",
  },
  {
    key: "quick" as FilterOption,
    label: "Quick (≤30 min)",
    description: "30 minutes or less",
  },
  {
    key: "medium" as FilterOption,
    label: "Medium (31-60 min)",
    description: "31 to 60 minutes",
  },
  {
    key: "long" as FilterOption,
    label: "Long (>60 min)",
    description: "More than 60 minutes",
  },
];
