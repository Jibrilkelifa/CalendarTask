import styled from "styled-components"
import { format } from "date-fns"

const Header = styled.div`
  padding: 16px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`

export default function CalendarHeader() {

  const today = new Date()

  return (
    <Header>
      {format(today, "MMMM yyyy")}
    </Header>
  )
}