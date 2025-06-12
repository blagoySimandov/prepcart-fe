export interface RecipeImportPopupProps {
  visible: boolean;
  onClose: () => void;
  onImport: (url: string) => void;
  loading: boolean;
}
