import { createStitches } from "@stitches/react";

export const styles = {
  theme: {
    colors: {
      "neutral-100": "#ffffff",
      "neutral-200": "#f3f3f3",
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
    shadows: {},
    space: {
      "1x": "8px",
      "2x": "16px",
      "3x": "24px",
      "4x": "32px",
      "5x": "40px",
      "6x": "48px",
      "7x": "56px",
      "8x": "64px",
    },
    borderWidths: {
      regular: "1px",
      medium: "2px",
      strong: "5px",
    },
    fontWeights: {
      regular: "400",
      medium: "500",
      bold: "700",
      "extra-bold": "800",
    },
    lineHeights: {},
    letterSpacings: {
      
    },
    sizes: {},
    fontSizes: {
      xs: "0.875rem",
      s: "1rem",
      m: "1.125rem",
      l: "1.5rem",
      xl: "2rem",
      xxl: "2.5rem",
      xxxl: "3.5rem",
    },
    fonts: {
      default: "Poppins, sans-serif",
    },
    radii: {
      none: "0px",
      "1x": "8px",
      "2x": "16px",
      "3x": "24px",
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
