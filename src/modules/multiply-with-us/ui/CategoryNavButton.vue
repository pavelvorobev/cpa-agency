<script setup lang="ts">
defineOptions({
  name: 'CategoryNavButton',
})

withDefaults(
  defineProps<{
    active?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    active: false,
    type: 'button',
  },
)
</script>

<template>
  <button
    class="category-nav-button"
    :class="{ 'category-nav-button--active': active }"
    :type="type"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss" src="../styles/category-nav-button.scss"></style>
