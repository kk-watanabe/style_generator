<script lang="ts">
  import { FormPartsSize } from "$const/form";

  export let value: number = 0;
  export let size: FormPartsSize = FormPartsSize.Medium;
  export let disabled: boolean = false;

  let isFocus: boolean = false;

  const getClasses = (baseClass: string): string => {
    const result = [baseClass, `${baseClass}--${size}-size`];

    if (disabled) {
      result.push(`${baseClass}--disabled`);
    }

    return result.join(" ");
  };

  $: getParentClasses = (): string => {
    const baseClass = "input-number";
    const result = getClasses(baseClass);

    if (isFocus) {
      return `${result} ${baseClass}--focus`;
    }

    return result;
  };

  const onClick = (isAdd: boolean) => {
    if (isAdd) {
      value++;
    } else {
      value--;
    }
  };
</script>

<div class={getParentClasses()}>
  <div
    class={getClasses("input-number__button")}
    on:click={() => onClick(false)}
  >
    -
  </div>
  <input
    type="number"
    bind:value
    class={getClasses("input-number__input")}
    {disabled}
    on:focus={() => (isFocus = true)}
    on:blur={() => (isFocus = false)}
  />
  <div
    class={getClasses("input-number__button")}
    on:click={() => onClick(true)}
  >
    +
  </div>
</div>

<style lang="scss">
  @import "../../styles/_functions.scss";
  @import "../../styles/_color.scss";
  @import "../../styles/_size.scss";

  .input-number {
    display: inline-flex;
    align-items: center;
    min-width: $fromDefaultWidth;
    border: 1px solid $isColorBase600;
    background-color: $isColorWhite;

    &--focus {
      border-color: $isColorFocusOutline;
    }

    // disabled
    &--disabled {
      border-color: $isColorBase500;
      background-color: $isColorBase100;
    }

    // size
    &--large-size {
      height: $componentLargeHeight;
      border-radius: $borderRadiusLarge;
    }

    &--medium-size {
      height: $componentMediumHeight;
      border-radius: $borderRadiusMedium;
    }

    &--small-size {
      height: $componentSmallHeight;
      border-radius: $borderRadiusSmall;
    }
  }

  .input-number__input {
    flex: 1;
    outline: none;
    border: none;
    background-color: $isColorClear;
    color: $isColorBase1000;
    text-align: center;

    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;

      appearance: none;
    }

    // disabled
    &--disabled {
      height: 100%;
      background-color: $isColorBase100;
      color: $isColorBase800;
      line-height: 100%;
      cursor: text;
      pointer-events: none;
    }

    // size
    &--large-size {
      padding: 0 15px;
      line-height: $componentLargeHeight;

      @include font-size(16);
    }

    &--medium-size {
      padding: 0 12px;
      line-height: $componentMediumHeight;

      @include font-size(14);
    }

    &--small-size {
      padding: 0 8px;
      line-height: $componentSmallHeight;

      @include font-size(12);
    }
  }

  .input-number__button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 2px;
    height: 100%;
    background-color: $isColorBase200;
    color: $isColorBase1000;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $isColorBase300;
    }

    &:first-child {
      border-right: 1px solid $isColorBase600;
    }

    &:last-child {
      border-left: 1px solid $isColorBase600;
    }

    // disabled
    &--disabled {
      background-color: $isColorBase300;
      pointer-events: none;

      &:first-child {
        border-right-color: $isColorBase500;
      }

      &:last-child {
        border-left-color: $isColorBase500;
      }
    }

    // size
    &--large-size {
      width: $componentLargeHeight;

      &:first-child {
        border-top-left-radius: $borderRadiusLarge;
        border-bottom-left-radius: $borderRadiusLarge;
      }

      &:last-child {
        border-top-right-radius: $borderRadiusLarge;
        border-bottom-right-radius: $borderRadiusLarge;
      }
    }

    &--medium-size {
      width: $componentMediumHeight;

      &:first-child {
        border-top-left-radius: $borderRadiusMedium;
        border-bottom-left-radius: $borderRadiusMedium;
      }

      &:last-child {
        border-top-right-radius: $borderRadiusMedium;
        border-bottom-right-radius: $borderRadiusMedium;
      }
    }

    &--small-size {
      width: $componentSmallHeight;

      &:first-child {
        border-top-left-radius: $borderRadiusSmall;
        border-bottom-left-radius: $borderRadiusSmall;
      }

      &:last-child {
        border-top-right-radius: $borderRadiusSmall;
        border-bottom-right-radius: $borderRadiusSmall;
      }
    }
  }
</style>
