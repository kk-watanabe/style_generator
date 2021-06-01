<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { Colors } from "$models/Colors";
  import ColorPickerSlider from "$lib/form/color-picker/ColorPickerSlider.svelte";

  let colors = Colors.convertHexToColors("#115EFF");
</script>

<Meta
  title="Form/color-picker/ColorPickerSlider"
  component={ColorPickerSlider}
/>

<Template>
  <ColorPickerSlider bind:colors />

  <div
    style={`margin-top: 30px; width: 50px; height: 50px; background-color: ${colors.rgbaStyle};`}
  />
</Template>

<Story name="Default" />
