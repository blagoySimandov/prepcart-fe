import { SymbolViewProps } from "expo-symbols";

export interface QuickAction {
  title: string;
  description: string;
  icon: SymbolViewProps["name"];
  route?: string;
  onPress?: () => void;
  color: string;
}
