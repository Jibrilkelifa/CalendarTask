import axios from "axios"
import type { Task } from "./types/taskTypes"

const API = "http://localhost:4000/tasks"

export async function getTasks(): Promise<Task[]> {
  const res = await axios.get(API)
  return res.data
}

export async function createTask(task: Task) {
  await axios.post(API, task)
}

export async function updateTask(task: Task) {
  await axios.put(`${API}/${task.id}`, task)
}
