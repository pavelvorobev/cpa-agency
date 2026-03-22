<script setup lang="ts">
import snakeSrc from '@/app/assets/images/landing/section-4.png'

defineOptions({
  name: 'MultiplyWithUsSnakeFigure',
})
</script>

<template>
  <div class="multiply-snake" aria-hidden="true">
    <img class="multiply-snake__img" :src="snakeSrc" alt="" width="613" height="482" />
  </div>
</template>

<style scoped lang="scss" src="../styles/snake.scss"></style>
