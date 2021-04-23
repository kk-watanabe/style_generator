import { action } from "@storybook/addon-actions";
import { ButtonSize, ButtonColor } from "$const/button";
import Button from "$lib/Button.svelte";

interface Props {
  label: string;
  size: ButtonSize;
  color: ButtonColor;
}

export default {
  title: "Atom/Button",
  component: Button,
  argTypes: {
    label: { control: { type: "text" } },
    size: {
      control: {
        type: "select",
        options: ButtonSize,
      },
    },
    color: {
      control: {
        type: "select",
        options: ButtonColor,
      },
    },
  },
};

const Template = (args: Props) => ({
  Component: Button,
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  label: "button label",
  size: ButtonSize.Medium,
  color: ButtonColor.Light,
};
