import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";

const SpacerSpan = styled("span", {
  display: "block",

  variants: {
    height: {
      "1": { height: "1px", minHeight: "1px" },
      none: {
        height: "$space$none",
        minHeight: "$space$none",
      },
      "1x": { height: "$space$1x", minHeight: "$space$1x" },
      "2x": { height: "$space$2x", minHeight: "$space$2x" },
      "3x": { height: "$space$3x", minHeight: "$space$3x" },
      "4x": { height: "$space$4x", minHeight: "$space$4x" },
      "5x": { height: "$space$5x", minHeight: "$space$5x" },
      "6x": { height: "$space$6x", minHeight: "$space$6x" },
      "7x": { height: "$space$7x", minHeight: "$space$7x" },
      "8x": { height: "$space$8x", minHeight: "$space$8x" },
      "9x": { height: "$space$9x", minHeight: "$space$9x" },
    },
    width: {
      "1": { width: "100%", minWidth: "100%" },
      none: {
        width: "$space$none",
        minWidth: "$space$none",
      },
        "1x": { width: "$space$1x", minWidth: "$space$1x" },
        "2x": { width: "$space$2x", minWidth: "$space$2x" },
        "3x": { width: "$space$3x", minWidth: "$space$3x" },
        "4x": { width: "$space$4x", minWidth: "$space$4x" },
        "5x": { width: "$space$5x", minWidth: "$space$5x" },
        "6x": { width: "$space$6x", minWidth: "$space$6x" },
        "7x": { width: "$space$7x", minWidth: "$space$7x" },
        "8x": { width: "$space$8x", minWidth: "$space$8x" },
        "9x": { width: "$space$9x", minWidth: "$space$9x" },
    },
  },
});

type Width = Stitches.VariantProps<typeof SpacerSpan>["width"];
type Height = Stitches.VariantProps<typeof SpacerSpan>["height"];

export type SpacerProps = {
  size: Height;
  axis?: "vertical" | "horizontal";
};

export const Spacer: React.FC<SpacerProps> = ({ size, axis = "horizontal" }) => {
  const width: Width = axis === "vertical" ? "1" : size;
  const height: Height = axis === "horizontal" ? "1" : size;

  return <SpacerSpan width={width} height={height} />;
};
