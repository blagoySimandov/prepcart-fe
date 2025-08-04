export interface SubstitutionCandidate {
  name: string;
  score: number;
  executionDifficulty: number;
}

export interface SubstitutionSelection {
  ingredient: string;
  selectedCandidate: string | null;
}

export interface SubstitutionSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  ingredientsToReplace: string[];
  replacementCandidates: {
    ingredient: string;
    candidates: SubstitutionCandidate[];
  }[];
  onConfirm: (selections: SubstitutionSelection[]) => void;
  isLoading?: boolean;
  error?: string | null;
}