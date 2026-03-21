<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    color?: string
    size?: number | string // number value in rem
    width?: number | string // number value in rem
    height?: number | string // number value in rem
    /** Заполняет родителя; ширину/высоту задаёт CSS снаружи */
    fit?: boolean
  }>(),
  {
    size: 20,
    fit: false,
  },
)

const svgStyle = computed(() => {
  const fill = props.color ?? 'currentColor'
  if (props.fit) {
    return {
      display: 'block',
      width: '100%',
      height: '100%',
      fill,
    }
  }
  return {
    width: `${props.width ?? props.size}rem`,
    height: `${props.height ?? props.size}rem`,
    fill,
  }
})
</script>

<template>
  <svg aria-hidden="true" :style="svgStyle">
    <use :href="`#icon-${name}`" />
  </svg>
</template>
