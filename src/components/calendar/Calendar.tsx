import styled from "styled-components"
import WeekDays from "./WeekDays"
import CalendarGrid from "./CalendarGrid"

const Container = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  padding: 10px;   
`


export default function Calendar() {
  return (
    <Container>
      <WeekDays />
      <CalendarGrid />
    </Container>
  )
}