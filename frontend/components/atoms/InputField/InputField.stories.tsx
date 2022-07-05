import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { disabledStorybookArgTypesFromStitches } from '../../../.storybook/helper';
import { InputField } from './InputField';

export default {
  title: 'Atoms/InputField',
  component: InputField,
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
} as ComponentMeta<typeof InputField>;

export const Default = () => <InputField inputType={'text'} onChange={undefined}></InputField>;