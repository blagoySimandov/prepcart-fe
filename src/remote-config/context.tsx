import React, { createContext, useContext } from "react";
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

function useRemoteConfigValue() {
  const [config, setConfig] = React.useState<{
    storeNames: Record<string, string>;
    isHighlightingEnabled: boolean;
  }>({ storeNames: {}, isHighlightingEnabled: true });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    remoteConfigService.initializeIfNot().then(() => {
      setConfig({
        storeNames: remoteConfigService.getStoreNames(),
        isHighlightingEnabled: remoteConfigService.isHighlightingEnabled(),
      });
      setIsLoading(false);
    });
  }, []);

  return { ...config, isLoading };
}
export function RemoteConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useRemoteConfigValue();
  return (
    <RemoteConfigContext.Provider value={value}>
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
