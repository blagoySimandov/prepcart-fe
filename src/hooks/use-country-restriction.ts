import { remoteConfigService } from "@/src/remote-config";
import { useUserService } from "@/src/user";
import { useCallback, useEffect, useState } from "react";

export function useCountryRestriction() {
  const userService = useUserService();
  const [isDiscountsAvailable, setIsDiscountsAvailable] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkDiscountAvailability = useCallback(async () => {
    if (!userService) {
      setIsDiscountsAvailable(false);
      setIsLoading(false);
      return;
    }

    try {
      await remoteConfigService.initializeIfNot();
      
      const profile = await userService.getProfile();
      if (!profile?.country) {
        setIsDiscountsAvailable(false);
        setIsLoading(false);
        return;
      }

      const countryCode = profile.country.split('|')[0];
      const isAvailable = remoteConfigService.isDiscountsAvailableForCountry(countryCode);
      setIsDiscountsAvailable(isAvailable);
    } catch (error) {
      console.error("Error checking discount availability:", error);
      setIsDiscountsAvailable(false);
    } finally {
      setIsLoading(false);
    }
  }, [userService]);

  useEffect(() => {
    checkDiscountAvailability();
  }, [checkDiscountAvailability]);

  return {
    isDiscountsAvailable,
    isLoading,
    recheckAvailability: checkDiscountAvailability,
  };
}