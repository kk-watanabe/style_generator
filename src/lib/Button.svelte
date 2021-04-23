<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ButtonSize, ButtonColor } from "$const/button";

  export let label: string = "";
  export let size: ButtonSize = ButtonSize.Large;
  export let color: ButtonColor = ButtonColor.Dark;

  console.log(label);
</script>

<button
  class={["button", `button--${size}-size`, `button--${color}`].join(" ")}
>
  {label}
</button>

<style lang="scss">
  @import "../styles/_color.scss";

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-style: solid;

    &--light {
    }

    &--light {
    }

    &--site-color {
    }
  }
</style>
