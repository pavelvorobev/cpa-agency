<script setup lang="ts">
import snakeSrc from '@/app/assets/images/landing/section-4.png'

defineOptions({
  name: 'MultiWithUsSnakeFigure',
})
</script>

<template>
  <div class="multi-with-us-snake" aria-hidden="true">
    <img class="multi-with-us-snake__img" :src="snakeSrc" alt="" width="613" height="482" />
  </div>
</template>

<style scoped lang="scss">
.multi-with-us-snake {
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;
}

.multi-with-us-snake__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left bottom;
}
</style>
