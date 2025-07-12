import { compareVersions } from "compare-versions";
import { remoteConfigService } from "../remote-config";
import DeviceInfo from "react-native-device-info";

export type UpdateStatus = "force" | "suggest" | "none";
export * from "./constants";

export function checkAppUpdate(): UpdateStatus {
  const currentVersion = DeviceInfo.getVersion();
  const latestVersion = remoteConfigService.getLatestVersion();
  const minSupportedVersion = remoteConfigService.getMinVersion();

  if (compareVersions(currentVersion, minSupportedVersion) < 0) {
    return "force";
  }

  if (compareVersions(currentVersion, latestVersion) < 0) {
    return "suggest";
  }

  return "none";
}
