export interface SubstitutionSelection {
  ingredient: string;
  selectedCandidate: string | null;
}

export interface SubstitutionSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  ingredientsToReplace: string[];
  replacementCandidates: Array<{
    ingredient: string;
    candidates: string[];
  }>;
  onConfirm: (selections: SubstitutionSelection[]) => void;
  isLoading?: boolean;
  error?: string | null;
}