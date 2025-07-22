import { FilterOption } from "../../hooks";

export interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedFilter: FilterOption;
  onFilterSelect: (filter: FilterOption) => void;
}
