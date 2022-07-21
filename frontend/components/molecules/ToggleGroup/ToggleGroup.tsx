import React from "react";
import { styled } from "@stitches/react";
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { InputFieldCore } from "../../atoms/InputFieldCore/InputFieldCore";
import { BodyDefaultTabletAndUpStyle } from "../../../utils/StyledParagraph";

type Props = {
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  elements: {
    value: string;
    label: string;
  }[];
};

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: "inline-flex",
  backgroundColor: "$neutral-400",
  borderRadius: 4,
  color: "$neutral-700",
  ...BodyDefaultTabletAndUpStyle,
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: "unset",
  cursor: "pointer",
  backgroundColor: "$neutral-200",
  outline: "1.5px solid $neutral-300",
  color: "$neutral-700",
  height: 50,
  width: 100,
  display: "flex",
  fontSize: 15,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 1,
  transition: "background-color 0.5s",
  "&:first-child": {
    marginLeft: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  "&:last-child": { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  "&:hover": {
    backgroundColor: "$neutral-300",
  },
  "&[data-state=on]": {
    backgroundColor: "$neutral-300",
    color: "$neutral-700",
  },
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px $neutral-700` },
});

export const ToggleGroupItem = StyledItem;

export const ToggleGroup: React.FC<Props> = ({
  required,
  label,
  showLabel,
  elements,
}) => {
  return (
    <InputFieldCore required={required} label={label} showLabel={showLabel}>
      <StyledToggleGroup
        type="single"
        defaultValue="center"
        aria-label="Gender"
      >
        {elements.map((element) => (
          <ToggleGroupItem
            value={element.value}
            aria-label={element.label}
            key={element.value}
          >
            {element.label}
          </ToggleGroupItem>
        ))}
      </StyledToggleGroup>
    </InputFieldCore>
  );
};
