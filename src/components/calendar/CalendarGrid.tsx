// src/components/Calendar/CalendarGrid.tsx
import styled from "styled-components"
import { generateMonthGrid } from "../../utils/calendarUtils"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import DayCell from "./DayCell"
import type { Task } from "../../features/tasks/types/taskTypes"
import type { Holiday } from "../../features/holidays/holidayTypes"
import { fetchHolidays } from "../../features/holidays/holidayApi"
import { DndContext } from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 120px;
`

export default function CalendarGrid() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Finish report", date: "2025-03-18", order: 0 },
    { id: "2", title: "Team meeting", date: "2025-03-18", order: 1 }
  ])

  const [holidays, setHolidays] = useState<Holiday[]>([])
  const currentDate = new Date(2025, 11) // March 2025

  useEffect(() => {
    fetchHolidays(currentDate.getFullYear())
      .then(setHolidays)
      .catch(console.error)
  }, [currentDate])

  function addTask(title: string, date: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      date,
      order: 0
    }
    setTasks(prev => [...prev, newTask])
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const taskId = active.id as string
    const newDate = over.id as string

    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, date: newDate } : task
      )
    )
  }

  const days = generateMonthGrid(currentDate)

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Grid>
        {days.map(day => {
          const dayString = format(day.date, "yyyy-MM-dd")
          const dayTasks = tasks.filter(task => task.date === dayString)
          const holiday = holidays.find(h => h.date === dayString)

          return (
            <DayCell
              key={day.date.toISOString()}
              date={day.date}
              isCurrentMonth={day.isCurrentMonth}
              tasks={dayTasks}
              onAddTask={addTask}
              holiday={holiday}
            />
          )
        })}
      </Grid>
    </DndContext>
  )
}
