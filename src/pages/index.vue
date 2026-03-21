<script setup lang="ts">
import { http } from '@/common/api/http'
import { CubicButton, UiContainer } from '@/common/ui'
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
  <UiContainer>
    <h1 class="heading-1 homepage-heading">Home Page</h1>
    <CubicButton size="md">Get</CubicButton>
  </UiContainer>
</template>

<style scoped lang="scss"></style>
