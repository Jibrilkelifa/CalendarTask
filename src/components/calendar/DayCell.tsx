// src/components/Calendar/DayCell.tsx
import styled from "styled-components"
import { format } from "date-fns"
import { useState } from "react"
import { useDroppable } from "@dnd-kit/core"
import type { Task } from "../../features/tasks/types/taskTypes"
import type { Holiday } from "../../features/holidays/holidayTypes"
import TaskCard from "../task/TaskCard"

type Props = {
  date: Date
  isCurrentMonth: boolean
  tasks: Task[]
  onAddTask: (title: string, date: string) => void
  holiday?: Holiday
}

const Cell = styled.div<{ $current: boolean }>`
  border: 1px solid #eee;
  padding: 6px;
  background: ${({ $current }) => ($current ? "#fff" : "#f5f5f5")};
  display: flex;
  flex-direction: column;
`

const DateNumber = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
`

const HolidayLabel = styled.div`
  font-size: 10px;
  color: red;
  font-weight: bold;
  margin-bottom: 2px;
`

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const TaskInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 12px;
  margin-top: 4px;
  padding: 2px;
  border-radius: 3px;
`

export default function DayCell({ date, isCurrentMonth, tasks, onAddTask, holiday }: Props) {
  const [title, setTitle] = useState("")
  const dateString = format(date, "yyyy-MM-dd")

  const { setNodeRef } = useDroppable({
    id: dateString
  })

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && title.trim()) {
      onAddTask(title, dateString)
      setTitle("")
    }
  }

  return (
    <Cell ref={setNodeRef} $current={isCurrentMonth}>
      <DateNumber>{format(date, "d")}</DateNumber>

      {holiday && <HolidayLabel>{holiday.name}</HolidayLabel>}

      <TasksContainer>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </TasksContainer>

      <TaskInput
        placeholder="+ Add task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Cell>
  )
}
