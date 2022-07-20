import { styled } from "../stitches.config";

export const H1BlackTabletAndUpStyle = {
  fontFamily: "$default",
  fontSize: "$xxl",
  fontWeight: "$ultra-bold",
  textDecoration: "none",
  lineHeight: "$xxl",
};

export const H1ExtraBoldTabletAndUpStyle = {
  ...H1BlackTabletAndUpStyle,
  fontWeight: "$extra-bold",
};

export const H1BoldTabletAndUpStyle = {
  ...H1BlackTabletAndUpStyle,
  fontWeight: "$bold",
};

export const H2BoldTabletAndUpStyle = {
  fontFamily: "$default",
  fontSize: "$xl",
  fontWeight: "$bold",
  textDecoration: "none",
  lineHeight: "$xl",
};

export const H3BoldTabletAndUpStyle = {
  fontFamily: "$default",
  fontSize: "$l",
  fontWeight: "$bold",
  textDecoration: "none",
  lineHeight: "$l",
};

export const BodyMediumTabletAndUpStyle = {
  fontFamily: "$default",
  fontSize: "$m",
  fontWeight: "$medium",
  textDecoration: "none",
  lineHeight: "$m",
  letterSpacing: "$wide",
};

export const BodyDefaultTabletAndUpStyle = {
  ...BodyMediumTabletAndUpStyle,
  fontSize: "$s",
  lineHeight: "$s",
};

export const BodySmallTabletAndUpStyle = {
  ...BodyMediumTabletAndUpStyle,
  fontSize: "$xs",
  lineHeight: "$xs",
};

export const LinkDefaultBoldTabletAndUpStyle = {
  fontFamily: "$default",
  fontSize: "$s",
  fontWeight: "$bold",
  textDecoration: "none",
  lineHeight: "$s",
  letterSpacing: "$wide",
};

export const LinkDefaultMediumTabletAndUpStyle = {
  ...LinkDefaultBoldTabletAndUpStyle,
  fontSize: "$xs",
  fontWeight: "$medium",
  lineHeight: "$xs",
};

export const LinkSmallBoldTabletAndUpStyle = {
  ...LinkDefaultBoldTabletAndUpStyle,
  fontSize: "$xs",
  lineHeight: "$xs",
};

const typographyComposers = {
  color: "$grey-500",
  variants: {
    variant: {
      "h1-black-tablet-and-up": H1BlackTabletAndUpStyle,
      "h1-extra-bold-tablet-and-up": H1ExtraBoldTabletAndUpStyle,
      "h1-bold-tablet-and-up": H1BoldTabletAndUpStyle,
      "h2-bold-tablet-and-up": H2BoldTabletAndUpStyle,
      "h3-bold-tablet-and-up": H3BoldTabletAndUpStyle,
      "body-medium-tablet-and-up": BodyMediumTabletAndUpStyle,
      "body-default-tablet-and-up": BodyDefaultTabletAndUpStyle,
      "body-small-tablet-and-up": BodySmallTabletAndUpStyle,
      "link-default-bold-tablet-and-up": LinkDefaultBoldTabletAndUpStyle,
      "link-default-medium-tablet-and-up": LinkDefaultMediumTabletAndUpStyle,
      "link-small-bold-tablet-and-up": LinkSmallBoldTabletAndUpStyle,
    },
    color: {
      "neutral-700": { color: "$neutral-700" },
    },
  },
  defaultVariants: {
    color: "neutral-700",
    variant: "body-regular",
  },
};

export const Typography = styled("span", typographyComposers);
export const StyledParagraph = styled("p", typographyComposers);
