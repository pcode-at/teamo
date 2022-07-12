import { createStitches } from "@stitches/react";

export const styles = {
  theme: {
    colors: {
      "neutral-100": "#ffffff",
      "neutral-200": "#dfdfdf",
      "neutral-300": "#c2c2c2",
      "neutral-400": "#a3a3a3",
      "neutral-500": "#858585",
      "neutral-600": "#666666",
      "neutral-700": "#2c2c2c",
      "neutral-800": "#000000",
      "success-100": "#abe0b7",
      "success-200": "#75897c",
      "success-300": "#609865",
      "success-400": "#4b7550",
      "error-100": "#d07b7b",
      "error-200": "#bc4343",
      "error-300": "#712828",
      "brand-100": "#dce6ef",
      "brand-200": "#b7ccde",
      "brand-300": "#6f93af",
      "brand-400": "#245a91",
      "brand-500": "#153967",
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