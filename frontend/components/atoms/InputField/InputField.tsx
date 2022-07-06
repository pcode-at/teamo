import React from "react";
import { styled } from "../../../stitches.config";
import { InputFieldCore } from "../InputFieldCore/InputFieldCore";

type Props = {
  inputType: "text" | "date" | "email" | "number" | "datetime-local";
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
};

const StyledInputField = styled("input", {
  display: "inline-block",
  width: "100%",
  border: "none",
  padding: "0.5rem 0",
  borderBottom: "solid 1px transparent",

  fontFamily: "Arial",
  fontWeight: "bold",
  background: "$brand-100",
  outline: "none",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",
  color: "black",

  ["&:focus"]: {
    borderBottom: "solid 1px red",
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

export const InputField: React.FC<Props> = ({
  inputType,
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
      <InputFieldCore icon={icon} required={required} label={label} showLabel={showLabel}>
        <StyledLabel>
          <StyledInputField
            type={inputType}
            value={value}
            name={label}
            placeholder={label}
            onChange={updateValidation}
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
