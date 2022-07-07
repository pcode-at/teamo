import React from "react";
import { ComponentMeta } from "@storybook/react";
import { disabledStorybookArgTypesFromStitches } from "../../../.storybook/helper";
import { TeamoLink } from "./TeamoLink";

export default {
  title: "Atoms/TeamoLink",
  component: TeamoLink,
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
} as ComponentMeta<typeof TeamoLink>;

export const Default = () => (
  <TeamoLink href="https://www.google.at" target="_blank">
    Kontaktieren
  </TeamoLink>
);

export const Small = () => (
  <TeamoLink size={"small"} href="https://www.google.at" target="_blank">
    Kontaktieren
  </TeamoLink>
);
