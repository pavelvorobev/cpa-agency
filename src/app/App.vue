<script setup lang="ts">
import { http } from '@/common/api/http'
import { onMounted } from 'vue'

onMounted(async () => {
  const response = await http.fetchFull({
    method: 'GET',
    url: '/en/multiply',
  })

  console.log(response)
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
