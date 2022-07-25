import React from "react";
import { styled } from "../../../stitches.config";

type Props = {
  children: React.ReactNode;
  icon?: any;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
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
  padding: "$2x $3x",

  background: "$neutral-200",
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
}) => {
  const Icon = icon;

  return (
    <InputLayout>
      {label && showLabel && (
        <InputFieldLabel>
          {label} {required && <Required>*</Required>}
        </InputFieldLabel>
      )}
      <InputFieldLayout>
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
