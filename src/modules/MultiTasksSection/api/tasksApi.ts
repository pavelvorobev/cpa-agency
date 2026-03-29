import type { TaskSection } from '../types/tasks.types'
import { http } from '@/common/api/http'

export async function fetchTasks(): Promise<TaskSection | null> {
  try {
    const { data } = await http.get('/en/tasks')
    return data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return null
  }
}
