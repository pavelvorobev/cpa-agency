<script setup lang="ts">
defineOptions({
  name: 'SectionHeader',
})
</script>

<template>
  <h2 class="multiply-section-header">
    <slot></slot>
  </h2>
</template>

<style scoped lang="scss">
.multiply-section-header {
  margin: 0;
  font-family: $font-family-base;
  font-size: $fs-40;
  font-weight: $font-weight-bold;
  line-height: 90%;
  text-transform: uppercase;
  color: $color-yellow;
}
</style>
