const express = require("express")
const cors = require("cors")

const taskRoutes = require("./routes/taskRoutes")
const errorMiddleware = require("./middlewares/error.middleware")

const app = express()

app.use(cors({ origin: "*" }))

app.use(express.json())

app.use("/tasks", taskRoutes)

app.use(errorMiddleware)

module.exports = app