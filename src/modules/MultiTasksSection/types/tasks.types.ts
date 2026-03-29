export interface TaskTile {
  title: string
  text: string
}

export interface TaskSection {
  description: string
  tiles: TaskTile[]
}
