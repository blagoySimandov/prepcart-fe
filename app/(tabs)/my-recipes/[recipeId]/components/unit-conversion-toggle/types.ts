export interface UnitConversionToggleProps {
  currentUnit: string;
  currentValue: number;
  availableConversions: string[];
  onConvert: (unit: string) => void;
  isConverted: boolean;
  disabled?: boolean;
  showLabel?: boolean;
}