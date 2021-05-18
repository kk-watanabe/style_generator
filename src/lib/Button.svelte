<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ButtonSize, ButtonColor } from "$const/button";

  export let label: string = "";
  export let size: ButtonSize = ButtonSize.Large;
  export let color: ButtonColor = ButtonColor.Dark;
  export let disabled: boolean = false;

  const classes = (): string[] => {
    const defaultClass = "button";
    const result = [defaultClass, `${defaultClass}--${size}-size`];

    if (disabled) {
      result.push(`${defaultClass}--disabled`);
    } else {
      result.push(`${defaultClass}--${color}`);
    }

    return result;
  };

  const dispatch = createEventDispatcher();

  const onClick = (e: MouseEvent) => {
    if (!disabled) {
      dispatch("click", e);
    }
  };
</script>

<button class={classes().join(" ")} on:click={onClick}>
  {label}
</button>

<style lang="scss">
  @import "../styles/_functions.scss";
  @import "../styles/_color.scss";
  @import "../styles/_size.scss";

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border-width: 1px;
    border-style: solid;
    cursor: pointer;

    // color
    &--light {
      border-color: $isColorBase700;
      background-color: $isColorWhite;
      color: $isColorBase1000;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: $isSiteColor200;
      }
    }

    &--dark {
      border-color: $isColorBase900;
      background-color: $isColorBase900;
      color: $isColorWhite;
      transition: border-color 0.3s ease, background-color 0.3s ease;

      &:hover {
        border-color: $isColorBase1000;
        background-color: $isColorBase1000;
      }
    }

    &--site-color {
      border-color: $isSiteColor800;
      background-color: $isSiteColor800;
      color: $isColorWhite;
      transition: border-color 0.3s ease, background-color 0.3s ease;

      &:hover {
        border-color: $isSiteColor900;
        background-color: $isSiteColor900;
      }
    }

    // disabled
    &--disabled {
      border-color: $isColorBase500;
      background-color: $isColorBase400;
      cursor: text;
    }

    // size
    &--large-size {
      padding: 0 20px;
      height: $componentLargeHeight;
      border-radius: $borderRadiusLarge;

      @include font-size(16);
    }

    &--medium-size {
      padding: 0 16px;
      height: $componentMediumHeight;
      border-radius: $borderRadiusMedium;

      @include font-size(14);
    }

    &--small-size {
      padding: 0 12px;
      height: $componentSmallHeight;
      border-radius: $borderRadiusSmall;

      @include font-size(12);
    }
  }
</style>
