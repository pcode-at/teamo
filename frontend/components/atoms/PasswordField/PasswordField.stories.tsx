import React from "react";
import { ComponentMeta } from "@storybook/react";
import { disabledStorybookArgTypesFromStitches } from "../../../.storybook/helper";
import { PasswordField } from "./PasswordField";

export default {
  title: "Atoms/PasswordField",
  component: PasswordField,
  argTypes: {
    color: {
      options: ["red", "blue", "white"],
      control: { type: "radio" },
    },
    type: {
      options: ["primary", "secondary"],
      control: { type: "radio" },
    },
    ...disabledStorybookArgTypesFromStitches,
  },
} as ComponentMeta<typeof PasswordField>;

export const Default = () => <PasswordField onChange={undefined} regex={undefined}></PasswordField>;
