import type { ITasksSection } from '../types/tasks.types'
import { http } from '@/common/api/http'

export async function fetchTasks(): Promise<ITasksSection | null> {
  try {
    const { data } = await http.get('/en/tasks')
    return data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return null
  }
}
