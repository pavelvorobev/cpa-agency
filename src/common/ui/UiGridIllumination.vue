<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'

import gridRaw from '@/app/assets/icons/bg-grid.svg?raw'

defineOptions({
  name: 'UiGridIllumination',
})

/** Размер эллипса как % полуосей от viewBox (1463×1313) */
const SPOT_SIZES = {
  /** Узкое пятно — акцент */
  sm: { rx: '9%', ry: '6%' },
  /** Среднее пятно — баланс */
  md: { rx: '20%', ry: '14%' },
  /** Широкий разлив — мягкий свет */
  lg: { rx: '42%', ry: '30%' },
} as const

export type SpotSize = keyof typeof SPOT_SIZES

/** Точки маршрута [x%, y%]. Расстояние между соседними ≥ 43% диагонали. */
const WAYPOINTS: [number, number][] = [
  [18, 22],
  [82, 75],
  [20, 80],
  [80, 16],
  [18, 55],
  [75, 82],
  [58, 18],
]

const props = withDefaults(
  defineProps<{
    /** Размер пятна: sm — узкое, md — среднее, lg — широкое */
    spotSize?: SpotSize
    /**
     * Длительность одного перехода между точками, мс.
     * Меньше — быстрее. Рекомендуется 1000…4000.
     * @default 2200
     */
    durationMs?: number
    /**
     * Минимальная пауза перед каждым переходом, мс.
     * Пятно будет стоять на месте не меньше этого времени.
     * @default 600
     */
    pauseMinMs?: number
    /**
     * Максимальная пауза перед каждым переходом, мс.
     * Конкретное значение выбирается случайно при монтировании.
     * @default 1400
     */
    pauseMaxMs?: number
    /**
     * Характер движения: любое значение animation-timing-function.
     * Например: 'linear' | 'ease' | 'ease-in-out' | 'cubic-bezier(0.4, 0, 0.2, 1)'
     * @default 'ease-in-out'
     */
    easing?: string
  }>(),
  {
    spotSize: 'md',
    durationMs: 2200,
    pauseMinMs: 600,
    pauseMaxMs: 1400,
    easing: 'ease-in-out',
  },
)

const VB_W = 1463
const VB_H = 1313

// Уникальное имя анимации для изоляции экземпляров компонента
const uid = Math.random().toString(36).slice(2, 8)
const animName = `spot-${uid}`
const animClass = `ugi-${uid}`

let styleEl: HTMLStyleElement | null = null

function buildCSS(): string {
  const segMs = Math.max(50, props.durationMs)
  const minP = Math.max(0, props.pauseMinMs)
  const maxP = Math.max(minP, props.pauseMaxMs)
  const pauseMs = minP + Math.random() * (maxP - minP)

  const n = WAYPOINTS.length
  const total = n * (segMs + pauseMs)
  const pct = (ms: number) => ((ms / total) * 100).toFixed(3)

  let kf = `@keyframes ${animName} {\n`
  for (let i = 0; i < n; i++) {
    const [x, y] = WAYPOINTS[i]
    const arriveMs = i * (segMs + pauseMs)
    const departMs = arriveMs + pauseMs
    kf += `  ${pct(arriveMs)}% { --spot-x: ${x}%; --spot-y: ${y}%; }\n`
    if (pauseMs > 0) {
      kf += `  ${pct(departMs)}% { --spot-x: ${x}%; --spot-y: ${y}%; }\n`
    }
  }
  kf += `  100% { --spot-x: ${WAYPOINTS[0][0]}%; --spot-y: ${WAYPOINTS[0][1]}%; }\n}`

  const totalSec = (total / 1000).toFixed(3)
  return [
    kf,
    `@media (prefers-reduced-motion: no-preference) {`,
    `  .${animClass} { animation: ${animName} ${totalSec}s ${props.easing} infinite; }`,
    `}`,
  ].join('\n')
}

function injectStyle() {
  if (!styleEl) {
    styleEl = document.createElement('style')
    document.head.appendChild(styleEl)
  }
  styleEl.textContent = buildCSS()
}

onMounted(injectStyle)
onUnmounted(() => {
  styleEl?.remove()
  styleEl = null
})
watch(() => [props.durationMs, props.pauseMinMs, props.pauseMaxMs, props.easing], injectStyle)

const gridInnerBright = computed(() =>
  gridRaw
    .replace(/<\?xml[^?]*\?>/gi, '')
    .replace(/<svg\b[^>]*>/i, '')
    .replace(/<\/svg>\s*$/i, '')
    .replace(/\sstroke="[^"]*"/gi, '')
    .trim(),
)

const cssVars = computed(() => ({
  '--spot-rx': SPOT_SIZES[props.spotSize].rx,
  '--spot-ry': SPOT_SIZES[props.spotSize].ry,
}))
</script>

<template>
  <svg
    class="ui-grid-illumination"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${VB_W} ${VB_H}`"
    :style="cssVars"
    preserveAspectRatio="xMidYMid slice"
    width="100%"
    height="100%"
    aria-hidden="true"
  >
    <g :class="['ui-grid-illumination__lit', animClass]" v-html="gridInnerBright" />
  </svg>
</template>

<style scoped lang="scss">
/*
 * @property регистрирует тип — без этого браузер не знает что --spot-x это <percentage>
 * и не интерполирует её между кадрами @keyframes.
 * Vue передаёт @property без скоупинга (как и должно быть: регистрация глобальная).
 */
@property --spot-x {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 18%;
}

@property --spot-y {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 22%;
}

.ui-grid-illumination {
  display: block;
}

.ui-grid-illumination__lit {
  $gradient: radial-gradient(
    ellipse var(--spot-rx, 20%) var(--spot-ry, 14%) at var(--spot-x) var(--spot-y),
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.55) 20%,
    rgba(255, 255, 255, 0.28) 44%,
    rgba(255, 255, 255, 0.08) 60%,
    rgba(255, 255, 255, 0) 76%
  );

  mask-image: $gradient;
  -webkit-mask-image: $gradient;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  mask-position: 0 0;
  -webkit-mask-position: 0 0;
}

.ui-grid-illumination__lit :deep(path) {
  stroke: #ffffff !important;
  stroke-width: 2px;
  stroke-miterlimit: 10;
  fill: none;
}
</style>
