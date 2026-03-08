const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  order: {
    type: Number,
    default: 0
  }

}, { timestamps: true })

module.exports = mongoose.model("Task", taskSchema)