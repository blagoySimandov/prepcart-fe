import convert from 'convert-units';
import {
  COOKING_UNIT_MAPPINGS,
  VOLUME_UNITS,
  MASS_UNITS,
  UNIT_CATEGORIES,
  PREFERRED_CONVERSIONS,
  CONVERSION_PRECISION,
} from './constants';
import { UnitCategory, ConversionResult, ConversionOptions } from './types';

export function normalizeUnit(unit: string | null | undefined): string {
  if (!unit) return '';
  const normalized = unit.toLowerCase().trim();
  return COOKING_UNIT_MAPPINGS[normalized as keyof typeof COOKING_UNIT_MAPPINGS] || normalized;
}

export function getUnitCategory(unit: string): UnitCategory {
  const normalized = normalizeUnit(unit);
  
  if (!normalized) return UNIT_CATEGORIES.count;
  
  const allVolumeUnits = [...VOLUME_UNITS.metric, ...VOLUME_UNITS.imperial];
  const allMassUnits = [...MASS_UNITS.metric, ...MASS_UNITS.imperial];
  
  // TODO: Define proper types for unit arrays
  if (allVolumeUnits.includes(normalized as typeof allVolumeUnits[number])) {
    return UNIT_CATEGORIES.volume;
  }
  
  if (allMassUnits.includes(normalized as typeof allMassUnits[number])) {
    return UNIT_CATEGORIES.mass;
  }
  
  if (['pcs', 'piece', 'pieces', 'each'].includes(normalized)) {
    return UNIT_CATEGORIES.count;
  }
  
  return UNIT_CATEGORIES.other;
}

export function isConvertibleUnit(unit: string): boolean {
  const normalized = normalizeUnit(unit);
  const category = getUnitCategory(normalized);
  return category === UNIT_CATEGORIES.volume || category === UNIT_CATEGORIES.mass;
}

export function getAvailableConversions(unit: string): string[] {
  const normalized = normalizeUnit(unit);
  
  if (!isConvertibleUnit(normalized)) {
    return [];
  }
  
  try {
    // TODO: Define proper type for convert-units library
    return PREFERRED_CONVERSIONS[normalized as keyof typeof PREFERRED_CONVERSIONS] || 
           convert().from(normalized as Parameters<typeof convert>['0']).possibilities();
  } catch {
    return [];
  }
}

export function convertUnit(
  value: number,
  fromUnit: string,
  toUnit: string,
  options: ConversionOptions = {}
): ConversionResult {
  const normalizedFrom = normalizeUnit(fromUnit);
  const normalizedTo = normalizeUnit(toUnit);
  const precision = options.precision ?? CONVERSION_PRECISION.default;
  
  if (!normalizedFrom || !normalizedTo || normalizedFrom === normalizedTo) {
    return {
      value,
      unit: fromUnit,
      formatted: formatQuantity(value, fromUnit),
      isConverted: false,
      originalValue: value,
      originalUnit: fromUnit,
    };
  }
  
  if (!isConvertibleUnit(normalizedFrom) || !isConvertibleUnit(normalizedTo)) {
    return {
      value,
      unit: fromUnit,
      formatted: formatQuantity(value, fromUnit),
      isConverted: false,
      originalValue: value,
      originalUnit: fromUnit,
    };
  }
  
  try {
    // TODO: Define proper type for convert-units library
    const convertedValue = convert(value).from(normalizedFrom as Parameters<ReturnType<typeof convert>['from']>['0']).to(normalizedTo as Parameters<ReturnType<ReturnType<typeof convert>['from']>['to']>['0']);
    const roundedValue = roundToPrecision(convertedValue, precision);
    
    return {
      value: roundedValue,
      unit: toUnit,
      formatted: formatQuantity(roundedValue, toUnit),
      isConverted: true,
      originalValue: value,
      originalUnit: fromUnit,
    };
  } catch (error) {
    console.warn(`Failed to convert ${value} ${fromUnit} to ${toUnit}:`, error);
    return {
      value,
      unit: fromUnit,
      formatted: formatQuantity(value, fromUnit),
      isConverted: false,
      originalValue: value,
      originalUnit: fromUnit,
    };
  }
}

export function getBestUnit(value: number, unit: string, options: ConversionOptions = {}): ConversionResult {
  const normalized = normalizeUnit(unit);
  
  if (!isConvertibleUnit(normalized)) {
    return {
      value,
      unit,
      formatted: formatQuantity(value, unit),
      isConverted: false,
      originalValue: value,
      originalUnit: unit,
    };
  }
  
  try {
    // TODO: Define proper type for convert-units library
    const result = convert(value).from(normalized as Parameters<ReturnType<typeof convert>['from']>['0']).toBest();
    const precision = options.precision ?? CONVERSION_PRECISION.default;
    const roundedValue = roundToPrecision(result.val, precision);
    
    return {
      value: roundedValue,
      unit: result.unit,
      formatted: formatQuantity(roundedValue, result.unit),
      isConverted: result.unit !== normalized,
      originalValue: value,
      originalUnit: unit,
    };
  } catch {
    return {
      value,
      unit,
      formatted: formatQuantity(value, unit),
      isConverted: false,
      originalValue: value,
      originalUnit: unit,
    };
  }
}

export function roundToPrecision(value: number, precision: number): number {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}

export function formatQuantity(value: number, unit: string): string {
  if (!unit || unit === 'pcs' || unit === 'pieces') {
    return value === 1 ? '' : value.toString();
  }
  
  const rounded = roundToPrecision(value, CONVERSION_PRECISION.default);
  
  if (rounded % 1 !== 0) {
    const whole = Math.floor(rounded);
    const fraction = rounded - whole;
    
    const fractionMap: { [key: number]: string } = {
      0.25: '¼',
      0.33: '⅓',
      0.5: '½',
      0.67: '⅔',
      0.75: '¾',
    };
    
    for (const [key, symbol] of Object.entries(fractionMap)) {
      if (Math.abs(fraction - parseFloat(key)) < 0.01) {
        return whole > 0 ? `${whole}${symbol} ${unit}` : `${symbol} ${unit}`;
      }
    }
  }
  
  return `${rounded} ${unit}`;
}