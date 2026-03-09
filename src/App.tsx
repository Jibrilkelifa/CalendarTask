import './App.css'
import Calendar from './components/calendar/Calendar'
import TopBar from './components/layout/TopBar'
import { generateMonthGrid } from './utils/calendarUtils'

function App() {

  const days = generateMonthGrid(new Date())

  console.log(days)

  return <>
  <TopBar />
  <Calendar />
</>
}

export default App
