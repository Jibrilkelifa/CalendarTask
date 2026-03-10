import styled from "styled-components"
import { generateMonthGrid } from "../../utils/calendarUtils"
import { format } from "date-fns"
import DayCell from "./DayCell"

import { DndContext } from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"

import { arrayMove } from "@dnd-kit/sortable"

import type { Task } from "../../features/tasks/types/taskTypes"
import type { Holiday } from "../../features/holidays/types/holidayTypes"
import { updateTask } from "../../features/tasks/api/taskApi"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 150px;
  border-top: 1px solid #d6d6d6;
  border-left: 1px solid #d6d6d6;

  @media (max-width: 900px) {
    grid-auto-rows: 120px;
  }

  @media (max-width: 600px) {
    grid-auto-rows: 100px;
  }
`

type Props = {
  currentDate: Date
  tasks: Task[]
  holidays: Holiday[]
  onAddTask: (title: string, date: string) => void
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function CalendarGrid({
  currentDate,
  tasks,
  holidays,
  onAddTask,
  setTasks
}: Props) {

  const days = generateMonthGrid(currentDate)

  const tasksByDate = tasks.reduce((acc, task) => {
    if (!acc[task.date]) acc[task.date] = []
    acc[task.date].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  function handleDragEnd(event: DragEndEvent) {

    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeTask = tasks.find(t => t.id === activeId)
    if (!activeTask) return

    // Move task to another day
    if (over.data.current?.type === "day") {

      const newDate = overId

      setTasks(prev =>
        prev.map(t =>
          t.id === activeId ? { ...t, date: newDate } : t
        )
      )

      updateTask({
        ...activeTask,
        date: newDate
      })

      return
    }

    // Reorder inside same day
    if (over.data.current?.type === "task") {

      const sameDayTasks = tasks.filter(t => t.date === activeTask.date)

      const oldIndex = sameDayTasks.findIndex(t => t.id === activeId)
      const newIndex = sameDayTasks.findIndex(t => t.id === overId)

      if (oldIndex === -1 || newIndex === -1) return

      const reordered = arrayMove(sameDayTasks, oldIndex, newIndex)

      const updated = tasks.map(task => {
        const reorderedTask = reordered.find(t => t.id === task.id)
        if (reorderedTask) {
          return {
            ...reorderedTask,
            order: reordered.indexOf(reorderedTask)
          }
        }
        return task
      })

      setTasks(updated)

      reordered.forEach((task, index) => {
        updateTask({ ...task, order: index })
      })
    }
  }

  return (

    <DndContext onDragEnd={handleDragEnd}>

      <Grid>

        {days.map(day => {

          const dayString = format(day.date, "yyyy-MM-dd")

          const dayTasks = tasksByDate[dayString] || []

          const holiday = holidays.find(h => h.date === dayString)

          return (
            <DayCell
              key={day.date.toISOString()}
              date={day.date}
              isCurrentMonth={day.isCurrentMonth}
              tasks={dayTasks}
              onAddTask={onAddTask}
              holiday={holiday}
            />
          )
        })}

      </Grid>

    </DndContext>
  )
}