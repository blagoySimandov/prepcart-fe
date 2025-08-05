export const FILTER_LABELS = {
  quick: "Quick recipes",
  medium: "Medium recipes",
  long: "Long recipes",
};

export const FILTER_TIME_RANGES = {
  quick: { max: 30 },
  medium: { min: 30, max: 60 },
  long: { min: 60 },
};

export const ALERT_MESSAGES = {
  error: {
    title: "Error",
    loginRequired: "You must be logged in to delete recipes",
    loginRequiredImport: "You must be logged in to import recipes",
    deleteRecipeFailed: "Failed to delete recipe. Please try again.",
    importStatusFailed: "Failed to track recipe import status",
  },
  success: {
    title: "Success",
    recipeDeleted: "Recipe deleted successfully",
  },
  deleteRecipe: {
    title: "Delete Recipe?",
    getMessage: (title: string) =>
      `Are you sure you want to delete "${title}"? This action cannot be undone.`,
  },
  importRecipe: {
    completeTitle: "Import Complete!",
    getMessage: (title: string) => `"${title}" has been added to your recipes.`,
    timeoutTitle: "Import Taking Longer Than Expected",
    timeoutMessage:
      "The recipe import is taking longer than usual. Please check your recipes later.",
    failedTitle: "Import Failed",
    failedMessage: "Failed to import recipe. Please try again.",
  },
  duplicateRecipe: {
    title: "Recipe Already Imported",
    getMessage: (title: string) =>
      `"${title}" has already been imported to your recipes.`,
  },
};

export const BUTTON_TEXTS = {
  cancel: "Cancel",
  delete: "Delete",
  viewRecipe: "View Recipe",
  goToRecipe: "Go to Recipe",
  ok: "OK",
};
export const IMPORT_TIMEOUT = 25000;

