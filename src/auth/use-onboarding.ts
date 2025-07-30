import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./hooks";

export enum OnboardingStep {
  NONE = "none",
  DISPLAY_NAME = "display_name",
  COUNTRY = "country",
  COMPLETE = "complete",
}

export function useOnboarding() {
  const { checkUserHasCountry, updateDisplayName, updateUserCountry } = useAuth();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.NONE);

  const startOnboardingFlow = useCallback(async (isAnonymous: boolean) => {
    try {
      if (isAnonymous) {
        setCurrentStep(OnboardingStep.DISPLAY_NAME);
        return;
      }

      const hasCountry = await checkUserHasCountry();
      if (!hasCountry) {
        setCurrentStep(OnboardingStep.COUNTRY);
      } else {
        setCurrentStep(OnboardingStep.COMPLETE);
      }
    } catch (error) {
      console.error("Error checking onboarding requirements:", error);
      setCurrentStep(OnboardingStep.COMPLETE);
    }
  }, [checkUserHasCountry]);

  const handleDisplayNameSave = useCallback(async (displayName: string) => {
    try {
      await updateDisplayName(displayName);
      const hasCountry = await checkUserHasCountry();
      setCurrentStep(hasCountry ? OnboardingStep.COMPLETE : OnboardingStep.COUNTRY);
    } catch (error) {
      console.error("Error saving display name:", error);
      setCurrentStep(OnboardingStep.COMPLETE);
    }
  }, [updateDisplayName, checkUserHasCountry]);

  const handleDisplayNameSkip = useCallback(async () => {
    try {
      const hasCountry = await checkUserHasCountry();
      setCurrentStep(hasCountry ? OnboardingStep.COMPLETE : OnboardingStep.COUNTRY);
    } catch (error) {
      console.error("Error checking country:", error);
      setCurrentStep(OnboardingStep.COMPLETE);
    }
  }, [checkUserHasCountry]);

  const handleCountrySelect = useCallback(async (country: string) => {
    try {
      await updateUserCountry(country);
      setCurrentStep(OnboardingStep.COMPLETE);
    } catch (error) {
      console.error("Error saving country:", error);
      setCurrentStep(OnboardingStep.COMPLETE);
    }
  }, [updateUserCountry]);

  const handleCountrySkip = useCallback(() => {
    setCurrentStep(OnboardingStep.COMPLETE);
  }, []);

  const resetOnboarding = useCallback(() => {
    setCurrentStep(OnboardingStep.NONE);
  }, []);

  return {
    currentStep,
    startOnboardingFlow,
    handleDisplayNameSave,
    handleDisplayNameSkip,
    handleCountrySelect,
    handleCountrySkip,
    resetOnboarding,
  };
}