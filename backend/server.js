const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

let tasks = [] // in-memory storage

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks)
})

// CREATE task
app.post("/tasks", (req, res) => {
  const task = req.body
  tasks.push(task)
  res.json(task)
})

// UPDATE task
app.put("/tasks/:id", (req, res) => {
  const id = req.params.id
  const updated = req.body
  tasks = tasks.map(t => (t.id === id ? updated : t))
  res.json(updated)
})

app.listen(4000, () => {
  console.log("Server running on port 4000")
})
