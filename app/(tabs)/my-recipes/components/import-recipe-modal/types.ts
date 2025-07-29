export interface ImportRecipeModalProps {
  visible: boolean;
  onClose: () => void;
  onImport: (url: string) => void;
}