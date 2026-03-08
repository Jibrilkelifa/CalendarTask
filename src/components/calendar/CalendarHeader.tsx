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
  margin-bottom: 10px;
`

const Button = styled.button`
  padding: 6px 10px;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`

const Title = styled.h2`
  margin: 0;
`

export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth
}: Props) {
  // ✅ Ensure currentDate is valid
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
