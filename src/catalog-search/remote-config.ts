import remoteConfig from "@react-native-firebase/remote-config";

class RemoteConfigService {
  private static instance: RemoteConfigService;

  static getInstance(): RemoteConfigService {
    if (!RemoteConfigService.instance) {
      RemoteConfigService.instance = new RemoteConfigService();
    }
    return RemoteConfigService.instance;
  }

  async initialize() {
    await remoteConfig().setDefaults({
      enable_search_highlighting: false,
    });

    await remoteConfig().fetchAndActivate();
  }

  isHighlightingEnabled(): boolean {
    return remoteConfig().getValue("enable_search_highlighting").asBoolean();
  }
}

export const remoteConfigService = RemoteConfigService.getInstance();
