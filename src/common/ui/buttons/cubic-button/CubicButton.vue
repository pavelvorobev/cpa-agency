<!--
  Изометрическая «кубическая» кнопка.

  - Визуал: SVG под текстом; размеры и цвета задаются в <style> (fs(), переменные темы).
  - Геометрия: при изменении ширины/высоты кнопки path пересчитывается так, чтобы
    правый скос растягивался (см. cubicButtonPaths.ts + useCubicButtonLayout.ts в этой папке).
-->
<script setup lang="ts">
import { computed, ref } from 'vue'

import { useCubicButtonLayout } from './useCubicButtonLayout'

defineOptions({
  name: 'CubicButton',
})

export type CubicButtonSize = 'md' | 'sm'

const props = withDefaults(
  defineProps<{
    /** `md` — основной макет, `sm` — компактный */
    size?: CubicButtonSize
  }>(),
  { size: 'md' },
)

const rootRef = ref<HTMLButtonElement | null>(null)
const { svg } = useCubicButtonLayout(rootRef)

const sizeClass = computed(() => `cubic-button--${props.size}`)
</script>

<template>
  <button ref="rootRef" type="button" class="cubic-button" :class="sizeClass">
    <!-- Декоративный фон: не влияет на доступность текста кнопки -->
    <svg
      v-if="svg"
      class="cubic-button__shape"
      width="100%"
      height="100%"
      :viewBox="`0 0 ${svg.viewBoxWidth} ${svg.viewBoxHeight}`"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="var(--cubic-surface)" :d="svg.surfacePaths.front" />
      <path fill="var(--cubic-surface)" :d="svg.surfacePaths.right" />
      <path fill="var(--cubic-surface)" :d="svg.surfacePaths.top" />
      <path fill="var(--cubic-frame)" fill-rule="evenodd" clip-rule="evenodd" :d="svg.framePath" />
    </svg>

    <!-- Контент поверх frontPath; padding-inline-end компенсирует rightPath -->
    <span class="cubic-button__front">
      <span
        class="cubic-button__label"
        :style="{ paddingInlineEnd: `${svg?.labelPaddingInlineEndPx ?? 0}px` }"
      >
        <slot />
      </span>
    </span>
  </button>
</template>

<style lang="scss" scoped>
/* -------------------------------------------------------------------------- */
/* Токены: дизайн-пространство path (должно совпадать с cubicButtonPaths.ts)    */
/* -------------------------------------------------------------------------- */
.cubic-button {
  --cubic-svg-coord-w: 283;
  --cubic-svg-coord-h: 85;
  --cubic-front-right-x: 270.451;
  --cubic-right-path-max-x: 280;

  --cubic-surface: #{$color-yellow};
  --cubic-frame: #{$color-secondary};
  --cubic-label: #{$color-secondary};

  --cubic-inset-top: #{fs(5.5)};
  --cubic-inset-right: #{fs(6.5)};
  --cubic-inset-bottom: #{fs(1)};
  --cubic-inset-left: #{fs(1.5)};
  --cubic-inline-pad: #{fs(10)};

  position: relative;
  display: inline-flex;
  align-items: stretch;
  box-sizing: border-box;
  width: fit-content;
  max-width: 100%;
  height: auto;
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    --cubic-surface: #{$color-secondary};
    --cubic-frame: #{$color-yellow};
    --cubic-label: #{$color-yellow};
  }
}

/* -------------------------------------------------------------------------- */
/* Модификаторы размера (макет @ 1440: корень 1rem ≈ 2px → fs(N) ≈ N px)      */
/* -------------------------------------------------------------------------- */
.cubic-button--md {
  --cubic-text-pad: #{fs(20)};
  --cubic-inset-left: #{fs(6.5)};
  --cubic-inset-right: #{fs(6.5)};
  min-width: #{fs(280)};
  min-height: #{fs(82)};
}

.cubic-button--sm {
  --cubic-inset-top: #{fs(4)};
  --cubic-inset-right: #{fs(6)};
  --cubic-inset-bottom: #{fs(1)};
  --cubic-inset-left: #{fs(6)};
  --cubic-inline-pad: #{fs(7)};
  --cubic-text-pad: #{fs(15)};
  min-width: #{fs(200)};
  min-height: #{fs(60)};
}

/* -------------------------------------------------------------------------- */
/* Слои                                                                       */
/* -------------------------------------------------------------------------- */
.cubic-button__shape {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;

  path {
    transition: fill 0.2s ease;
  }
}

.cubic-button__front {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex: 1 1 auto;
  align-self: stretch;
  width: 100%;
  min-width: 0;
  min-height: calc(100% - var(--cubic-inset-top) - var(--cubic-inset-bottom));
  margin: var(--cubic-inset-top) var(--cubic-inset-right) var(--cubic-inset-bottom)
    var(--cubic-inset-left);
  padding: 0 var(--cubic-inline-pad);
  pointer-events: none;
}

.cubic-button--md .cubic-button__front,
.cubic-button--sm .cubic-button__front {
  padding: var(--cubic-text-pad);
}

.cubic-button__label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
  text-align: center;
  text-wrap: balance;
  word-break: break-word;
  hyphens: auto;
  transition: color 0.2s ease;
}

.cubic-button--md .cubic-button__label {
  font-size: $fs-24;
  line-height: normal;
  font-weight: $font-weight-semibold;
  color: var(--cubic-label);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.cubic-button--sm .cubic-button__label {
  font-size: #{fs(18)};
  line-height: normal;
  font-weight: $font-weight-bold;
  color: var(--cubic-label);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
</style>
