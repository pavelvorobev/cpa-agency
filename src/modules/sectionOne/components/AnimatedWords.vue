<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

  interface Props {
    words: string[]
    height: string // in rem
  }

  const props = defineProps<Props>()

  const otherWords = ref<string[]>([])
  const activeWord = ref<number>(1)
  const timeout = ref<ReturnType<typeof setInterval> | null>(null)

  onMounted(() => {
    otherWords.value = props.words.slice(1)

    if (props.words.length > 1) {
      timeout.value = setInterval(() => {
        if (activeWord.value >= props.words.length) {
          activeWord.value = 1
        } else {
          activeWord.value++
        }
      }, 1500)
    }
  })

  onBeforeUnmount(() => {
    if (timeout.value) {
      clearInterval(timeout.value)
    }
  })
</script>

<template>
  <span class="animated-words" :style="[{height: `${height}`}, `--active-word: ${activeWord}`]">
    <span class="animated-word">{{ words[0] ?? '' }}</span>
    <span v-for="word in otherWords" :key="word"  class="animated-word">{{ word }}</span>
  </span>
</template>

<style scoped lang="scss">
  .animated-words {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    flex-direction: column;
  }

  .animated-word {
    transition: transform .2s;
    will-change: transform;
    transform: translateY(calc(100% - var(--active-word) * 100%));
  }
</style>
