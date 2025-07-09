import { QuickAction } from "./types";

export const QUICK_ACTIONS: QuickAction[] = [
  {
    title: "Quick Add",
    description: "Add an item to your list",
    icon: "plus.circle.fill",
    color: "#4682B4",
  },
  {
    title: "Shopping List",
    description: "Manage your groceries",
    icon: "cart.fill",
    route: "/(tabs)/shopping-list",
    color: "#8FBC8F",
  },
  {
    title: "Catalog Search",
    description: "Find products & discounts",
    icon: "magnifyingglass.circle.fill",
    route: "/(tabs)/catalog-search",
    color: "#FF6B6B",
  },
  {
    title: "My Profile",
    description: "Settings & preferences",
    icon: "person.fill",
    route: "/(tabs)/profile",
    color: "#DEB887",
  },
];
