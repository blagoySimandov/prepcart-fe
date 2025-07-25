export interface SubstitutionOption {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  reason: string;
  impact: string;
}

export interface SubstitutionModalProps {
  visible: boolean;
  onClose: () => void;
  ingredientName: string;
  onSelect: (option: SubstitutionOption) => void;
  substitutionOptions: SubstitutionOption[];
}

export interface OptionItemProps {
  option: SubstitutionOption;
  onSelect: () => void;
}