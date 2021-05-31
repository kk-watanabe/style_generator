<script lang="ts">
  import { FormPartsSize } from "$const/form";
  import type { SliderOption } from "$const/form";

  export let value: number = 0;
  export let size: FormPartsSize = FormPartsSize.Small;
  export let option: SliderOption = {
    min: 0,
    max: 360,
    step: 1,
  };
  export let showOption: boolean = false;
  export let showProgressBg: boolean = false;
  export let disabled: boolean = false;

  const defaultClass = "slider";
  const maxPercent = 100;

  let range: HTMLElement;
  let dot: HTMLElement;

  let isCliek = true;
  let isMouseDown = false;

  const getClasses = (baseClass: string): string => {
    const result = [baseClass];

    if (disabled) {
      result.push(`${baseClass}--disabled`);
    }

    return result.join(" ");
  };

  const getProgressBgClasses = (): string => {
    const baseClass = `${defaultClass}__progressBg`;
    let result = getClasses(baseClass);

    if (showProgressBg) {
      result += ` ${baseClass}--show`;
    }

    return (result += ` ${baseClass}--${size}-size`);
  };

  const getProgressClasses = (): string => {
    const baseClass = `${defaultClass}__progress`;
    let result = getClasses(baseClass);

    return (result += ` ${baseClass}--${size}-size`);
  };

  $: getDotClasses = (): string => {
    const baseClass = `${defaultClass}__dot`;
    let classes = getClasses(baseClass);

    if (isMouseDown) {
      classes += ` ${baseClass}--mousemove`;
    }

    return classes;
  };

  $: porgressStyle = () => {
    const width = (value / option.max) * maxPercent;

    return `width: ${width}%`;
  };

  $: dotStyle = () => {
    const left = (value / option.max) * maxPercent;

    return `left: ${left}%`;
  };

  const getValue = (result: number): number => {
    if (result > option.max) {
      return option.max;
    } else if (result < option.min) {
      return option.min;
    }

    return result;
  };

  const onClick = (e: MouseEvent) => {
    if (isCliek && !disabled) {
      const { width, left } = range.getBoundingClientRect();
      const x = Math.round(e.x - left);
      const decimal = Number((x / width).toFixed(2));
      const result = Math.trunc(option.max * decimal);

      value = getValue(result);
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isMouseDown) {
      const { width, left } = range.getBoundingClientRect();
      const x = Math.round(e.x - left);
      const decimal = Number((x / width).toFixed(2));
      const result = Math.trunc(option.max * decimal);

      value = getValue(result);
    }
  };

  const onMouseUp = () => {
    isMouseDown = false;
    isCliek = true;

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = (e: MouseEvent) => {
    if (!disabled) {
      e.preventDefault();

      isMouseDown = true;
      isCliek = false;

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
  };
</script>

<div class={getClasses(defaultClass)}>
  {#if showOption}
    <div class={getClasses(`${defaultClass}__text`)}>
      {option.min}
    </div>
  {/if}
  <div
    bind:this={range}
    class={`${defaultClass}__range`}
    on:click={onClick}
    on:mousedown={onMouseDown}
  >
    <div class={getProgressBgClasses()} />
    <div class={getProgressClasses()} style={porgressStyle()} />
    <div bind:this={dot} class={getDotClasses()} style={dotStyle()} />
  </div>
  {#if showOption}
    <div class={getClasses(`${defaultClass}__text`)}>
      {option.max}
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../../styles/_functions.scss";
    @import "../../styles/_color.scss";
    @import "../../styles/_size.scss";

    .slider {
      display: flex;
      align-items: center;

      &__text {
        color: $isColorBase900;

        @include font-size(14);

        &:first-child {
          margin-right: 15px;
        }

        &:last-child {
          margin-left: 15px;
        }

        &--disabled {
          color: $isColorBase600;
        }
      }

      &__range {
        position: relative;
        flex: 1;
        height: 10px;
      }

      &__progressBg {
        position: relative;
        border-radius: 5px;

        &--show {
          background-color: $isColorBase400;
        }

        &--large-size {
          top: 0;
          height: 10px;
        }

        &--medium-size {
          top: 2px;
          height: 6px;
        }

        &--small-size {
          top: 4px;
          height: 2px;
        }
      }

      &__progress {
        position: absolute;
        left: 0;
        border-radius: 5px;
        background-color: $isSiteColor800;

        &--large-size {
          top: 0;
          height: 10px;
        }

        &--medium-size {
          top: 2px;
          height: 6px;
        }

        &--small-size {
          top: 4px;
          height: 2px;
        }

        &--disabled {
          background-color: $isColorBase600;
        }
      }

      &__dot {
        position: absolute;
        top: -2px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        transform: translateX(-6px);

        &::before,
        &::after {
          position: absolute;
          width: inherit;
          height: inherit;
          border-radius: inherit;
          content: "";
        }

        &::before {
          z-index: 1;
          background-color: $isSiteColor800;
        }

        &::after {
          background-color: $isSiteColor500;
          opacity: 0.5;
          transition: transform 0.2s ease;
          transform: scale(1);
        }

        &:hover:not(.slider__dot--disabled) {
          cursor: pointer;

          &::after {
            transform: scale(1.5);
          }
        }

        &--mousemove {
          &:hover {
            &::after {
              transform: scale(2);
            }
          }

          &::after {
            transform: scale(2);
          }
        }

        &--disabled {
          background-color: $isColorBase600;

          &::after {
            opacity: 0;
          }
        }
      }
    }
</style>
