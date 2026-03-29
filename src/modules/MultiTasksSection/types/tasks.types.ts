export interface ITaskTile {
  title: string
  text: string
}

export interface ITasksSection {
  description: string
  tiles: ITaskTile[]
}
