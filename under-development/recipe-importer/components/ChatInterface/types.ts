export interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

export interface ChatInterfaceProps {
  onRecipeImportUrl: (url: string) => void;
  onRecipeImportText: (text: string) => void;
  onCalorieAnalysis: (imageUri: string) => void;
  loading: boolean;
  aiResponse?: string;
}
