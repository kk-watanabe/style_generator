<script lang="ts">
  import Copy from "$lib/icon/Copy.svelte";

  const defaultClass = "code-board";

  export let value: string = "";

  const copyValue = (value: string): boolean => {
    const textarea = document.createElement("textarea");

    textarea.value = value;
    textarea.selectionStart = 0;
    textarea.selectionEnd = textarea.value.length;

    // 表示されてしまわないように
    const s = textarea.style;
    s.position = "fixed";
    s.left = "-100%";

    document.body.appendChild(textarea);
    textarea.focus();
    //IE11 & Edgeではselectしないとfocusされない
    textarea.select();
    const result = document.execCommand("copy");
    textarea.blur();
    document.body.removeChild(textarea);

    return result;
  };

  const onClick = () => {
    copyValue(value);
  };
</script>

<div class={defaultClass}>
  <pre class={`${defaultClass}__output`}>{value}</pre>

  <button type="button" class={`${defaultClass}__button`} on:click={onClick}>
    <div class={`${defaultClass}__icon`}>
      <Copy />
    </div>
  </button>
</div>

<style lang="scss">
  @import "../styles/_functions.scss";
  @import "../styles/_color.scss";
  @import "../styles/_size.scss";

  .code-board {
    position: relative;
    padding: 15px;
    min-height: 50px;
    border-radius: $borderRadiusMedium;
    background-color: $isColorBase100;

    &__output {
      margin-bottom: 0;
      color: $isColorBase800;

      @include font-size(14);
    }

    &__button {
      position: absolute;
      top: 5px;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50px;
      background-color: $isColorClear;
      transition: background-color ease 0.3s;

      &:hover {
        background-color: $isColorBase200;
      }
    }

    &__icon {
      width: 18px;
      color: $isColorBase600;
      line-height: 1;
    }
  }
</style>
