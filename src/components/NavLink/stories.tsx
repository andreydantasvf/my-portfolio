import { Meta, StoryObj } from '@storybook/react';

import { NavLink } from '.';

export default {
  title: 'NavLink',
  component: NavLink,
  parameters: {
    //layout: 'fullscreen',
    backgrounds: {
      default: 'dark'
    }
  }
} as Meta;

export const Default: StoryObj = {};
export const Basic: StoryObj = {
  args: {
    name: 'Link Example',
    href: '#',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    iconSizer: 24
  }
};
