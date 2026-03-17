import { computed, onBeforeUnmount, onMounted, ref } from "vue";
const windowWidth = ref<number>(0)

export const useDisplay = () => {
  return {
    width: windowWidth,
    isTablet: computed(() => windowWidth.value > 768 && windowWidth.value <= 1280),
    isMobile: computed(() => windowWidth.value < 768)
  }
}

export const initDisplay = () => {
  const updateWindowWidth = () => {
    if (typeof window === "undefined") return
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    updateWindowWidth()
    window.addEventListener("resize", updateWindowWidth, { passive: true })
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener("resize", updateWindowWidth)
  })
}