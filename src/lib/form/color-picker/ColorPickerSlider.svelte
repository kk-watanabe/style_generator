<script lang="ts">
  import type { SliderOption } from "$const/form";
  import { Colors } from "$models/Colors";

  export let colors: Colors;

  const defaultClass = "color-picker-slider";
  const maxPercent = 100;

  // hue slider
  const hueOption: SliderOption = {
    min: 0,
    max: 360,
    step: 1,
  };
  let hueRange: HTMLElement;
  let hueValue: number = colors.hue;

  // alpha slider
  const alphaOption: SliderOption = {
    min: 0,
    max: 10,
    step: 1,
  };
  let alphaRange: HTMLElement;
  let alphaValue: number = colors.alpha;

  let isCliek = true;
  let isHueMouseDown = false;
  let isAlphaMouseDown = false;

  const getClasses = (baseClass: string): string => {
    const result = [baseClass];

    return result.join(" ");
  };

  $: hueDotClasses = (): string => {
    const baseClass = `${defaultClass}__dot`;

    let classes = getClasses(baseClass);

    if (isHueMouseDown) {
      classes += ` ${baseClass}--mousemove`;
    }

    return classes;
  };

  $: hueDotStyle = () => {
    const left = (hueValue / hueOption.max) * maxPercent;

    return `left: ${left}%; background-color: ${colors.rgbaStyle};`;
  };

  $: alphaDotClasses = (): string => {
    const baseClass = `${defaultClass}__dot`;

    let classes = getClasses(baseClass);

    if (isAlphaMouseDown) {
      classes += ` ${baseClass}--mousemove`;
    }

    return classes;
  };

  $: alphaDotStyle = () => {
    const left = (alphaValue / alphaOption.max) * maxPercent;

    return `left: ${left}%`;
  };

  const getValue = (
    mouseX: number,
    range: HTMLElement,
    option: SliderOption
  ): number => {
    const { width, left } = range.getBoundingClientRect();
    const x = Math.round(mouseX - left);
    const decimal = Number((x / width).toFixed(2));
    const result = Math.trunc(option.max * decimal);

    if (result > option.max) {
      return option.max;
    } else if (result < option.min) {
      return option.min;
    }

    return result;
  };

  const getHueValue = (e: MouseEvent) => {
    hueValue = getValue(e.x, hueRange, hueOption);

    colors = Colors.updateHue(colors.hsva, hueValue);
  };

  const onHueClick = (e: MouseEvent) => {
    if (isCliek) {
      getHueValue(e);
    }
  };

  const onHueMouseMove = (e: MouseEvent) => {
    if (isHueMouseDown) {
      getHueValue(e);
    }
  };

  const onHueMouseUp = () => {
    isHueMouseDown = false;
    isCliek = true;

    window.removeEventListener("mousemove", onHueMouseMove);
    window.removeEventListener("mouseup", onHueMouseUp);
  };

  const onHueMouseDown = (e: MouseEvent) => {
    e.preventDefault();

    isHueMouseDown = true;
    isCliek = false;

    window.addEventListener("mousemove", onHueMouseMove);
    window.addEventListener("mouseup", onHueMouseUp);
  };

  const updateAlpha = (e: MouseEvent) => {
    alphaValue = getValue(e.x, alphaRange, alphaOption);

    const value = (alphaValue * 0.1).toFixed(1);

    colors = Colors.updateAlpha(colors.hex, Number(value));
  };

  const onAlphaClick = (e: MouseEvent) => {
    if (isCliek) {
      updateAlpha(e);
    }
  };

  const onAlphaMouseMove = (e: MouseEvent) => {
    if (isAlphaMouseDown) {
      updateAlpha(e);
    }
  };

  const onAlphaMouseUp = () => {
    isAlphaMouseDown = false;
    isCliek = true;

    window.removeEventListener("mousemove", onAlphaMouseMove);
    window.removeEventListener("mouseup", onAlphaMouseUp);
  };

  const onAlphaMouseDown = (e: MouseEvent) => {
    e.preventDefault();

    isAlphaMouseDown = true;
    isCliek = false;

    window.addEventListener("mousemove", onAlphaMouseMove);
    window.addEventListener("mouseup", onAlphaMouseUp);
  };
</script>

{alphaValue}

<div class={`${defaultClass}`}>
  <div
    bind:this={hueRange}
    class={`${defaultClass}__range ${defaultClass}__hue-range`}
    on:click={onHueClick}
    on:mousedown={onHueMouseDown}
  >
    <div class={`${defaultClass}__progress-bg`} />
    <div
      class={`${hueDotClasses()} ${defaultClass}__hue-dot`}
      style={hueDotStyle()}
    />
  </div>

  <div
    bind:this={alphaRange}
    class={`${defaultClass}__range ${defaultClass}__alpha-range`}
    on:click={onAlphaClick}
    on:mousedown={onAlphaMouseDown}
  >
    <div
      class={`${defaultClass}__progress-bg ${defaultClass}__alpha-progress-bg`}
    />
    <div
      class={`${alphaDotClasses()} ${defaultClass}__alpha-dot`}
      style={alphaDotStyle()}
    />
  </div>
</div>

<style lang="scss">
  @import "../../../styles/_functions.scss";
  @import "../../../styles/_color.scss";
  @import "../../../styles/_size.scss";

  .color-picker-slider {
    &__range {
      position: relative;
      height: 10px;
      border-radius: 5px;
    }

    &__hue-range {
      background: linear-gradient(
        90deg,
        red,
        #ff0 16.66%,
        #0f0 33.33%,
        #0ff 50%,
        #00f 66.66%,
        #f0f 83.33%,
        red
      );
    }

    &__alpha-range {
      margin-top: 10px;
      background-image: linear-gradient(
          45deg,
          $isColorGray 25%,
          $isColorClear 25%,
          $isColorClear 75%,
          $isColorGray 75%,
          $isColorGray 100%
        ),
        linear-gradient(
          45deg,
          $isColorGray 25%,
          $isColorWhite 25%,
          $isColorWhite 75%,
          $isColorGray 75%,
          $isColorGray 100%
        );
      background-position: 0px 0px, 5px 5px;
      background-size: 10px 10px;
    }

    &__progress-bg {
      position: relative;
      top: 0;
      height: 10px;
      border-radius: inherit;
    }

    &__alpha-progress-bg {
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.65) 100%
      );
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
        border: 1px solid $isColorWhite;
      }

      &::after {
        background-color: $isColorGray;
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
    }

    &__hue-dot {
      &::before {
        background-color: inherit;
      }
    }

    &__alpha-dot {
      &::before {
        background-color: $isColorBase1000;
      }
    }
  }
</style>
