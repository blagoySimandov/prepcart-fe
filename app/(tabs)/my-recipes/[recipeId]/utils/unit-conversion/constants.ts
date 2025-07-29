export const UNIT_SYSTEMS = {
  metric: 'metric',
  imperial: 'imperial',
  original: 'original',
} as const;

export const VOLUME_UNITS = {
  metric: ['ml', 'l'],
  imperial: ['tsp', 'Tbs', 'fl-oz', 'cup', 'pnt', 'qt', 'gal'],
} as const;

export const MASS_UNITS = {
  metric: ['mg', 'g', 'kg'],
  imperial: ['oz', 'lb'],
} as const;

export const COOKING_UNIT_MAPPINGS = {
  teaspoon: 'tsp',
  teaspoons: 'tsp',
  tablespoon: 'Tbs',
  tablespoons: 'Tbs',
  tbsp: 'Tbs',
  tbs: 'Tbs',
  'fluid ounce': 'fl-oz',
  'fluid ounces': 'fl-oz',
  milliliter: 'ml',
  milliliters: 'ml',
  liter: 'l',
  liters: 'l',
  gram: 'g',
  grams: 'g',
  kilogram: 'kg',
  kilograms: 'kg',
  ounce: 'oz',
  ounces: 'oz',
  pound: 'lb',
  pounds: 'lb',
  cup: 'cup',
  cups: 'cup',
  pint: 'pnt',
  pints: 'pnt',
  quart: 'qt',
  quarts: 'qt',
  gallon: 'gal',
  gallons: 'gal',
} as const;

export const UNIT_CATEGORIES = {
  volume: 'volume',
  mass: 'mass',
  count: 'count',
  other: 'other',
} as const;

export const PREFERRED_CONVERSIONS = {
  ml: ['tsp', 'Tbs', 'fl-oz', 'cup'],
  l: ['cup', 'pnt', 'qt', 'gal'],
  tsp: ['ml', 'Tbs'],
  Tbs: ['ml', 'tsp', 'fl-oz'],
  'fl-oz': ['ml', 'Tbs', 'cup'],
  cup: ['ml', 'fl-oz', 'pnt'],
  pnt: ['ml', 'l', 'cup', 'qt'],
  qt: ['l', 'pnt', 'gal'],
  gal: ['l', 'qt'],
  g: ['oz', 'lb'],
  kg: ['lb', 'oz'],
  oz: ['g', 'lb'],
  lb: ['g', 'kg', 'oz'],
} as const;

export const CONVERSION_PRECISION = {
  default: 2,
  wholeNumbers: 0,
  precise: 3,
} as const;

export const STORAGE_KEYS = {
  unitPreferences: '@unit_preferences',
  globalUnitSystem: '@global_unit_system',
} as const;

export const UI_CONSTANTS = {
  animationDuration: 200,
  iconSize: 16,
  toggleSize: 20,
} as const;