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

  function onClick(e: MouseEvent) {
    if (!disabled) {
      dispatch("click", e);
    }
  }
</script>

<button class={classes().join(" ")} on:click={onClick}>
  {label}
</button>

<style lang="scss">
  @import "../styles/_functions.scss";
  @import "../styles/_color.scss";

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-style: solid;
    border-radius: 6px;
    color: $isColorBase1000;
    cursor: pointer;

    // color
    &--light {
      border-color: $isColorBase700;
      background-color: $isColorWhite;
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
      padding: 2px 20px 0;
      height: 44px;

      @include font-size(16);
    }

    &--medium-size {
      padding: 1px 16px 0;
      height: 36px;

      @include font-size(14);
    }

    &--small-size {
      padding: 1px 12px 0;
      height: 26px;

      @include font-size(12);
    }
  }
</style>
