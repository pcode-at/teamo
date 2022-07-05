import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { disabledStorybookArgTypesFromStitches } from '../../../.storybook/helper';
import { Heading } from './Heading';

export default {
  title: 'Atoms/Heading',
  component: Heading,
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
} as ComponentMeta<typeof Heading>;

export const Default = () => <Heading styling={undefined} text={'Kontaktieren'}></Heading>;

export const PrimaryRed = () => (
  <Heading color="red" styling={undefined} text={''}>
    Kontaktieren
  </Heading>
);