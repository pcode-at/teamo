import { createStitches } from "@stitches/react";

export const styles = {
  theme: {
    colors: {
      background: "#ffffff",
      foreground: "#87ccde",
      font: "#dce6ef",
      subtitle: "#dce6ef",
      "light-accent": "#dce6ef",
      "dark-accent": "#245a91",
      success: "#dce6ef",
      error: "#245a91",
    },
    shadows: {
    },
    space: {
      "spacing-1x": "8px",
      "spacing-2x": "16px",
      "spacing-3x": "24px",
      "spacing-4x": "32px",
      "spacing-5x": "40px",
      "spacing-6x": "48px",
      "spacing-7x": "56px",
      "spacing-8x": "64px",
    },
    borderWidths: {
      "border-width-regular": "1px",
      "border-width-medium": "2px",
      "border-width-strong": "5px",
    },
    fontWeights: {
    },
    sizes: {
    },
    fontSizes: {
      "font-size-xs": "14px",
      "font-size-s": "16px",
      "font-size-m": "18px",
      "font-size-l": "24px",
      "font-size-xl": "32px",
      "font-size-xxl": "40px",
      "font-size-xxxl": "56px",
    },
    fonts: {
    },
    radii: {
      "border-radius-none": "0px",
      "border-radius-medium": "15px",
      "border-radius-large": "25px",
    },
  },
  media: {
    laptopAndDown: "(max-width: 1199px)",
    tabletAndDown: "(max-width: 899px)",
    mobileOnly: "(max-width: 599px)",
  },
};

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme,
} = createStitches(styles);