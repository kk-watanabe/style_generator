<script lang="ts">
  import { FormPartsSize, SelectOption } from "$const/form";

  const defaultClass = "select-box";

  export let value: string | number;
  export let options: SelectOption[];
  export let size: FormPartsSize = FormPartsSize.Medium;
  export let disabled: boolean = false;

  const classes = (): string => {
    const result = [defaultClass, `${defaultClass}--${size}-size`];

    if (disabled) {
      result.push(`${defaultClass}--disabled`);
    }

    return result.join(" ");
  };

  $: getOption = (): SelectOption => {
    return options.find((option) => option.value === value) ?? options[0];
  };
</script>

<div class={classes()}>
  <div class={`${defaultClass}__text`}>{getOption().label}</div>

  <select bind:value class={`${defaultClass}__input`}>
    {#each options as option}
      <option value={option.value}>
        {option.label}
      </option>
    {/each}
  </select>
</div>

<style lang="scss">
  @import "../../styles/_functions.scss";
  @import "../../styles/_color.scss";
  @import "../../styles/_size.scss";

  .select-box {
    position: relative;
    min-width: $fromDefaultWidth;
    outline: none;
    border: 1px solid $isColorBase600;
    background-color: $isColorWhite;
    color: $isColorBase1000;

    &::after {
      position: absolute;
      width: 8px;
      height: 8px;
      border-bottom: 3px solid $isSiteColor900;
      border-left: 3px solid $isSiteColor900;
      content: "";
    }

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
      padding: 0 45px 0 15px;
      height: $componentLargeHeight;
      border-radius: $borderRadiusLarge;
      line-height: $componentLargeHeight;

      @include font-size(16);

      &::after {
        top: 25%;
        right: 15px;
        transform: rotate(-45deg) translate(-6px) scale(1.2);
      }
    }

    &--medium-size {
      padding: 0 42px 0 12px;
      height: $componentMediumHeight;
      border-radius: $borderRadiusMedium;
      line-height: $componentMediumHeight;

      @include font-size(14);

      &::after {
        top: 29%;
        right: 12px;
        transform: rotate(-45deg) translate(-3px) scale(1);
      }
    }

    &--small-size {
      padding: 0 38px 0 8px;
      height: $componentSmallHeight;
      border-radius: $borderRadiusSmall;
      line-height: $componentSmallHeight;

      @include font-size(12);

      &::after {
        top: 20%;
        right: 8px;
        transform: rotate(-45deg) translate(-3px) scale(0.8);
      }
    }
  }

  .select-box__input {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    opacity: 0;
  }
</style>
