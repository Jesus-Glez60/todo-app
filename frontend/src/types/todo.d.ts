export interface ITodos {
 readonly id: number
 title: string
 description: string
 pending: boolean
 location: string
 estimatedTime: Date
 notification: string
 icon: string
 readonly createdAt: Date
 readonly updatedAt: Date
}

export interface IUpdateTodo {
 title: string
 description?: string
 location: string
 estimatedTime: Date
 notification: string
 icon: string
}
