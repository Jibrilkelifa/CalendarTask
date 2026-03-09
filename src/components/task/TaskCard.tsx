import styled from "styled-components"
import type { Task } from "../../features/tasks/types/taskTypes"
import { useDraggable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"


type Props = {
  task: Task
}

const Card = styled.div`
  background: #ffffff;
  color: #111827;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-left: 4px solid #3b82f6;   // ✅ colored accent
`


export default function TaskCard({ task }: Props) {

const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition
} = useSortable({
  id: task.id,
  data: { type: "task" }   
})


  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {task.title}
    </Card>
  )
}
