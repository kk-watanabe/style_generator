<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { FormPartsSize } from "$const/form";
  import InputText from "$lib/form/InputText.svelte";

  let value = "text";
</script>

<Meta
  title="Form/InputText"
  component={InputText}
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
  <InputText {...args} bind:value />

  <div>{value}</div>
</Template>

<Story
  name="Default"
  args={{
    size: FormPartsSize.Medium,
    disabled: false,
  }}
/>
