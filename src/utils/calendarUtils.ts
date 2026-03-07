
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays
} from "date-fns"
export type CalendarDay = {
  date: Date
  isCurrentMonth: boolean
}

export function generateMonthGrid(currentDate: Date): CalendarDay[] {

  const startMonth = startOfMonth(currentDate)
  const endMonth = endOfMonth(currentDate)

  const startDate = startOfWeek(startMonth)
  const endDate = endOfWeek(endMonth)

  const days: CalendarDay[] = []

  let day = startDate

  while (day <= endDate) {

    days.push({
      date: day,
      isCurrentMonth: day.getMonth() === currentDate.getMonth()
    })

    day = addDays(day, 1)

  }

  return days
}