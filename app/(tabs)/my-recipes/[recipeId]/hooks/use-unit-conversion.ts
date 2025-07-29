import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  convertUnit,
  getAvailableConversions,
  isConvertibleUnit,
  normalizeUnit,
  getUnitCategory,
  getBestUnit,
} from '../utils/unit-conversion';
import {
  UnitConversionState,
  UnitPreferences,
  GlobalUnitPreferences,
  UnitSystem,
} from '../utils/unit-conversion/types';
import { STORAGE_KEYS, UNIT_SYSTEMS } from '../utils/unit-conversion/constants';

export function useUnitConversion(
  initialValue: number | null,
  initialUnit: string | null,
  ingredientName: string,
  recipeId: string
) {
  const safeValue = initialValue ?? 0;
  const safeUnit = normalizeUnit(initialUnit) || 'pcs';
  
  const [state, setState] = useState<UnitConversionState>(() => {
    // Initialize state with saved preference if available
    let initialState = {
      currentUnit: safeUnit,
      currentValue: safeValue,
      originalUnit: safeUnit,
      originalValue: safeValue,
      availableConversions: getAvailableConversions(safeUnit),
      category: getUnitCategory(safeUnit),
      isConverted: false,
    };
    
    return initialState;
  });
  
  const [preferences, setPreferences] = useState<UnitPreferences>({});
  const [globalPreferences, setGlobalPreferences] = useState<GlobalUnitPreferences>({
    defaultSystem: UNIT_SYSTEMS.original,
    autoConvert: false,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);


  useEffect(() => {
    if (globalPreferences.autoConvert && state.availableConversions.length > 0) {
      applySystemPreference();
    }
  }, [globalPreferences.autoConvert, globalPreferences.defaultSystem]);

  const loadPreferences = async () => {
    try {
      const [unitPrefs, globalPrefs] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.unitPreferences),
        AsyncStorage.getItem(STORAGE_KEYS.globalUnitSystem),
      ]);
      
      if (unitPrefs) {
        const parsed = JSON.parse(unitPrefs);
        setPreferences(parsed);
        
        const savedPref = parsed[recipeId]?.[ingredientName];
        const savedUnit = savedPref?.preferredUnit;
        const savedValue = savedPref?.preferredValue;
        
        if (savedUnit && savedUnit !== safeUnit && isConvertibleUnit(safeUnit) && isConvertibleUnit(savedUnit)) {
          // If we have a saved value, use it; otherwise convert
          const displayValue = savedValue ?? convertUnit(safeValue, safeUnit, savedUnit).value;
          
          setState({
            currentUnit: savedUnit,
            currentValue: displayValue,
            originalUnit: safeUnit,
            originalValue: safeValue,
            availableConversions: getAvailableConversions(safeUnit),
            category: getUnitCategory(safeUnit),
            isConverted: true,
          });
        }
      }
      
      if (globalPrefs) {
        setGlobalPreferences(JSON.parse(globalPrefs));
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to load unit preferences:', error);
      setIsInitialized(true);
    }
  };

  const savePreference = async (unit: string, value?: number) => {
    try {
      const newPreferences = {
        ...preferences,
        [recipeId]: {
          ...preferences[recipeId],
          [ingredientName]: {
            preferredUnit: unit,
            preferredValue: value ?? state.currentValue,
            systemOverride: unit !== state.originalUnit ? globalPreferences.defaultSystem : undefined,
          },
        },
      };
      
      await AsyncStorage.setItem(
        STORAGE_KEYS.unitPreferences,
        JSON.stringify(newPreferences)
      );
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Failed to save unit preference:', error);
    }
  };

  const convertToUnit = useCallback((targetUnit: string) => {
    if (!isConvertibleUnit(safeUnit) || !isConvertibleUnit(targetUnit)) {
      return;
    }
    
    const result = convertUnit(
      safeValue,
      safeUnit,
      targetUnit
    );
    
    setState(prev => ({
      ...prev,
      currentUnit: result.unit,
      currentValue: result.value,
      isConverted: result.isConverted,
    }));
    
    if (result.isConverted) {
      savePreference(result.unit, result.value);
    }
  }, [safeValue, safeUnit, recipeId, ingredientName]);

  const cycleUnit = useCallback(() => {
    const availableUnits = [safeUnit, ...state.availableConversions];
    const currentIndex = availableUnits.indexOf(state.currentUnit);
    const nextIndex = (currentIndex + 1) % availableUnits.length;
    const nextUnit = availableUnits[nextIndex];
    
    convertToUnit(nextUnit);
  }, [state.currentUnit, state.availableConversions, safeUnit, convertToUnit]);

  const resetToOriginal = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentUnit: safeUnit,
      currentValue: safeValue,
      isConverted: false,
    }));
    savePreference(safeUnit, safeValue);
  }, [safeUnit, safeValue]);

  const convertToBest = useCallback(() => {
    const result = getBestUnit(safeValue, safeUnit);
    
    if (result.isConverted) {
      setState(prev => ({
        ...prev,
        currentUnit: result.unit,
        currentValue: result.value,
        isConverted: true,
      }));
      savePreference(result.unit, result.value);
    }
  }, [safeValue, safeUnit]);

  const applySystemPreference = useCallback(() => {
    if (globalPreferences.defaultSystem === UNIT_SYSTEMS.original) {
      resetToOriginal();
      return;
    }
    
    const isMetric = globalPreferences.defaultSystem === UNIT_SYSTEMS.metric;
    const targetUnits = state.availableConversions.filter(unit => {
      const isMetricUnit = ['ml', 'l', 'g', 'kg'].includes(unit);
      return isMetric === isMetricUnit;
    });
    
    if (targetUnits.length > 0) {
      convertToUnit(targetUnits[0]);
    }
  }, [globalPreferences.defaultSystem, state.availableConversions, convertToUnit, resetToOriginal]);

  return {
    ...state,
    originalValue: safeValue,
    originalUnit: safeUnit,
    isConvertible: isConvertibleUnit(safeUnit),
    isInitialized,
    cycleUnit,
    convertToUnit,
    resetToOriginal,
    convertToBest,
    applySystemPreference,
  };
}

export function useGlobalUnitPreferences() {
  const [preferences, setPreferences] = useState<GlobalUnitPreferences>({
    defaultSystem: UNIT_SYSTEMS.original,
    autoConvert: false,
  });

  useEffect(() => {
    loadGlobalPreferences();
  }, []);

  const loadGlobalPreferences = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.globalUnitSystem);
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load global preferences:', error);
    }
  };

  const updateGlobalPreferences = async (updates: Partial<GlobalUnitPreferences>) => {
    try {
      const newPreferences = { ...preferences, ...updates };
      await AsyncStorage.setItem(
        STORAGE_KEYS.globalUnitSystem,
        JSON.stringify(newPreferences)
      );
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Failed to save global preferences:', error);
    }
  };

  const setDefaultSystem = (system: UnitSystem) => {
    updateGlobalPreferences({ defaultSystem: system });
  };

  const toggleAutoConvert = () => {
    updateGlobalPreferences({ autoConvert: !preferences.autoConvert });
  };

  return {
    ...preferences,
    setDefaultSystem,
    toggleAutoConvert,
    updateGlobalPreferences,
  };
}