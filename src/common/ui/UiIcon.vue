<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    color?: string
    size?: number | string
    width?: number | string
    height?: number | string
    fit?: boolean
  }>(),
  {
    size: 20,
    fit: false,
  },
)

const iconStyle = computed(() => {
  const fill = props.color ?? 'currentColor'
  if (props.fit) {
    return {
      width: '100%',
      height: 'auto',
      maxHeight: '100%',
      display: 'block',
      flexShrink: '0',
      fill,
    } as Record<string, string>
  }
  const w = props.width ?? props.size
  const h = props.height ?? props.size
  return {
    width: `${w}rem`,
    height: `${h}rem`,
    display: 'block',
    fill,
  }
})
</script>

<template>
  <svg aria-hidden="true" preserveAspectRatio="xMidYMid meet" :style="iconStyle">
    <use :href="`#icon-${name}`" />
  </svg>
</template>
