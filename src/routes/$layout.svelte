<script lang="ts">
  import { onMount } from "svelte";
  import "../../node_modules/reseter.css";

  let dragImage: HTMLImageElement;

  let naviWidth = 200;
  let isDragging = false;

  onMount(() => {
    dragImage = new Image(0, 0);
    dragImage.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  });

  const onDragStart = (e: DragEvent) => {
    isDragging = true;

    const dataTransfer = e.dataTransfer;
    dataTransfer.dropEffect = "none";
    dataTransfer.effectAllowed = "none";
    dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const onDrag = (e: DragEvent) => {
    const x = e.x;

    if (x !== 0) {
      naviWidth = x;
    }
  };

  const onDragOver = (e: DragEvent) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  const onDragEnd = (e: DragEvent) => {
    onDrag(e);
    isDragging = false;
  };
</script>

<div class="layout" on:dragover={onDragOver}>
  <div class="layout__navi" style="width: {naviWidth}px">navi</div>

  <div
    class="layout__drag-area"
    class:layout__drag-area--active={isDragging}
    draggable="true"
    on:dragstart={onDragStart}
    on:drag={onDrag}
    on:dragend={onDragEnd}
  />

  <main class="layout__main">
    <slot />
  </main>
</div>

<style lang="scss">
  .layout {
    display: flex;
    height: 100vh;

    &__navi {
      overflow: hidden;
    }

    &__drag-area {
      border-right: 1px solid #ddd;
      width: 10px;
      height: 100vh;
      cursor: ew-resize;
      background-color: #fff;
      user-select: none;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #eee;
      }

      &--active {
        background-color: #eee;
      }
    }

    &__main {
      flex: 1;
    }
  }
</style>
