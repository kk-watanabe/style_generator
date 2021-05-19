<script lang="ts">
  import { FormPartsSize } from "$const/form";

  const baseClass = "checkbox";

  export let value: boolean = false;
  export let size: FormPartsSize = FormPartsSize.Medium;
  export let disabled: boolean = false;

  const getClasses = (baseClass: string): string => {
    const result = [baseClass, `${baseClass}--${size}-size`];

    if (disabled) {
      result.push(`${baseClass}--disabled`);
    }

    return result.join(" ");
  };

  $: getParentClasses = (): string => {
    const result = [baseClass];

    if (disabled) {
      result.push(`${baseClass}--disabled`);
    }

    return result.join(" ");
  };

  $: getBoxClasses = (): string => {
    const boxClass = `${baseClass}__box`;
    const result = getClasses(boxClass);

    if (value) {
      return `${result} ${boxClass}--checked`;
    }

    return result;
  };

  $: getIconClasses = (): string => {
    const iconClass = `${baseClass}__icon`;
    const result = getClasses(iconClass);

    if (value) {
      return `${result} ${iconClass}--show`;
    }

    return result;
  };
</script>

<label class={getParentClasses()}>
  <input
    type="checkbox"
    class={`${baseClass}__input`}
    bind:checked={value}
    {disabled}
  />

  <div class={getBoxClasses()}>
    <div class={getIconClasses()} />
  </div>

  {#if $$slots.default}
    <div class={getClasses(`${baseClass}__text`)}>
      <slot><!-- optional fallback --></slot>
    </div>
  {/if}
</label>

<style lang="scss">
  @import "../../styles/_functions.scss";
  @import "../../styles/_color.scss";
  @import "../../styles/_size.scss";

  .checkbox {
    display: inline-flex;
    border: 1px solid $isColorClear;
    color: $isColorBase1000;
    cursor: pointer;

    // disabled
    &--disabled {
      cursor: text;
    }
  }

  .checkbox__input {
    position: absolute;
    z-index: -1;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  .checkbox__box {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $isColorBase600;
    background-color: $isColorWhite;
    transition: border-color 0.1s ease, background-color 0.1s ease;

    &--checked {
      border-color: $isSiteColor800;
      background-color: $isSiteColor800;
    }

    // disabled
    &--disabled {
      border-color: $isColorBase500;
      background-color: $isColorBase500;
    }

    // size
    &--large-size {
      width: $checkFormPartsLargeSize;
      height: $checkFormPartsLargeSize;
      border-radius: $borderRadiusLarge;
    }

    &--medium-size {
      padding-top: 1px;
      width: $checkFormPartsMediumSize;
      height: $checkFormPartsMediumSize;
      border-radius: $borderRadiusMedium;
    }

    &--small-size {
      padding-top: 2px;
      width: $checkFormPartsSmallSize;
      height: $checkFormPartsSmallSize;
      border-radius: $borderRadiusSmall;
    }
  }

  .checkbox__icon {
    position: relative;
    width: 14px;
    height: 11px;
    opacity: 0;

    // size
    &--large-size {
      transform: scale(1.2);
    }

    &--medium-size {
      transform: scale(1);
    }

    &--small-size {
      transform: scale(0.8);
    }

    &::before,
    &::after {
      position: absolute;
      width: 0;
      height: 3px;
      background-color: $isColorWhite;
      content: "";
    }

    &::before {
      transition: width 0.1s ease 0.05s;
      transform: rotate(45deg) translate(3px, 4px);
    }

    &::after {
      transition: width 0.1s ease 0.2s;
      transform: rotate(-45deg) translate(-1px, 5px);
    }

    &--show {
      opacity: 1;

      &::before {
        width: 8px;
      }

      &::after {
        width: 12px;
      }
    }
  }

  .checkbox__text {
    color: $isColorBase1000;

    // disabled
    &--disabled {
      color: $isColorBase800;
    }

    // size
    &--large-size {
      margin-left: 10px;
      padding-top: 2px;

      @include font-size(16);
    }

    &--medium-size {
      margin-left: 8px;
      padding-top: 1px;

      @include font-size(14);
    }

    &--small-size {
      margin-left: 6px;
      padding-top: 1px;

      @include font-size(12);
    }
  }
</style>
