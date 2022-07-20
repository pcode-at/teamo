import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";

type Props = {
  size?: Stitches.VariantProps<typeof StyledButton>["size"];
  disabled?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  onClick?: () => void;
  children: React.ReactNode;
};

const StyledButton = styled("button", {
  width: "fit-content",
  height: "fit-content",
  padding: "$2x $3x",
  border: "transparent $borderWidths$medium solid",
  display: "flex",
  gap: "$1x",
  alignItems: "center",
  borderRadius: "$1x",

  color: "$neutral-100",
  backgroundColor: "$brand-400",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    backgroundColor: "$brand-500",
  },

  "&:disabled": {
    cursor: "not-allowed",
    backgroundColor: "$brand-100",
    color: "$neutral-100",
  },

  "&:focus": {
    outline: "none",
    backgroundColor: "$brand-200",
    border: "$brand-400 $borderWidths$medium solid",
  },

  variants: {
    size: {
      medium: {},
      small: {
        padding: "$1x $3x",
      },
    },
  },
});

const IconLayout = styled("div", {
  display: "flex",
  width: "18px",
  height: "18px",
});

export const Button: React.FC<Props> = ({
  size = "medium",
  disabled = false,
  leftIcon,
  rightIcon,
  onClick,
  children,
}) => {
  const LeftIcon = leftIcon;
  const RightIcon = rightIcon;

  return (
    <>
      <StyledButton size={size} disabled={disabled} onClick={onClick}>
        {leftIcon && (
          <IconLayout>
            <LeftIcon />
          </IconLayout>
        )}
        {children}
        {rightIcon && (
          <IconLayout>
            <RightIcon />
          </IconLayout>
        )}
      </StyledButton>
    </>
  );
};
