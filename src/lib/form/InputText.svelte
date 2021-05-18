<script lang="ts">
  import { FormPartsSize } from "$const/form";

  export let value: string = "";
  export let size: FormPartsSize = FormPartsSize.Medium;
  export let disabled: boolean = false;

  const classes = (): string[] => {
    const defaultClass = "input-text";
    const result = [defaultClass, `${defaultClass}--${size}-size`];

    if (disabled) {
      result.push(`${defaultClass}--disabled`);
    }

    return result;
  };
</script>

<input type="text" class={classes().join(" ")} bind:value {disabled} />

<style lang="scss">
  @import "../../styles/_functions.scss";
  @import "../../styles/_color.scss";
  @import "../../styles/_size.scss";

  .input-text {
    min-width: $fromDefaultWidth;
    outline: none;
    border: 1px solid $isColorBase600;
    background-color: $isColorWhite;
    color: $isColorBase1000;

    &:focus {
      border-color: $isColorFocusOutline;
    }

    // disabled
    &--disabled {
      border-color: $isColorBase500;
      background-color: $isColorBase100;
      color: $isColorBase800;
      cursor: text;
      pointer-events: none;
    }

    // size
    &--large-size {
      padding: 0 15px;
      height: $componentLargeHeight;
      border-radius: $borderRadiusLarge;
      line-height: $componentLargeHeight;

      @include font-size(16);
    }

    &--medium-size {
      padding: 0 12px;
      height: $componentMediumHeight;
      border-radius: $borderRadiusMedium;
      line-height: $componentMediumHeight;

      @include font-size(14);
    }

    &--small-size {
      padding: 0 8px;
      height: $componentSmallHeight;
      border-radius: $borderRadiusSmall;
      line-height: $componentSmallHeight;

      @include font-size(12);
    }
  }
</style>
