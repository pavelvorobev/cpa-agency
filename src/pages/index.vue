<script setup lang="ts">
import { http } from '@/common/api/http'
import { SectionOne } from '@/modules/sectionOne'
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
  <SectionOne />
</template>

<style scoped lang="scss"></style>
