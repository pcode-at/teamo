import { useRouter } from "next/router";
import React from "react";
import { styled } from "../../../stitches.config";
import { login } from "../../../utils/authHelper";
import { Typography } from "../../../utils/StyledParagraph";
import { Button } from "../../atoms/Button/Button";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";
import { Heading } from "../../atoms/Heading/Heading";
import { InputField } from "../../atoms/InputField/InputField";
import { PasswordField } from "../../atoms/PasswordField/PasswordField";
import { Spacer } from "../../atoms/Spacer/Spacer";
import SvgLock from "../../atoms/svg/SvgLock";
import SvgUser from "../../atoms/svg/SvgUser";

type Props = {};

const LoginFormLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
});

export const LoginForm: React.FC<Props> = ({}) => {
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();

  return (
    <>
      <LoginFormLayout>
        <Typography variant="h1-bold-tablet-and-up">Hello there!</Typography>
        <Spacer size="4x" axis="vertical" />
        <InputField
          inputType={"text"}
          value={identifier}
          onChange={setIdentifier}
          icon={SvgUser}
          label="Employee-ID"
          required={true}
        />
        <Spacer size="4x" axis="vertical" />
        <PasswordField
          icon={SvgLock}
          value={password}
          onChange={setPassword}
          label="Password"
          required={true}
        />
        <Spacer size="4x" axis="vertical" />
        <Button
          onClick={async () => {
            const isLoggedIn = await login(identifier, password);
            if (isLoggedIn) {
              router.push("/");
            }
          }}
        >
          Login
        </Button>
      </LoginFormLayout>
    </>
  );
};
