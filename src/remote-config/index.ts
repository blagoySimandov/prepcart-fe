import { remoteConfig } from "@/firebaseConfig";
import { CONFIG, DEFAULTS } from "./constants";

class RemoteConfigService {
  private static instance: RemoteConfigService;
  private initialized = false;

  static getInstance(): RemoteConfigService {
    if (!RemoteConfigService.instance) {
      RemoteConfigService.instance = new RemoteConfigService();
    }
    return RemoteConfigService.instance;
  }

  async initialize() {
    await remoteConfig.setDefaults(DEFAULTS);
    await remoteConfig.fetchAndActivate();
    this.initialized = true;
  }

  async initializeIfNot() {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  debounceTime(): number {
    return remoteConfig.getValue(CONFIG.CatalogSearchDebounceTime).asNumber();
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
  getLatestVersion(): string {
    return remoteConfig.getValue(CONFIG.LatestVersion).asString();
  }
  getMinVersion(): string {
    return remoteConfig.getValue(CONFIG.MinVersion).asString();
  }

  getAvailableStoreIds(): string[] {
    return Object.keys(this.getStoreNames());
  }

  getDiscountsAllowedCountries(): string[] {
    try {
      const configValue = remoteConfig.getValue(CONFIG.DiscountsAllowedCountries);
      const countriesString = configValue.asString();
      return JSON.parse(countriesString);
    } catch (error) {
      console.error("Error parsing allowed countries from Remote Config:", error);
      return JSON.parse(DEFAULTS[CONFIG.DiscountsAllowedCountries] as string);
    }
  }

  isDiscountsAvailableForCountry(countryCode: string): boolean {
    const allowedCountries = this.getDiscountsAllowedCountries();
    return allowedCountries.includes(countryCode);
  }
}

export const remoteConfigService = RemoteConfigService.getInstance();
