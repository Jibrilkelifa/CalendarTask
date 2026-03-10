import { http } from "../../../services/httpClient"
import type { Task } from "../types/taskTypes"

export async function getTasks(): Promise<Task[]> {

  const res = await http.get("/tasks")
  return res.data

}

export async function createTask(task: Task) {

  const res = await http.post("/tasks", task)
  return res.data

}

export async function updateTask(task: Task) {

  const res = await http.put(`/tasks/${task.id}`, task)
  return res.data

}