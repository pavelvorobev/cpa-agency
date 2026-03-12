<script setup lang="ts">

interface Props {
  name: string
  color?: string
  size?: number | string // number value in rem
  width?: number | string // number value in rem
  height?: number | string // number value in rem
}

const {
  size = 20
} = defineProps<Props>()
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
    <use :href="`#icon-${name}`" />
  </svg>
</template>

