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

<style scoped lang="scss">
@use '@/app/assets/styles/variables.scss' as vars;

h1 {
  color: vars.$color-yellow;

  // При желании переопределить дефолтные значения тэгов аля h1 и тд
  //@include vars.text-style(
  //    vars.$typo-h1-size,
  //    vars.$typo-h1-line-height,
  //    vars.$typo-h1-weight,
  //    vars.$typo-h1-letter-spacing
  //);

  // или передавать значение шрифта напрямую
  //font-size: vars.fs(14);
  //font-weight: vars.vars.$font-weight-bold;
  //line-height: vars.tracking-in-px(-2) / vars.tracking-in-percent(10)
}
</style>
