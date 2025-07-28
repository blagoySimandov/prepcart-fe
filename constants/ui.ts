// TODO: REMOVE Not USED.
export const SHADOW_STYLES = {
  light: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heavy: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
} as const;

export const BORDER_RADIUS = {
  small: 8,
  medium: 12,
  large: 16,
  xl: 20,
} as const;

export const SPACING = {
  xs: 4,
  small: 8,
  medium: 12,
  large: 16,
  xl: 20,
  xxl: 24,
} as const;

export const FONT_SIZES = {
  caption: 10,
  small: 12,
  body: 14,
  medium: 16,
  large: 18,
  xl: 20,
  xxl: 24,
} as const;

export const FONT_WEIGHTS = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
} as const;

export const ICON_SIZES = {
  xs: 12,
  small: 14,
  medium: 16,
  large: 18,
  xl: 20,
  xxl: 24,
} as const;

export const ANIMATION = {
  modal: {
    type: "fade" as const,
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  },
  slide: "slide" as const,
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
} as const;

export const OPACITY = {
  disabled: 0.7,
  slight: 0.9,
  full: 1,
} as const;

export const BORDER_WIDTH = {
  thin: 1,
  medium: 1.5,
  thick: 2,
} as const;

export const TEXT_TYPES = {
  title: "title",
  subtitle: "subtitle",
} as const;

export const RESIZE_MODE = {
  cover: "cover" as const,
  contain: "contain" as const,
} as const;

