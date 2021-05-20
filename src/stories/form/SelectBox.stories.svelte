<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { FormPartsSize } from "$const/form";
  import SelectBox from "$lib/form/SelectBox.svelte";

  const options = [
    {
      label: "ラベル1",
      value: 0,
      disabled: false,
    },
    {
      label: "ラベル2",
      value: 1,
      disabled: false,
    },
    {
      label: "ラベル3ラベル3ラベル3",
      value: 2,
      disabled: false,
    },
  ];

  let value = options[1].value;
</script>

<Meta
  title="Form/SelectBox"
  component={SelectBox}
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
  <SelectBox {...args} bind:value />

  {value}
</Template>

<Story
  name="Default"
  args={{
    options: options,
    size: FormPartsSize.Medium,
    disabled: false,
  }}
/>
