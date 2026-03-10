import { useState } from "react"

import SearchBar from "../search/SearchBar"
import CalendarHeader from "./CalendarHeader"
import CalendarGrid from "./CalendarGrid"
import WeekDays from "./WeekDays"

import { useCalendar } from "../../hooks/useCalendar"
import { useTasks } from "../../features/tasks/hooks/useTasks"
import { useHolidays } from "../../hooks/useHolidays"

export default function Calendar() {

  const { currentDate, nextMonth, prevMonth } = useCalendar()

  const { tasks, setTasks, addTask } = useTasks()

  const holidays = useHolidays(currentDate.getFullYear())

  const [search, setSearch] = useState("")

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <SearchBar value={search} onChange={setSearch} />

      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />

      <WeekDays />

      <CalendarGrid
        currentDate={currentDate}
        tasks={filteredTasks}
        holidays={holidays}
        onAddTask={addTask}
        setTasks={setTasks}
      />
    </>
  )
}