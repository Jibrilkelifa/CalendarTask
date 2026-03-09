import styled from "styled-components"

const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f2f2f2;
  border-bottom: 1px solid #d6d6d6;
`

const Day = styled.div`
  text-align: centre;
  padding: 6px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  width: 100%;
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