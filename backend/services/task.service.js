const taskRepository = require("../repositories/task.repository")

exports.getTasks = async () => {

  return await taskRepository.findAll()

}

exports.createTask = async (taskData) => {

  return await taskRepository.create(taskData)

}

exports.updateTask = async (id, data) => {

  return await taskRepository.update(id, data)

}