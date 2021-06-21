<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Switch from "$lib/form/Switch.svelte";

  let value = true;
</script>

<Meta
  title="Form/Switch"
  component={Switch}
  argTypes={{
    disabled: { control: "boolean" },
  }}
/>

<Template let:args>
  <Switch {...args} bind:value>{args.slotText}</Switch>
</Template>

<Story
  name="Default"
  args={{
    disabled: false,
  }}
/>
