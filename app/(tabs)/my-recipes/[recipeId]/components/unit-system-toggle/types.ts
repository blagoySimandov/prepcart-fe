import { UnitSystem } from '../../utils/unit-conversion/types';

export interface UnitSystemToggleProps {
  currentSystem: UnitSystem;
  onSystemChange: (system: UnitSystem) => void;
  disabled?: boolean;
}