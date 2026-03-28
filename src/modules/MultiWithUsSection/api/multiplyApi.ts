import { http } from '@/common/api/http'

import {
  DEFAULT_CATEGORIES,
  FALLBACK_CONTENT,
  labelForId,
  type MultiplyCategory,
  type MultiplyCategoryContent,
  type MultiplyCategoryId,
  titleToCategoryId,
} from '../types/multiWithUs.types'

export type MultiplyApiBlock = {
  title: string
  steps: {
    step_1: string
    step_2: string
  }
}

export async function fetchMultiplyBlocks(): Promise<MultiplyApiBlock[]> {
  const { data } = await http.get<MultiplyApiBlock[]>('/en/multiply')
  return Array.isArray(data) ? data : []
}

export function parseMultiplyBlocks(blocks: MultiplyApiBlock[]): {
  categories: MultiplyCategory[]
  content: Record<MultiplyCategoryId, MultiplyCategoryContent>
} {
  const categories: MultiplyCategory[] = []
  const content: Record<MultiplyCategoryId, MultiplyCategoryContent> = { ...FALLBACK_CONTENT }

  for (const block of blocks) {
    const id = titleToCategoryId(block.title)
    if (!id) continue

    const step1 = block.steps?.step_1?.trim()
    const step2 = block.steps?.step_2?.trim()
    if (!step1 || !step2) continue

    categories.push({ id, label: labelForId(id) })
    content[id] = { lead: step1, highlight: step2 }
  }

  if (categories.length === 0) {
    return { categories: [...DEFAULT_CATEGORIES], content: { ...FALLBACK_CONTENT } }
  }

  return { categories, content }
}
