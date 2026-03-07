import styled from "styled-components"

const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 8px 0;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid #ddd;
`

const Day = styled.div`
  color: #666;
`

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function WeekDays() {
  return (
    <WeekContainer>
      {days.map(day => (
        <Day key={day}>{day}</Day>
      ))}
    </WeekContainer>
  )
}