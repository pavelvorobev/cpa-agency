<script setup lang="ts">
defineOptions({
  name: 'ScrollToTop',
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <button type="button" v-bind="$attrs" @click="scrollToTop">
    <slot />
  </button>
</template>
