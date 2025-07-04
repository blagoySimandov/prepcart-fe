import React, { createContext, useContext, useEffect, useState } from "react";
import { remoteConfigService } from "./index";

interface RemoteConfigContextType {
  storeNames: Record<string, string>;
  isHighlightingEnabled: boolean;
  isLoading: boolean;
}

const RemoteConfigContext = createContext<RemoteConfigContextType>({
  storeNames: {},
  isHighlightingEnabled: true,
  isLoading: true,
});

export function RemoteConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storeNames, setStoreNames] = useState<Record<string, string>>({});
  const [isHighlightingEnabled, setIsHighlightingEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await remoteConfigService.initializeIfNot();
        setStoreNames(remoteConfigService.getStoreNames());
        setIsHighlightingEnabled(remoteConfigService.isHighlightingEnabled());
      } catch (error) {
        console.error("Remote config init failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  return (
    <RemoteConfigContext.Provider
      value={{ storeNames, isHighlightingEnabled, isLoading }}>
      {children}
    </RemoteConfigContext.Provider>
  );
}

export function useRemoteConfig() {
  const context = useContext(RemoteConfigContext);
  if (!context) {
    throw new Error("useRemoteConfig must be used within RemoteConfigProvider");
  }
  return context;
}
