import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { disabledStorybookArgTypesFromStitches } from '../../../.storybook/helper';
import { Button } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    color: {
      options: ['red', 'blue', 'white'],
      control: { type: 'radio' },
    },
    type: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    ...disabledStorybookArgTypesFromStitches,
  },
} as ComponentMeta<typeof Button>;

export const Default = () => <Button>Kontaktieren</Button>;

export const PrimaryRed = () => (
  <Button type="primary" color="red">
    Kontaktieren
  </Button>
);

export const PrimaryBlue = () => (
  <Button type="primary" color="blue">
    Kontaktieren
  </Button>
);

export const PrimaryWhite = () => (
  <Button type="primary" color="white">
    Kontaktieren
  </Button>
);
PrimaryWhite.parameters = {
  backgrounds: { default: 'whiteSmoke' },
};

export const Secondary = () => <Button type="secondary">Kontaktieren</Button>;