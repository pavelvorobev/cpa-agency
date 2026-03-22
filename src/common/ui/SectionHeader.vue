<script setup lang="ts">
defineOptions({
  name: 'SectionHeader',
  inheritAttrs: false,
})
</script>

<template>
  <h2 class="multiply-section-header" v-bind="$attrs">
    <slot />
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

@media (min-width: 901px) {
  .multiply-section-header {
    box-sizing: border-box;
    width: fit-content;
    max-width: 100%;
    margin-inline-start: auto;
    margin-inline-end: 0;
    text-align: right;
  }
}

@media (max-width: 900px) {
  .multiply-section-header {
    font-size: 20px;
    text-align: center;
  }
}
</style>
