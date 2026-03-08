import './App.css'
import Calendar from './components/calendar/Calendar'
import { generateMonthGrid } from './utils/calendarUtils'

function App() {

  const days = generateMonthGrid(new Date())

  console.log(days)

  return <Calendar />
}

export default App
