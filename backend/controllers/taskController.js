const Task = require("../models/Task")

exports.getTasks = async (req, res) => {

  const tasks = await Task.find()

  res.json(tasks)
}

exports.createTask = async (req, res) => {

  const task = new Task(req.body)

  await task.save()

  res.json(task)
}

exports.updateTask = async (req, res) => {

  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.json(updated)
}