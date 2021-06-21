<script lang="ts">
  const defaultClass = "switch";

  export let value: boolean = false;
  export let disabled: boolean = false;

  const getClasses = (defaultClass: string): string => {
    const result = [defaultClass];

    if (disabled) {
      result.push(`${defaultClass}--disabled`);
    } else {
    }

    return result.join(" ");
  };

  $: getParentClasses = (): string => {
    const result = getClasses(defaultClass);

    if (value) {
      return `${result} ${defaultClass}--checked`;
    }

    return result;
  };

  $: getDotClasses = (): string => {
    const baseClass = `${defaultClass}__dot`;
    const result = getClasses(baseClass);

    if (value) {
      return `${result} ${baseClass}--checked`;
    }

    return result;
  };

  const onClick = () => {
    if (!disabled) {
      value = !value;
    }
  };
</script>

<div class={getParentClasses()} on:click={onClick}>
  <input
    type="checkbox"
    class={`${defaultClass}__input`}
    bind:checked={value}
    {disabled}
  />

  <div class={getDotClasses()} />
</div>

<style lang="scss">
  @import "../../styles/_color.scss";
    @import "../../styles/_size.scss";

    .switch {
      position: relative;
      width: 40px;
      height: $checkFormPartsSmallSize;
      border-radius: $checkFormPartsSmallSize / 2;
      background-color: $isColorBase400;
      cursor: pointer;

      &--checked {
        background-color: $isSiteColor800;
      }

      &--disabled {
        background-color: $isColorBase300;
      }

      &__input {
        position: absolute;
        z-index: -1;
        width: 1px;
        height: 1px;
        opacity: 0;
      }

      &__dot {
        position: absolute;
        top: 2px;
        left: 2px;
        width: $checkFormPartsSmallSize - 4px;
        height: $checkFormPartsSmallSize - 4px;
        border-radius: 50%;
        background-color: $isColorWhite;
        transition: transform ease 0.3s;
        transform: translateX(0);

        &--checked {
          transform: translateX(40px - $checkFormPartsSmallSize);
        }

        &--disabled {
          background-color: $isColorBase100;
        }
      }
    }
</style>
