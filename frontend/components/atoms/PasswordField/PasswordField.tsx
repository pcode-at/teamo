import React from "react";
import { styled } from "../../../stitches.config";
import { InputFieldCore } from "../InputFieldCore/InputFieldCore";

type Props = {
  value?: string;
  onChange: Function;
  icon?: any;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  setValidInput?: Function;
  errorMessage?: string;
  regex: RegExp;
};

const StyledInputField = styled("input", {
  display: "inline-block",
  width: "100%",
  border: "none",
  padding: "0.5rem 0",
  borderBottom: "solid 1px transparent",

  fontWeight: "bold",
  background: "$brand-100",
  outline: "none",
  fontSize: "1.2rem",
  lineHeight: "1.5rem",
  color: "$neutral-800",
});

const StyledLabel = styled("label", {
  height: "fit-content",
  width: "100%",
});

const ErrorMessage = styled("span", {
  paddingLeft: "10px",

  color: "red",
});

export const PasswordField: React.FC<Props> = ({
  value,
  onChange,
  icon,
  required = false,
  label = "",
  showLabel = true,
  setValidInput,
  errorMessage = "",
  regex,
}) => {
  const [isInputValid, setIsInputValid] = React.useState(null);

  return (
    <>
      <InputFieldCore
        icon={icon}
        required={required}
        label={label}
        showLabel={showLabel}
      >
        <StyledLabel>
          <StyledInputField
            type={"password"}
            value={value}
            name={label}
            placeholder={label}
            onChange={(e) => {
              onChange(e.target.value);
              if (regex) {
                const isValid = regex.test(e.target.value);
                if (setValidInput) {
                  setValidInput(isValid);
                }
                if (isInputValid == null && !isValid) {
                  if (regex.test(e.target.value)) {
                    setIsInputValid(false);
                  }
                } else {
                  setIsInputValid(isValid);
                }
              }
            }}
            onBlur={(e) => {
              onChange(e.target.value);
              if (regex) {
                const isValid = regex.test(e.target.value);
                if (setValidInput) {
                  setValidInput(isValid);
                }
                if (isInputValid == null && !isValid) {
                  if (regex.test(e.target.value)) {
                    setIsInputValid(false);
                  }
                } else {
                  setIsInputValid(isValid);
                }
              }
            }}
            {...(required && { required: true })}
          />
        </StyledLabel>
      </InputFieldCore>
      {errorMessage && isInputValid === false && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </>
  );
};
