<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Copy from "$lib/icon/Copy.svelte";
</script>

<Meta
  title="Icon/Copy"
  component={Copy}
  argTypes={{
    className: { control: { type: "text" } },
  }}
/>

<Template let:args>
  <Copy {...args} />
</Template>

<Story
  name="Default"
  args={{
    className: "class1 class2",
  }}
/>
