class TaskDTO {

  constructor(task) {

    this.id = task._id
    this.title = task.title
    this.date = task.date
    this.order = task.order

  }

}

module.exports = TaskDTO