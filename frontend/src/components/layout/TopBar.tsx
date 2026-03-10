import styled from "styled-components"

const Bar = styled.div`
  height: 45px;
  background: #f4a300;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: white;
  font-weight: 600;
`

export default function TopBar() {
  return <Bar>Calendar Test Task</Bar>
}