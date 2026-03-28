<script setup lang="ts">
defineOptions({
  name: 'Hero',
})
</script>

<template>
  <section class="hero" aria-label="Hero" />
</template>

<style scoped lang="scss">
.hero {
  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  height: 100dvh;
  max-height: 100dvh;
}
</style>
