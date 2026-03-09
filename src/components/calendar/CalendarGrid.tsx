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
import { arrayMove } from "@dnd-kit/sortable"
import SearchBar from "../search/SearchBar"


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 140px;
  background: #f8fafc;
`

export default function CalendarGrid() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [search, setSearch] = useState("")
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeTask = tasks.find(t => t.id === activeId)
    if (!activeTask) return

    // Dropped on a day cell
    if (over.data.current?.type === "day") {
      const newDate = over.id as string
      setTasks(prev =>
        prev.map(t =>
          t.id === activeId ? { ...t, date: newDate } : t
        )
      )
      return
    }

    // Dropped on another task (same-day reorder)
    if (over.data.current?.type === "task") {
      const sameDayTasks = tasks.filter(t => t.date === activeTask.date)
      const oldIndex = sameDayTasks.findIndex(t => t.id === activeId)
      const newIndex = sameDayTasks.findIndex(t => t.id === overId)

      if (oldIndex === -1 || newIndex === -1) return

      const reordered = arrayMove(sameDayTasks, oldIndex, newIndex)

      const updated = tasks.map(task => {
        const updatedTask = reordered.find(t => t.id === task.id)
        return updatedTask ? updatedTask : task
      })

      setTasks(updated)
    }
  }

  // ✅ Filter tasks by search text
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  const days = generateMonthGrid(currentDate)

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Search bar above the header */}
      <SearchBar value={search} onChange={setSearch} />

      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />

      <Grid>
        {days.map(day => {
          const dayString = format(day.date, "yyyy-MM-dd")
          const dayTasks = filteredTasks.filter(task => task.date === dayString)
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
