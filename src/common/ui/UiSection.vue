<script setup lang="ts"></script>

<template>
  <section class="ui-section">
    <slot />
  </section>
</template>

<style lang="scss" scoped>
.ui-section {
  min-height: 100dvh;
  max-height: 100dvh;
  padding: 30rem 0 62rem 0;

  @media (max-height: 899px) {
    padding: 10rem 0 14rem 0;
  }
}
</style>
