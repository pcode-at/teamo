import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { disabledStorybookArgTypesFromStitches } from '../../../.storybook/helper';
import { Checkbox } from './Checkbox';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
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
} as ComponentMeta<typeof Checkbox>;

export const Default = () => <Checkbox>Kontaktieren</Checkbox>;

export const Small = () => (
  <Checkbox size={"small"}>
    Kontaktieren
  </Checkbox>
);