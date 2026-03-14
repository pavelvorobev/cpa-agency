<script setup lang="ts">
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
  <h1>Home Page</h1>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 20rem;
  color: $color-main;
}
</style>
