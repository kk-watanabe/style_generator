<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { FormPartsSize } from "$const/form";
  import Slider from "$lib/form/Slider.svelte";

  const option = {
    min: 0,
    max: 100,
    step: 1,
  };

  let value = 40;
</script>

<Meta
  title="Form/Slider"
  component={Slider}
  argTypes={{
    size: {
      control: {
        type: "select",
        options: FormPartsSize,
      },
    },
    showOption: { control: "boolean" },
    showProgressBg: { control: "boolean" },
    disabled: { control: "boolean" },
  }}
/>

<Template let:args>
  <Slider {...args} bind:value :option={option} />

  <div>{value}</div>
</Template>

<Story
  name="Default"
  args={{
    size: FormPartsSize.Large,
    showOption: true,
    showProgressBg: true,
    disabled: false,
  }}
/>
