<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { Colors } from "$models/Colors";
  import ColorPicker from "$lib/form/ColorPicker.svelte";

  let colors = Colors.convertHexToColors("#115EFF");
</script>

<Meta title="Form/ColorPicker" component={ColorPicker} />

<Template let:args>
  <ColorPicker {...args} bind:colors />
</Template>

<Story name="Default" />
