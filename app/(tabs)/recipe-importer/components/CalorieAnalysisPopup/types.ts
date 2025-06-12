export interface CalorieAnalysisPopupProps {
  visible: boolean;
  onClose: () => void;
  onAnalyze: (imageUri: string) => void;
  loading: boolean;
}
