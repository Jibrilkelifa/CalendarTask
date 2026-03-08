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
import { getTasks, createTask, updateTask } from "../../features/tasks/taskApi"
import { addMonths, subMonths } from "date-fns"
import CalendarHeader from "./CalendarHeader"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 120px;
`

export default function CalendarGrid() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())

  const [holidays, setHolidays] = useState<Holiday[]>([])

useEffect(() => {
  getTasks().then(setTasks)
}, [])

useEffect(() => {
  fetchHolidays(currentDate.getFullYear())
    .then(setHolidays)
    .catch(console.error)
}, [currentDate])

function nextMonth() {
  setCurrentDate(prev => addMonths(prev, 1))
}

function prevMonth() {
  setCurrentDate(prev => subMonths(prev, 1))
}

  async function addTask(title: string, date: string) {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    date,
    order: 0
  }
  await createTask(newTask)
  setTasks(prev => [...prev, newTask])
}


async function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event
  if (!over) return

  const taskId = active.id as string
  const newDate = over.id as string

  const task = tasks.find(t => t.id === taskId)
  if (!task) return

  const updated = { ...task, date: newDate }
  await updateTask(updated)

  setTasks(prev =>
    prev.map(t => (t.id === taskId ? updated : t))
  )
}


  const days = generateMonthGrid(currentDate)

  return (
  <DndContext onDragEnd={handleDragEnd}>
    <CalendarHeader
      currentDate={currentDate}
      onPrevMonth={prevMonth}
      onNextMonth={nextMonth}
    />

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
