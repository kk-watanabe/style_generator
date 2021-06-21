<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import CodeBoard from "$lib/CodeBoard.svelte";
</script>

<Meta
  title="Atom/CodeBoard"
  component={CodeBoard}
  argTypes={{
    value: { control: { type: "text" } },
  }}
/>

<Template let:args>
  <div style="width: 500px; height 300px">
    <CodeBoard {...args} />
  </div>
</Template>

<Story
  name="Default"
  args={{
    value:
      "smaple text smaple text smaple text\nsmaple textsmaple text\n\nsmaple textsmaple text",
  }}
/>
