import React, { createContext, use, useContext } from "react";
import { remoteConfigService } from "./index";

interface RemoteConfigContextType {
  storeNames: Record<string, string>;
  isHighlightingEnabled: boolean;
}

const RemoteConfigContext = createContext<RemoteConfigContextType>({
  storeNames: {},
  isHighlightingEnabled: true,
});
const configPromise = remoteConfigService.initializeIfNot().then(() => ({
  storeNames: remoteConfigService.getStoreNames(),
  isHighlightingEnabled: remoteConfigService.isHighlightingEnabled(),
}));
export function RemoteConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { storeNames, isHighlightingEnabled } = use(configPromise);
  return (
    <RemoteConfigContext.Provider value={{ storeNames, isHighlightingEnabled }}>
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
