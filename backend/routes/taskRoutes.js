const express = require("express")
const router = express.Router()

const taskController = require("../controllers/task.controller")
const asyncHandler = require("../utils/asyncHandler")

router.get("/", asyncHandler(taskController.getTasks))

router.post("/", asyncHandler(taskController.createTask))

router.put("/:id", asyncHandler(taskController.updateTask))

module.exports = router