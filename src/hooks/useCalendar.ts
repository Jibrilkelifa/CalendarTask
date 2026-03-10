import { useState } from "react"
import { addMonths, subMonths } from "date-fns"

export function useCalendar() {

  const [currentDate, setCurrentDate] = useState(new Date())

  function nextMonth() {
    setCurrentDate(prev => addMonths(prev, 1))
  }

  function prevMonth() {
    setCurrentDate(prev => subMonths(prev, 1))
  }

  return {
    currentDate,
    nextMonth,
    prevMonth
  }

}