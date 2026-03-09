const Task = require("../models/task.model")

exports.findAll = () => {
  return Task.find().sort({ date: 1, order: 1 })
}

exports.create = (taskData) => {
  const task = new Task(taskData)
  return task.save()
}

exports.update = (id, data) => {
  return Task.findByIdAndUpdate(id, data, { new: true })
}