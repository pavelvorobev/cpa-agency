import type { IBenefitsSection } from '../types/benefits.types'
import { http } from '@/common/api/http'

export async function fetchBenefits(): Promise<IBenefitsSection | null> {
  try {
    const { data } = await http.get('/en/benefits')
    return data
  } catch (error) {
    console.error('Error fetching benefits:', error)
    return null
  }
}
