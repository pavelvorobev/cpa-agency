<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

import gridRaw from '@/app/assets/icons/bg-grid.svg?raw'

defineOptions({
  name: 'UiGridIllumination',
})

const SPOT_SIZES = {
  sm: { rx: '9%', ry: '6%' },
  md: { rx: '20%', ry: '14%' },
  lg: { rx: '42%', ry: '30%' },
}

type SpotSize = keyof typeof SPOT_SIZES

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
    /** Размер эллипса: sm — узкое, md — среднее, lg — широкое */
    spotSize?: SpotSize
    /** Прозрачность эллипса (0.1 … 1) */
    spotOpacity?: number
    /**
     * Длительность между точками, мс.
     */
    durationMs?: number
    /**
     * Минимальная пауза между переходами, мс.
     */
    pauseMinMs?: number
    /**
     * Максимальная пауза между переходами, мс.
     */
    pauseMaxMs?: number
    /**
     * Характер движения (animation-timing-function)
     * Пример: 'linear' | 'ease' | 'ease-in-out' | 'cubic-bezier(0.4, 0, 0.2, 1)'
     */
    easing?: string
  }>(),
  {
    spotSize: 'md',
    spotOpacity: 1,
    durationMs: 2200,
    pauseMinMs: 600,
    pauseMaxMs: 1400,
    easing: 'ease-in-out',
  },
)

const VB_W = 1463
const VB_H = 1313

const [INIT_X, INIT_Y] = WAYPOINTS[0]!

const spotX = ref(INIT_X)
const spotY = ref(INIT_Y)
const waypointIndex = ref(0)

const prefersReducedMotion = ref(false)
let pauseTimer: ReturnType<typeof setTimeout> | null = null
let transitionFallbackTimer: ReturnType<typeof setTimeout> | null = null

const spotXStr = computed(() => `${spotX.value}%`)
const spotYStr = computed(() => `${spotY.value}%`)
const durationCss = computed(() => `${Math.max(50, props.durationMs)}ms`)

const cssVars = computed(() => ({
  '--spot-rx': SPOT_SIZES[props.spotSize].rx,
  '--spot-ry': SPOT_SIZES[props.spotSize].ry,
}))

const gridInnerBright = computed(() =>
  gridRaw
    .replace(/<\?xml[^?]*\?>/gi, '')
    .replace(/<svg\b[^>]*>/i, '')
    .replace(/<\/svg>\s*$/i, '')
    .replace(/\sstroke="[^"]*"/gi, '')
    .trim(),
)

function randomPauseMs() {
  const minP = Math.max(0, props.pauseMinMs)
  const maxP = Math.max(minP, props.pauseMaxMs)
  return minP + Math.random() * (maxP - minP)
}

function clearPauseTimer() {
  if (pauseTimer !== null) {
    clearTimeout(pauseTimer)
    pauseTimer = null
  }
}

function clearTransitionFallback() {
  if (transitionFallbackTimer !== null) {
    clearTimeout(transitionFallbackTimer)
    transitionFallbackTimer = null
  }
}

function schedulePause() {
  clearPauseTimer()
  if (prefersReducedMotion.value) return
  pauseTimer = setTimeout(() => {
    pauseTimer = null
    const next = (waypointIndex.value + 1) % WAYPOINTS.length
    waypointIndex.value = next
    const wp = WAYPOINTS[next]
    if (!wp) return
    const [x, y] = wp
    clearTransitionFallback()
    const moveMs = Math.max(50, props.durationMs)
    transitionFallbackTimer = setTimeout(() => {
      transitionFallbackTimer = null
      schedulePause()
    }, moveMs + 100)
    spotX.value = x
    spotY.value = y
  }, randomPauseMs())
}

function onSpotTransitionEnd(ev: TransitionEvent) {
  if (ev.propertyName !== '--spot-x') return
  clearTransitionFallback()
  schedulePause()
}

function restartMotionState() {
  clearPauseTimer()
  clearTransitionFallback()
  waypointIndex.value = 0
  const start = WAYPOINTS[0]
  if (!start) return
  spotX.value = start[0]
  spotY.value = start[1]
  if (!prefersReducedMotion.value) schedulePause()
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!prefersReducedMotion.value) schedulePause()
})

onUnmounted(() => {
  clearPauseTimer()
  clearTransitionFallback()
})

watch(
  () => [props.durationMs, props.pauseMinMs, props.pauseMaxMs, props.easing],
  restartMotionState,
)
</script>

<template>
  <div class="ui-grid-illumination">
    <div
      class="ui-grid-illumination__mask-wrap"
      :style="cssVars"
      @transitionend="onSpotTransitionEnd"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="`0 0 ${VB_W} ${VB_H}`"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <g class="ui-grid-illumination__lit" v-html="gridInnerBright" />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(to bottom right, #dc8400 0%, #560080 56%, #220032 100%);

  &__mask-wrap {
    width: 100%;
    height: 100%;
    transform: translateZ(0);

    --spot-x: v-bind(spotXStr);
    --spot-y: v-bind(spotYStr);
    transition:
      --spot-x v-bind(durationCss) v-bind(easing),
      --spot-y v-bind(durationCss) v-bind(easing);

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
    mask-type: alpha;
    -webkit-mask-type: alpha;
  }

  svg {
    opacity: v-bind(spotOpacity);
    display: block;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-grid-illumination__mask-wrap {
    transition: none;
  }
}

.ui-grid-illumination__lit :deep(path) {
  stroke: #ffffff !important;
  stroke-width: 2px;
  stroke-miterlimit: 10;
  fill: none;
}
</style>
