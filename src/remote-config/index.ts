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
}

export const remoteConfigService = RemoteConfigService.getInstance();
