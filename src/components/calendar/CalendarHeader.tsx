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
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #fafafa;
`

const Button = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: #f3f4f6;        // light gray background
  color: #374151;
  border-radius: 50%;         // circular
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #3b82f6;      // blue highlight
    color: #ffffff;           // white arrow
  }

  &:active {
    transform: scale(0.95);   // click feedback
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
