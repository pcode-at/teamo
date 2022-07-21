import React from "react";
import { styled } from "../../../stitches.config";
import { InputFieldCore } from "../InputFieldCore/InputFieldCore";
import type * as Stitches from "@stitches/react";
import {
  BodyDefaultTabletAndUpStyle,
  BodySmallTabletAndUpStyle,
} from "../../../utils/StyledParagraph";
import SvgEye from "../svg/SvgEye";
import SvgEyeOff from "../svg/SvgEyeOff";

type Props = {
  value?: string;
  onChange: Function;
  icon?: any;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  regex?: RegExp;
  setValidInput?: Function;
  errorMessage?: string;
  min?: string;
  max?: string;
  size?: Stitches.VariantProps<typeof StyledTextarea>["size"];
};

const StyledTextarea = styled("textarea", {
  ...BodyDefaultTabletAndUpStyle,
  display: "inline-block",
  border: "none",
  borderBottom: "solid 1px transparent",
  minHeight: "100px",

  background: "$neutral-200",
  outline: "none",
  lineHeight: "1.5rem",
  color: "black",
  resize: "vertical",

  ["&::placeholder"]: {
    ...BodyDefaultTabletAndUpStyle,
  },

  variants: {
    size: {
      small: {
        width: "45px",
      },
      fitParent: {
        width: "100%",
      },
    },
  },

  // remove arrows from number input
  "-webkit-appearance": "none",
  "-moz-appearance": "none",
  "&::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "&::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },

  defaultVariants: {
    size: "fitParent",
  },
});

const StyledLabel = styled("label", {
  height: "fit-content",
  width: "100%",
});

const ErrorMessage = styled("span", {
  paddingLeft: "10px",

  color: "red",
});

export const TextArea: React.FC<Props> = ({
  value,
  onChange,
  icon,
  required = false,
  label = "",
  showLabel = true,
  regex,
  setValidInput,
  errorMessage = "",
  min,
  max,
  size = "fitParent",
}) => {
  const [isInputValid, setIsInputValid] = React.useState(null);

  function updateValidation(event) {
    if (regex) {
      let inputValueValid = regex.test(event.target.value);
      if (setValidInput) {
        setValidInput(inputValueValid);
      }
      if (isInputValid == null && !inputValueValid) {
        if (regex.test(event.target.value)) {
          setIsInputValid(false);
        }
      } else {
        setIsInputValid(inputValueValid);
      }
    }
    onChange(event.target.value);
  }

  return (
    <>
      <InputFieldCore
        icon={icon}
        required={required}
        label={label}
        showLabel={showLabel}
      >
        <StyledLabel>
          <StyledTextarea
            value={value}
            name={label}
            placeholder={label}
            onChange={updateValidation}
            size={size}
            {...(required && { required: true })}
            {...(min && { min })}
            {...(max && { max })}
          />
        </StyledLabel>
      </InputFieldCore>
      {errorMessage && isInputValid === false && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </>
  );
};
