import React from "react";
import { styled } from "../../../stitches.config";

type Props = {
  onChange: Function;
  children: React.ReactNode;
};

const FieldLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "20px",
});

const StyledCheckbox = styled("input", {
  cursor: "pointer",
  boxShadow: `0 2px 10px $backgroundSecondary`,
  backgroundColor: "$brand-300",
  color: "$neutral-100",

  "&:focus": { boxShadow: `0 0 0 2px $fontPrimary` },
});

export const Checkbox: React.FC<Props> = ({ onChange, children }) => {
  return (
    <>
      <FieldLayout>
        <StyledCheckbox
          type="checkbox"
          onChange={(e) => onChange(e.target.checked)}
        ></StyledCheckbox>
        <span>{children}</span>
      </FieldLayout>
    </>
  );
};
