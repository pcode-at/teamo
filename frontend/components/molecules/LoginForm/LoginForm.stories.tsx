import React from "react";
import { ComponentMeta } from "@storybook/react";
import { disabledStorybookArgTypesFromStitches } from "../../../.storybook/helper";
import { LoginForm } from "./LoginForm";
import { styled } from "@stitches/react";

export default {
  title: "Molecules/LoginForm",
  component: LoginForm,
  argTypes: {
    size: {
      options: ["medium", "small"],
      control: { type: "radio" },
    },
    disabled: {
      options: [true, false],
      control: { type: "radio" },
    },
    ...disabledStorybookArgTypesFromStitches,
  },
} as ComponentMeta<typeof LoginForm>;

const LoginFormWrapper = styled("div", {
  display: "flex",
  width: "30vw",
});

export const Default = () => (
  <LoginFormWrapper>
    <LoginForm></LoginForm>
  </LoginFormWrapper>
);
