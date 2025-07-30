import { remoteConfigService } from "@/src/remote-config";
import { useUserService } from "@/src/user";
import { useCallback, useEffect, useState } from "react";

export function useCountryRestriction() {
  const userService = useUserService();
  const [isDiscountsAvailable, setIsDiscountsAvailable] = useState<
    boolean | null
  >(null);
  const [isCatalogSearchAvailable, setIsCatalogSearchAvailable] = useState<
    boolean | null
  >(null);
  const [catalogSearchRestrictionMode, setCatalogSearchRestrictionMode] =
    useState<"hide_tab" | "show_popup">("hide_tab");
  const [isLoading, setIsLoading] = useState(true);

  const checkFeatureAvailability = useCallback(async () => {
    if (!userService) {
      setIsDiscountsAvailable(false);
      setIsCatalogSearchAvailable(false);
      setIsLoading(false);
      return;
    }

    try {
      await remoteConfigService.initializeIfNot();

      const profile = await userService.getProfile();
      const restrictionMode =
        remoteConfigService.getCatalogSearchRestrictionMode();
      setCatalogSearchRestrictionMode(restrictionMode);

      if (!profile?.country) {
        setIsDiscountsAvailable(false);
        setIsCatalogSearchAvailable(false);
        setIsLoading(false);
        return;
      }

      const countryCode = profile.country.split("|")[0];
      const discountsAvailable =
        remoteConfigService.isDiscountsAvailableForCountry(countryCode);
      const catalogSearchAvailable =
        remoteConfigService.isCatalogSearchAvailableForCountry(countryCode);

      setIsDiscountsAvailable(discountsAvailable);
      setIsCatalogSearchAvailable(catalogSearchAvailable);
    } catch (error) {
      console.error("Error checking feature availability:", error);
      setIsDiscountsAvailable(false);
      setIsCatalogSearchAvailable(false);
    } finally {
      setIsLoading(false);
    }
  }, [userService]);

  useEffect(() => {
    checkFeatureAvailability();
  }, [checkFeatureAvailability]);

  return {
    isDiscountsAvailable,
    isCatalogSearchAvailable,
    catalogSearchRestrictionMode,
    isLoading,
    recheckAvailability: checkFeatureAvailability,
  };
}
