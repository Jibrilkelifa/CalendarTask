import styled from "styled-components"
import type { Task } from "../../features/tasks/types/taskTypes"
import { useDraggable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"


type Props = {
  task: Task
}

const Card = styled.div`
  background: #f7f7f7;
  color: #333;
  padding: 6px;
  border-radius: 3px;
  font-size: 13px;
  cursor: grab;
  user-select: none;
  border: 1px solid #ddd;
`
const Labels = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`

const Label = styled.div<{ color: string }>`
  width: 28px;
  height: 6px;
  border-radius: 2px;
  background: ${({ color }) => color};
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
  <Labels>
    <Label color="#61bd4f" />
    <Label color="#f2d600" />
    <Label color="#ff9f1a" />
  </Labels>

  {task.title}
</Card>
  )
}
