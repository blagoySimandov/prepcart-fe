import { COMMON_COLORS } from "@/constants/colors";

export const MODIFICATION_STATUS = {
  add: "add",
  modify: "modify",
  remove: "remove",
} as const;

export const MODIFICATION_COLORS = {
  [MODIFICATION_STATUS.add]: COMMON_COLORS.success,
  [MODIFICATION_STATUS.modify]: COMMON_COLORS.warning,
  [MODIFICATION_STATUS.remove]: COMMON_COLORS.error,
} as const;

export const MODAL_MAX_WIDTH = 350;

export const VIDEO_DEFAULTS = {
  height: 400,
  playButtonSize: 80,
  loaderSize: "large" as const,
  resizeMode: "contain" as const,
} as const;

export const TIMER_DEFAULTS = {
  height: 56,
} as const;