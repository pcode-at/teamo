import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";

type Props = {
  styling?: Stitches.VariantProps<typeof StyledHeading>["styling"];
  color?: Stitches.VariantProps<typeof StyledHeading>["color"];
  children: React.ReactNode;
  alignment?: Stitches.VariantProps<typeof StyledHeading>["alignment"];
};

const StyledHeading = styled("h1", {
  width: "100%",

  fontSize: "3.5rem",
  color: "black",
  textAlign: "center",

  variants: {
    styling: {},
    color: {},
    alignment: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
    },
  },
});

export const Heading: React.FC<Props> = ({
  styling,
  color,
  children,
  alignment,
}) => {
  return (
    <>
      <StyledHeading styling={styling} color={color} alignment={alignment}>
        {children}
      </StyledHeading>
    </>
  );
};
