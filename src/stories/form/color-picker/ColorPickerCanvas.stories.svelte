<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { Colors } from "$models/Colors";
  import ColorPickerCanvas from "$lib/form/color-picker/ColorPickerCanvas.svelte";

  let colors = Colors.convertHexToColors("#115EFF");
</script>

<Meta
  title="Form/color-picker/ColorPickerCanvas"
  component={ColorPickerCanvas}
/>

<Template let:args>
  <ColorPickerCanvas bind:colors />

  <div style={`width: 50px; height: 50px; background-color: ${colors.hex};`} />
</Template>

<Story name="Default" />
