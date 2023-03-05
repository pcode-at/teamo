import React from "react";
import { styled } from "../../../stitches.config";

type Props = {
  children: React.ReactNode;
  icon?: any;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  size?: "small" | "medium";
};

const InputLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$1x",
});

const InputFieldLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  width: "100%",
  border: "none",
  gap: "20px",
  borderRadius: "$1x",
  background: "$neutral-200",
  variants: {
    size: {
      small: {
        padding: "0",
        width: "fit-content",
      },

      medium: {
        padding: "$2x $3x",
        width: "100%",
      },
    },
  },
});

const ImageLayout = styled("div", {
  display: "flex",
  width: "22px",
  height: "22px",

  color: "$neutral-800",
});

const InputFieldLabel = styled("div", {});

const Required = styled("div", {
  display: "inline-block",
});

export const InputFieldCore: React.FC<Props> = ({
  children,
  icon,
  required = false,
  label = "",
  showLabel = true,
  size = "medium",
}) => {
  const Icon = icon;

  return (
    <InputLayout>
      {label && showLabel && (
        <InputFieldLabel>
          {label} {required && <Required>*</Required>}
        </InputFieldLabel>
      )}
      <InputFieldLayout size={size}>
        {icon && (
          <ImageLayout>
            <Icon />
          </ImageLayout>
        )}
        {children}
      </InputFieldLayout>
    </InputLayout>
  );
};
