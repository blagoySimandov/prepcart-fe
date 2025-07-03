import { remoteConfigService } from "@/src/catalog-search/remote-config";
import { useEffect, useState } from "react";

export function useRemoteConfig() {
  const [isHighlightingEnabled, setIsHighlightingEnabled] = useState(false);

  useEffect(() => {
    const initializeRemoteConfig = async () => {
      try {
        await remoteConfigService.initialize();
        setIsHighlightingEnabled(remoteConfigService.isHighlightingEnabled());
      } catch (error) {
        console.error("Remote config initialization failed:", error);
      }
    };

    initializeRemoteConfig();
  }, []);

  return { isHighlightingEnabled };
}
