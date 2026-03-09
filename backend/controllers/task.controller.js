const taskService = require("../services/task.service")
const TaskDTO = require("../dtos/task.dto")

exports.getTasks = async (req, res) => {

  const tasks = await taskService.getTasks()

  res.json(tasks.map(t => new TaskDTO(t)))

}

exports.createTask = async (req, res) => {

  const task = await taskService.createTask(req.body)

  res.status(201).json(new TaskDTO(task))

}

exports.updateTask = async (req, res) => {

  const updated = await taskService.updateTask(req.params.id, req.body)

  res.json(new TaskDTO(updated))

}