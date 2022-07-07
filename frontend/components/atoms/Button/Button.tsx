import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";

type Props = {
  size?: Stitches.VariantProps<typeof StyledButton>["size"];
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
};

const StyledButton = styled("button", {
  width: "fit-content",
  padding: "$spacing-2x $spacing-3x",
  border: "transparent $borderWidths$border-width-medium solid",
  borderRadius: "$border-radius-medium",

  color: "$neutral-100",
  backgroundColor: "$brand-200",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    backgroundColor: "$brand-400",
  },

  "&:disabled": {
    cursor: "not-allowed",
    backgroundColor: "$brand-100",
    color: "$neutral-100",
  },

  "&:focus": {
    outline: "none",
    border: "$brand-400 $borderWidths$border-width-medium solid",
  },

  variants: {
    size: {
      medium: {},
      small: {
        padding: "$spacing-1x $spacing-3x",
      },
    },
  },
});

export const Button: React.FC<Props> = ({
  size = "medium",
  disabled = false,
  leftIcon,
  rightIcon,
  children,
}) => {
  return (
    <>
      <StyledButton size={size} disabled={disabled}>
        {children}
      </StyledButton>
    </>
  );
};
