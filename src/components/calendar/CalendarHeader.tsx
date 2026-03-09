import styled from "styled-components"
import { format } from "date-fns"

type Props = {
  currentDate: Date
  onPrevMonth: () => void
  onNextMonth: () => void
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #fafafa;
`

const Button = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #e5e7eb;
  background: white;
  color: #374151;
  border-radius: 50%;   // circular
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #f3f4f6;
  }
`

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
`



export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth
}: Props) {
  const safeDate =
    currentDate instanceof Date && !isNaN(currentDate.getTime())
      ? currentDate
      : new Date()

  return (
    <Header>
      <Button onClick={onPrevMonth}>◀</Button>
      <Title>{format(safeDate, "MMMM yyyy")}</Title>
      <Button onClick={onNextMonth}>▶</Button>
    </Header>
  )
}
