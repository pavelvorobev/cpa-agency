<script setup lang="ts">
import Header from '@/app/ui/layout-parts/Header.vue'
import { http } from '@/common/api/http'
import { onMounted } from 'vue'

defineOptions({
  name: 'HomePage',
})

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

<style lang="scss" scoped>
h1 {
  font-size: 20rem;
  color: $color-main;
}
</style>
