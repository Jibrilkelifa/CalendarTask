import styled from "styled-components"
import type { Task } from "../../features/tasks/types/taskTypes"
import { useDraggable } from "@dnd-kit/core"


type Props = {
  task: Task
}

const Card = styled.div`
  background: #3b82f6;
  color: white;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  user-select: none;
`

export default function TaskCard({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id
  })

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {task.title}
    </Card>
  )
}
