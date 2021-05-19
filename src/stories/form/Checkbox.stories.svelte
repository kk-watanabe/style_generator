<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { FormPartsSize } from "$const/form";
  import Checkbox from "$lib/form/Checkbox.svelte";

  let value = true;
</script>

<Meta
  title="Form/Checkbox"
  component={Checkbox}
  argTypes={{
    size: {
      control: {
        type: "select",
        options: FormPartsSize,
      },
    },
    disabled: { control: "boolean" },
    slotText: { control: "text" },
  }}
/>

<Template let:args>
  <Checkbox {...args} bind:value>{args.slotText}</Checkbox>
</Template>

<Story
  name="Default"
  args={{
    size: FormPartsSize.Medium,
    disabled: false,
    slotText: "サンプルテキスト",
  }}
/>
