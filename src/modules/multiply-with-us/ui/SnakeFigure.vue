<script setup lang="ts">
import snakeSrc from '@/app/assets/images/landing/section-4.png'

defineOptions({
  name: 'MultiplyWithUsSnakeFigure',
})
</script>

<template>
  <div class="multiply-snake" aria-hidden="true">
    <img class="multiply-snake__img" :src="snakeSrc" alt="" width="630" height="360" />
  </div>
</template>

<style scoped lang="scss">
.multiply-snake {
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;
}

.multiply-snake__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left bottom;
}
</style>
