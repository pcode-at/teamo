import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { disabledStorybookArgTypesFromStitches } from '../../../.storybook/helper';
import { Button } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    size: {
      options: ['medium', 'small'],
      control: { type: 'radio' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
    ...disabledStorybookArgTypesFromStitches,
  },
} as ComponentMeta<typeof Button>;

export const Default = () => <Button>Kontaktieren</Button>;

export const Small = () => (
  <Button size={"small"}>
    Kontaktieren
  </Button>
);

export const Disabled = () => (
  <Button size={"small"} disabled={true}>
    Kontaktieren
  </Button>
);