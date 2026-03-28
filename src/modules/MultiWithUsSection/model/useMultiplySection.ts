import { computed, onMounted, ref } from 'vue'

import {
  ctaLabelForId,
  DEFAULT_CATEGORIES,
  FALLBACK_CONTENT,
  type MultiplyCategoryId,
} from './categories'
import { fetchMultiplyBlocks, parseMultiplyBlocks } from './multiplyApi'

export function useMultiplySection() {
  const activeId = ref<MultiplyCategoryId>('media-buyers')
  const categories = ref([...DEFAULT_CATEGORIES])
  const contentById = ref({ ...FALLBACK_CONTENT })
  const loading = ref(true)
  const loadError = ref<unknown>(null)

  const content = computed(
    () => contentById.value[activeId.value] ?? FALLBACK_CONTENT[activeId.value],
  )

  const ctaLabel = computed(() => ctaLabelForId(activeId.value))

  function selectCategory(id: MultiplyCategoryId) {
    activeId.value = id
  }

  async function load() {
    loading.value = true
    loadError.value = null
    try {
      const blocks = await fetchMultiplyBlocks()
      const parsed = parseMultiplyBlocks(blocks)
      categories.value = parsed.categories
      contentById.value = parsed.content

      if (!parsed.categories.some((c) => c.id === activeId.value)) {
        const first = parsed.categories[0]?.id
        if (first) activeId.value = first
      }
    } catch (e) {
      loadError.value = e
      categories.value = [...DEFAULT_CATEGORIES]
      contentById.value = { ...FALLBACK_CONTENT }
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  return {
    activeId,
    categories,
    content,
    ctaLabel,
    selectCategory,
    loading,
    loadError,
    load,
  }
}
