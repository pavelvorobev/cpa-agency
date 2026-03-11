<script setup lang="ts">
import Header from './ui/layout-parts/Header.vue';
import { http } from '@/common/api/http'
import { onMounted } from 'vue'

onMounted(async () => {
  try {
    const { data } = await http.get('/en/multiply')

    console.log(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<template>
  <Header />
</template>

<style scoped lang="scss">
h1 {
  font-size: 40rem;
  color: $color-main;
}
</style>
