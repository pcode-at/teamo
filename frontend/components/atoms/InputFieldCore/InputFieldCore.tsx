import React from "react";
import { styled } from "../../../stitches.config";

type Props = {
  children: React.ReactNode;
  icon?: any;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
};

const InputFieldLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  width: "100%",
  border: "none",
  padding: "10px",
  gap: "20px",

  background: "$backgroundTertiary",
});

const ImageLayout = styled("div", {
  display: "flex",
  width: "30px",
  height: "30px",

  color: "$fontPrimary",
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

    <>
      {label && showLabel && (
        <>
          <InputFieldLabel>
            {label} {required && <Required>*</Required>}
          </InputFieldLabel>
        </>
      )}
      <InputFieldLayout>
        {icon && (
          <ImageLayout>
            <Icon />
          </ImageLayout>
        )}
        {children}
      </InputFieldLayout>
    </>
  );
};
