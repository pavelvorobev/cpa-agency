import { computed, onBeforeUnmount, onMounted, type Ref, ref } from 'vue'

import {
  buildCubicFramePath,
  buildCubicSurfacePaths,
  createCubicPathScaler,
} from './cubicButtonPaths'

/** Имена CSS-переменных должны совпадать с `CubicButton.vue` -> `<style>` */
const CSS = {
  coordW: '--cubic-svg-coord-w',
  coordH: '--cubic-svg-coord-h',
  frontRightX: '--cubic-front-right-x',
  rightPathMaxX: '--cubic-right-path-max-x',
} as const

function readCoordBox(el: HTMLElement): { w: number; h: number } | null {
  const st = getComputedStyle(el)
  const w = Number.parseFloat(st.getPropertyValue(CSS.coordW))
  const h = Number.parseFloat(st.getPropertyValue(CSS.coordH))
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
    return null
  }
  return { w, h }
}

/**
 * Дополнительный padding-inline-end подписи (px): ширина правого скоса в координатах layout,
 * чтобы текст визуально не заезжал под rightPath.
 */
function readLabelEndPaddingPx(
  el: HTMLElement,
  layoutHeightPx: number,
  coordHeight: number,
): number {
  const st = getComputedStyle(el)
  const x0 = Number.parseFloat(st.getPropertyValue(CSS.frontRightX))
  const x1 = Number.parseFloat(st.getPropertyValue(CSS.rightPathMaxX))
  if (!Number.isFinite(x0) || !Number.isFinite(x1) || x1 <= x0 || coordHeight <= 0) {
    return 0
  }
  const scale = layoutHeightPx / coordHeight
  return Math.ceil((x1 - x0) * scale * 100) / 100
}

/** Снимок для одного кадра SVG (viewBox + path + отступ подписи). */
export interface CubicButtonSvgSnapshot {
  viewBoxWidth: number
  viewBoxHeight: number
  surfacePaths: { front: string; right: string; top: string }
  framePath: string
  /** px: компенсация ширины правого края кнопки для подписи */
  labelPaddingInlineEndPx: number
}

/**
 * Синхронизирует размеры DOM с SVG viewBox и пересчитывает path’ы.
 */
export function useCubicButtonLayout(rootRef: Ref<HTMLElement | null | undefined>) {
  const layoutWidth = ref(1)
  const layoutHeight = ref(1)
  const coordBox = ref<{ w: number; h: number } | null>(null)

  function syncFromDom() {
    const el = rootRef.value
    if (!el) {
      return
    }

    coordBox.value = readCoordBox(el)

    const rect = el.getBoundingClientRect()
    layoutWidth.value = Math.max(1, Math.ceil(rect.width))
    layoutHeight.value = Math.max(1, Math.ceil(rect.height))
  }

  let observer: ResizeObserver | null = null

  onMounted(() => {
    const el = rootRef.value
    if (!el) {
      return
    }

    observer = new ResizeObserver(() => {
      syncFromDom()
    })
    observer.observe(el)
    requestAnimationFrame(syncFromDom)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  const svg = computed((): CubicButtonSvgSnapshot | null => {
    const box = coordBox.value
    if (!box) {
      return null
    }

    const scaler = createCubicPathScaler(layoutHeight.value, box.h, layoutWidth.value, box.w)
    if (!scaler) {
      return null
    }

    const surfaces = buildCubicSurfacePaths(scaler)
    const framePath = buildCubicFramePath(scaler, surfaces)

    const el = rootRef.value
    const labelPaddingInlineEndPx =
      el != null ? readLabelEndPaddingPx(el, layoutHeight.value, box.h) : 0

    return {
      viewBoxWidth: layoutWidth.value,
      viewBoxHeight: layoutHeight.value,
      surfacePaths: surfaces,
      framePath,
      labelPaddingInlineEndPx,
    }
  })

  return { svg }
}
