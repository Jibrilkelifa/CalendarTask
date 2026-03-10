const express = require("express")
const cors = require("cors")

const taskRoutes = require("./routes/taskRoutes")
const errorMiddleware = require("./middlewares/error.middleware")

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",                 
    "https://calendar-task-seven.vercel.app" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.use(express.json())

app.use("/tasks", taskRoutes)

app.use(errorMiddleware)

module.exports = app