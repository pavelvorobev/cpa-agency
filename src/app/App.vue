<script setup lang="ts">
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
  <h1>CPA AGENCY</h1>
</template>

<style scoped lang="scss">
h1 {
  color: $color-main;
}
</style>
