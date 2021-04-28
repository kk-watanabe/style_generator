<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { ButtonSize, ButtonColor } from "$const/button";
  import Button from "$lib/Button.svelte";
</script>

<Meta
  title="Atom/Button"
  component={Button}
  argTypes={{
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
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <Button {...args} on:click={args.onClick}>{args.label}</Button>
</Template>

<Story
  name="Default"
  args={{
    label: "button label",
    size: ButtonSize.Large,
    color: ButtonColor.Light,
    disabled: false,
  }}
/>
