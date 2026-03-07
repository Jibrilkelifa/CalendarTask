import './App.css'
import { generateMonthGrid } from './utils/calendarUtils'

function App() {

  const days = generateMonthGrid(new Date())

  console.log(days)

  return (
    <div>
      Calendar Engine Ready
    </div>
  )
}

export default App
