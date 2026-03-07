import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
