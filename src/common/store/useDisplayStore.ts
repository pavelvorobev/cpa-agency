import { useWindowSize } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useDisplayStore = defineStore('useDisplayStore', () => {
  const {width, height} = useWindowSize()
  return {
    width,
    height
  }
})