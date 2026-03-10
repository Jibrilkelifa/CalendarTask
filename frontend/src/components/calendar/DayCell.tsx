import styled from "styled-components"
import { format } from "date-fns"
import { useState } from "react"
import { useDroppable } from "@dnd-kit/core"

import type { Task } from "../../features/tasks/types/taskTypes"
import type { Holiday } from "../../features/holidays/types/holidayTypes"

import TaskCard from "../task/TaskCard"

import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"

type Props = {
  date: Date
  isCurrentMonth: boolean
  tasks: Task[]
  onAddTask: (title: string, date: string) => void
  holiday?: Holiday
}

const Cell = styled.div<{ $current: boolean }>`
  border-right: 1px solid #d6d6d6;
  border-bottom: 1px solid #d6d6d6;
  padding: 8px;
  background: ${({ $current }) => ($current ? "#e9e9e9" : "#f2f2f2")};

  display: flex;
  flex-direction: column;
`

const DateNumber = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
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
  gap: 6px;
`

const CardCount = styled.span`
  font-size: 12px;
  color: #888;
  margin-left: 4px;
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

export default function DayCell({
  date,
  isCurrentMonth,
  tasks,
  onAddTask,
  holiday
}: Props) {

  const [title, setTitle] = useState("")

  const dateString = format(date, "yyyy-MM-dd")

  const { setNodeRef } = useDroppable({
    id: dateString,
    data: { type: "day" }
  })

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {

    if (e.key === "Enter" && title.trim()) {
      onAddTask(title, dateString)
      setTitle("")
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order)

  return (
    <Cell ref={setNodeRef} $current={isCurrentMonth}>

      <DateNumber>
        {format(date, "d")}
        {tasks.length > 0 && (
          <CardCount>{tasks.length} card</CardCount>
        )}
      </DateNumber>

      {holiday && (
        <HolidayLabel>
          {holiday.name}
        </HolidayLabel>
      )}

      <SortableContext
        items={sortedTasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >

        <TasksContainer>

          {sortedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}

        </TasksContainer>

      </SortableContext>

      <TaskInput
        placeholder="+ Add task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />

    </Cell>
  )
}