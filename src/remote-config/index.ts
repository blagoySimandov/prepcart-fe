import { remoteConfig } from "@/firebaseConfig";
import { CONFIG, DEFAULTS } from "./constants";

class RemoteConfigService {
  private static instance: RemoteConfigService;

  static getInstance(): RemoteConfigService {
    if (!RemoteConfigService.instance) {
      RemoteConfigService.instance = new RemoteConfigService();
    }
    return RemoteConfigService.instance;
  }

  async initialize() {
    await remoteConfig.setDefaults(DEFAULTS);
    await remoteConfig.fetchAndActivate();
  }

  isHighlightingEnabled(): boolean {
    return remoteConfig.getValue(CONFIG.EnableSearchHighlighting).asBoolean();
  }

  getStoreNames(): Record<string, string> {
    try {
      const storeNamesJson = remoteConfig
        .getValue(CONFIG.StoreNames)
        .asString();
      return JSON.parse(storeNamesJson);
    } catch (error) {
      console.error("Error parsing store names from remote config:", error);
      return JSON.parse(DEFAULTS[CONFIG.StoreNames] as string);
    }
  }

  getAvailableStoreIds(): string[] {
    return Object.keys(this.getStoreNames());
  }

  getStoreName(storeId: string): string {
    const storeNames = this.getStoreNames();

    if (storeNames[storeId]) {
      return storeNames[storeId];
    }

    const baseStore = storeId.split("-")[0];
    if (storeNames[baseStore]) {
      return storeNames[baseStore];
    }

    return storeId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
}

export const remoteConfigService = RemoteConfigService.getInstance();
