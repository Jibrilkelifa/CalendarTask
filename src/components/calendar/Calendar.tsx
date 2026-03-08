import styled from "styled-components"
import CalendarHeader from "./CalendarHeader"
import WeekDays from "./WeekDays"
import CalendarGrid from "./CalendarGrid"

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  border: 1px solid #ddd;
  background: white;
`

export default function Calendar() {
  return (
    <Container>
      <CalendarHeader />
      <WeekDays />
      <CalendarGrid />
    </Container>
  )
}