<script setup lang="ts">

interface Props {
  name: string
  color?: string
  size?: number | string // number value in rem
  width?: number | string // number value in rem
  height?: number | string // number value in rem
}

const props = withDefaults(defineProps<Props>(), {
  size: 20,
  width: undefined,
  height: undefined,
  color: undefined,
})
</script>

<template>
  <svg 
    aria-hidden="true"
    :style="{
      width: `${width ?? size}rem`,
      height: `${height ?? size}rem`,
      fill: color ?? 'currentColor'
    }"
  >
    <use :href="`#icon-${props.name}`" />
  </svg>
</template>

