export const SELECTOR_CONSTANTS = {
  MODAL_TITLE: "Select Substitutions",
  MODAL_SUBTITLE: "Choose replacements for your ingredients",
  CANCEL_TEXT: "Cancel",
  CONFIRM_TEXT: "Apply Substitutions",
  LOADING_TEXT: "Finding alternatives...",
  ERROR_TEXT: "Failed to load alternatives",
  RETRY_TEXT: "Retry",
} as const;

export enum SubstitutionQuality {
  IDEAL = 'Ideal',
  GREAT = 'Great match',
  GOOD = 'Good substitute',
  FAIR = 'Fair option'
}

export enum ExecutionDifficulty {
  VERY_EASY = 'Very easy',
  EASY = 'Easy to execute',
  MODERATE = 'Moderate effort',
  CHALLENGING = 'More challenging'
}

export const SUBSTITUTION_QUALITY_CONFIG = {
  [SubstitutionQuality.IDEAL]: {
    icon: 'star',
    color: '#22c55e', // green
    backgroundColor: 'rgba(34, 197, 94, 0.1)'
  },
  [SubstitutionQuality.GREAT]: {
    icon: 'thumb-up',
    color: '#16a34a', // darker green
    backgroundColor: 'rgba(22, 163, 74, 0.1)'
  },
  [SubstitutionQuality.GOOD]: {
    icon: 'check-circle',
    color: '#eab308', // yellow
    backgroundColor: 'rgba(234, 179, 8, 0.1)'
  },
  [SubstitutionQuality.FAIR]: {
    icon: 'help',
    color: '#f97316', // orange
    backgroundColor: 'rgba(249, 115, 22, 0.1)'
  }
} as const;

export const EXECUTION_DIFFICULTY_CONFIG = {
  [ExecutionDifficulty.VERY_EASY]: {
    icon: 'trending-down',
    color: '#22c55e', // green
    backgroundColor: 'rgba(34, 197, 94, 0.1)'
  },
  [ExecutionDifficulty.EASY]: {
    icon: 'check',
    color: '#16a34a', // darker green
    backgroundColor: 'rgba(22, 163, 74, 0.1)'
  },
  [ExecutionDifficulty.MODERATE]: {
    icon: 'remove',
    color: '#eab308', // yellow
    backgroundColor: 'rgba(234, 179, 8, 0.1)'
  },
  [ExecutionDifficulty.CHALLENGING]: {
    icon: 'trending-up',
    color: '#ef4444', // red
    backgroundColor: 'rgba(239, 68, 68, 0.1)'
  }
} as const;

export const getSubstitutionQuality = (score: number): SubstitutionQuality => {
  if (score >= 0.9) {
    return SubstitutionQuality.IDEAL;
  } else if (score >= 0.8) {
    return SubstitutionQuality.GREAT;
  } else if (score >= 0.6) {
    return SubstitutionQuality.GOOD;
  } else {
    return SubstitutionQuality.FAIR;
  }
};

export const getExecutionDifficulty = (difficulty: number): ExecutionDifficulty => {
  if (difficulty < 1) {
    return ExecutionDifficulty.VERY_EASY;
  } else if (difficulty === 1) {
    return ExecutionDifficulty.EASY;
  } else if (difficulty <= 1.5) {
    return ExecutionDifficulty.MODERATE;
  } else {
    return ExecutionDifficulty.CHALLENGING;
  }
};