<script lang="ts">
  import "../../node_modules/reseter.css";

  import { onMount } from "svelte";

  const NAVI_WIDTH_KEY = "naviWidth";
  const NAVI_MIN_WIDTH = 200;
  const DRAG_IMAGE =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  let naviWidth = NAVI_MIN_WIDTH;
  let isDragging = false;

  let dragImage: HTMLImageElement;

  onMount(() => {
    dragImage = new Image(0, 0);
    dragImage.src = DRAG_IMAGE;

    const savedNaviWidth = localStorage.getItem(NAVI_WIDTH_KEY);
    naviWidth = Number(savedNaviWidth);
  });

  const getNaviWidht = (x: number): number => {
    return NAVI_MIN_WIDTH >= x ? NAVI_MIN_WIDTH : x;
  };

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
      naviWidth = getNaviWidht(x);
    }
  };

  const onDragOver = (e: DragEvent) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  const onDragEnd = (e: DragEvent) => {
    isDragging = false;

    const x = e.x;
    const naviWidth = getNaviWidht(x);
    localStorage.setItem(NAVI_WIDTH_KEY, String(naviWidth));
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
      width: 10px;
      height: 100vh;
      border-right: 1px solid #ddd;
      background-color: #fff;
      cursor: ew-resize;
      transition: background-color 0.3s ease;

      user-select: none;

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
