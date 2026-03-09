import styled from "styled-components"

const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f3f4f6;   
  border-bottom: 1px solid #e5e7eb;
`

const Day = styled.div`
  text-align: center;
  padding: 12px;
  font-size: 13px;
  font-weight: 700;  
  color: #374151;
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