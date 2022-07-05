import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";

type Props = {
  styling: Styling;
  color?: Stitches.VariantProps<typeof StyledHeading>["color"];
  text: string;
};

const StyledHeading = styled("h1", {
  width: "100%",

  fontSize: "4.5rem",
  color: "black",
  textAlign: "center",

  variants: {
    styling: {},
    color: {},
  },
});

export const Heading: React.FC<Props> = ({ styling, color, text }) => {
  return (
    <>
      <StyledHeading styling={styling} color={color}>
        {text}
      </StyledHeading>
    </>
  );
};

export type Styling = Stitches.VariantProps<typeof StyledHeading>["styling"];
