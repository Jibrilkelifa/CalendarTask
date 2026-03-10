import { useEffect, useState } from "react"
import { getTasks, createTask } from "../api/taskApi"
import type { Task } from "../types/taskTypes"

export function useTasks() {

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {

    loadTasks()

  }, [])

  async function loadTasks() {

    const data = await getTasks()
    setTasks(data)

  }

  async function addTask(title: string, date: string) {

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      date,
      order: 0
    }

    await createTask(newTask)

    setTasks(prev => [...prev, newTask])

  }

  return {
    tasks,
    setTasks,
    addTask
  }

}