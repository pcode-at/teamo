import React from "react";
import { styled } from "../../../stitches.config";
import { BodyDefaultTabletAndUpStyle } from "../../../utils/StyledParagraph";
import { InputFieldCore } from "../InputFieldCore/InputFieldCore";
import SvgEye from "../svg/SvgEye";
import SvgEyeOff from "../svg/SvgEyeOff";

type Props = {
  value?: string;
  onChange: Function;
  icon?: any;
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  setValidInput?: Function;
  errorMessage?: string;
  regex?: RegExp;
};

const StyledInputField = styled("input", {
  ...BodyDefaultTabletAndUpStyle,

  display: "inline-block",
  width: "100%",
  border: "none",
  borderBottom: "solid 1px transparent",

  background: "$neutral-200",
  outline: "none",
  color: "$neutral-800",

  ["&::placeholder"]: {
    ...BodyDefaultTabletAndUpStyle,
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

const ImageLayout = styled("div", {
  display: "flex",
  width: "22px",
  height: "22px",

  color: "$neutral-800",
  cursor: "pointer",
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
  const [showPassword, setShowPassword] = React.useState(false);

  function onChangeInput(inputValue: string) {
    onChange(inputValue);
    if (regex) {
      const isValid = regex.test(inputValue);
      if (setValidInput) {
        setValidInput(isValid);
      }
      if (isInputValid == null && !isValid) {
        if (regex.test(inputValue)) {
          setIsInputValid(false);
        }
      } else {
        setIsInputValid(isValid);
      }
    }
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
          <StyledInputField
            type={showPassword ? "text" : "password"}
            value={value}
            name={label}
            placeholder={label}
            onChange={(e) => {
              onChangeInput(e.target.value);
            }}
            onBlur={(e) => {
              onChangeInput(e.target.value);
            }}
            {...(required && { required: true })}
          />
        </StyledLabel>

        {!showPassword && (
          <ImageLayout
            onClick={() => {
              setShowPassword(true);
            }}
          >
            <SvgEyeOff />
          </ImageLayout>
        )}
        {showPassword && (
          <ImageLayout
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            <SvgEye />
          </ImageLayout>
        )}
      </InputFieldCore>
      {errorMessage && isInputValid === false && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </>
  );
};
