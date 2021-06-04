<script lang="ts">
  import { FormPartsSize } from "$const/form";
  import { Colors } from "$models/Colors";
  import ColorPickerCanvas from "$lib/form/color-picker/ColorPickerCanvas.svelte";
  import ColorPickerSlider from "$lib/form/color-picker/ColorPickerSlider.svelte";
  import InputText from "$lib/form/InputText.svelte";
  import InputNumber from "$lib/form/InputNumber.svelte";

  const defaultClass = "color-picker";

  export let colors: Colors;

  $: updateColors(colors);

  const updateColors = (value: Colors) => {
    if (colors.isAlpha) {
      colors = Colors.convertRgbaToColors(value.rgba);
    } else if (value.hex.length === 4 || value.hex.length === 7) {
      colors = Colors.convertHexToColors(value.hex);
    }
  };
</script>

<div class={`${defaultClass}`}>
  <ColorPickerCanvas bind:colors />

  <div class={`${defaultClass}__control`}>
    <div class={`${defaultClass}__slider`}>
      <ColorPickerSlider bind:colors />
    </div>

    <div class={`${defaultClass}__result`}>
      <div
        class={`${defaultClass}__color-box`}
        style={`background-color: ${colors.rgbaStyle}`}
      />

      {#if colors.isAlpha}
        <div class={`${defaultClass}__rgba-box`}>
          <div class={`${defaultClass}__rgba-box-item`}>
            <span class={`${defaultClass}__rgba-box-label`}>R:</span>
            <InputNumber
              size={FormPartsSize.Small}
              bind:value={colors.rgba.r}
            />
          </div>
          <div class={`${defaultClass}__rgba-box-item`}>
            <span class={`${defaultClass}__rgba-box-label`}>G:</span>
            <InputNumber
              size={FormPartsSize.Small}
              bind:value={colors.rgba.g}
            />
          </div>
          <div class={`${defaultClass}__rgba-box-item`}>
            <span class={`${defaultClass}__rgba-box-label`}>B:</span>
            <InputNumber
              size={FormPartsSize.Small}
              bind:value={colors.rgba.b}
            />
          </div>
        </div>
      {:else}
        <InputText bind:value={colors.hex} size={FormPartsSize.Small} />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/_functions.scss";
  @import "../../styles/_color.scss";
  @import "../../styles/_size.scss";

  .color-picker {
    overflow: hidden;
    width: 300px;
    border: 1px solid $isColorBase300;
    border-radius: $borderRadiusMedium;
    background-color: $isColorWhite;

    &__control {
      padding: 10px;
    }

    &__result {
      display: flex;
      align-items: center;
      margin-top: 15px;
    }

    &__color-box {
      margin-right: 8px;
      width: $componentSmallHeight;
      height: $componentSmallHeight;
      border-radius: 50%;
    }

    &__rgba-box {
      flex: 1;

      &-item {
        display: flex;
        align-items: center;

        &:not(:first-child) {
          margin-top: 8px;
        }
      }

      &-label {
        margin-right: 5px;
        width: 15px;

        @include font-size(14);
      }
    }
  }
</style>
