import { action } from "@storybook/addon-actions";
import { ButtonSize, ButtonColor } from "$const/button";
import Button from "$lib/Button.svelte";

export const ActionsData = {
  onClick: action("click"),
};

export default {
  title: "Example/Example",
  component: Button,
  excludeStories: /.*Data$/,
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
    disabled: { control: { type: "boolean" } },
    onClick: { action: "click" },
  },
};

const Template = ({ onClick, ...args }) => ({
  Component: Button,
  props: args,
  on: { ...ActionsData },
});

export const Default = Template.bind({});

Default.args = {
  label: "button label",
  size: ButtonSize.Large,
  color: ButtonColor.Light,
  disabled: false,
};
