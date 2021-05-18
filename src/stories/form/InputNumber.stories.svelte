<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { FormPartsSize } from "$const/form";
  import InputNumber from "$lib/form/InputNumber.svelte";

  let value = 0;
</script>

<Meta
  title="Form/InputNumber"
  component={InputNumber}
  argTypes={{
    size: {
      control: {
        type: "select",
        options: FormPartsSize,
      },
    },
    disabled: { control: "boolean" },
  }}
/>

<Template let:args>
  <InputNumber {...args} bind:value />

  <div>{value}</div>
</Template>

<Story
  name="Default"
  args={{
    size: FormPartsSize.Medium,
    disabled: false,
  }}
/>
