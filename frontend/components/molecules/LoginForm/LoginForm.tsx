import { useRouter } from "next/router";
import React from "react";
import { styled } from "../../../stitches.config";
import { login } from "../../../utils/authHelper";
import { Button } from "../../atoms/Button/Button";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";
import { Heading } from "../../atoms/Heading/Heading";
import { InputField } from "../../atoms/InputField/InputField";
import { PasswordField } from "../../atoms/PasswordField/PasswordField";

type Props = {};

const LoginFormLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  padding: "$spacing-4x",

  backgroundColor: "$brand-300",
  borderRadius: "$border-radius-medium",
});

export const LoginForm: React.FC<Props> = ({}) => {
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const router = useRouter();

  return (
    <>
      <LoginFormLayout>
        <Heading alignment={"left"}>Login</Heading>
        <InputField
          inputType={"text"}
          value={identifier}
          onChange={setIdentifier}
        />
        <PasswordField
          value={password}
          onChange={setPassword}
          regex={undefined}
        />
        <Checkbox onChange={undefined}>Remember me</Checkbox>
        <Button
          onClick={async () => {
            const isLoggedIn = login(identifier, password);
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
