<script lang="ts">
  import { onMount } from "svelte";
  import { clamp } from "$util/color-util";
  import { Colors } from "$models/Colors";

  export let colors: Colors;

  const defaultClass = "color-picker-canvas";

  // canvas
  const canvasWidth = 300;
  const canvasHeight = 150;

  // coursor
  const cursorSize = 10;

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  let isMouseDown = false;

  $: cursorStyle = () => {
    const cursorCenter = cursorSize / 2;
    const hsva = colors.hsva;
    const x = hsva.s * parseInt(`${canvasWidth}`, cursorSize) - cursorCenter;
    const y =
      (1 - hsva.v) * parseInt(`${canvasHeight}`, cursorSize) - cursorCenter;

    return `width: ${cursorSize}px; height: ${cursorSize}px; transform: translate(${x}px, ${y}px)`;
  };

  $: updateCanvas(colors.hue);

  const updateCanvas = (hue: number) => {
    if (!canvas) return;

    context = canvas.getContext("2d");

    if (context) {
      const baseGradient = context.createLinearGradient(0, 0, canvasWidth, 0);
      baseGradient.addColorStop(0, "hsla(0, 0%, 100%, 1)"); // white
      baseGradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 1)`);
      context.fillStyle = baseGradient;
      context.fillRect(0, 0, canvasWidth, canvasHeight);

      const coverGradient = context.createLinearGradient(0, 0, 0, canvasHeight);
      coverGradient.addColorStop(0, "hsla(0, 0%, 100%, 0)"); // transparent
      coverGradient.addColorStop(1, "hsla(0, 0%, 0%, 1)"); // black
      context.fillStyle = coverGradient;
      context.fillRect(0, 0, canvasWidth, canvasHeight);
    }
  };

  const updateMouseEventColors = (e: MouseEvent) => {
    const { width, height } = canvas.getBoundingClientRect();

    colors = Colors.convertHSVAToColors({
      h: colors.hue,
      s: clamp(e.offsetX, 0, width) / width,
      v: 1 - clamp(e.offsetY, 0, height) / height,
      a: colors.alpha,
    });
  };

  const onClick = (e: MouseEvent) => {
    updateMouseEventColors(e);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isMouseDown) {
      updateMouseEventColors(e);
    }
  };

  const onMouseUp = () => {
    isMouseDown = false;

    window.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();

    isMouseDown = true;

    window.addEventListener("mouseup", onMouseUp);
  };

  onMount(() => updateCanvas(colors.hue));
</script>

<div class={defaultClass}>
  <canvas
    bind:this={canvas}
    width={canvasWidth}
    height={canvasHeight}
    class={`${defaultClass}__palette`}
    on:click={onClick}
    on:mousedown={onMouseDown}
    on:mousemove={onMouseMove}
  />

  <div class={`${defaultClass}__cursor`} style={cursorStyle()} />
</div>

<style lang="scss">
  @import "../../../styles/_color.scss";

  .color-picker-canvas {
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;

    &__cursor {
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid $isColorBase800;
      border-radius: 50%;
      box-shadow: 0 0 0 1px $isColorWhite;
    }
  }
</style>
