import styled from "styled-components"
import { useState, useEffect } from "react"
import { addMonths, subMonths } from "date-fns"

import WeekDays from "./WeekDays"
import CalendarGrid from "./CalendarGrid"
import CalendarHeader from "./CalendarHeader"
import SearchBar from "../search/SearchBar"

import { getTasks, createTask } from "../../features/tasks/taskApi"
import { fetchHolidays } from "../../features/holidays/holidayApi"

import type { Task } from "../../features/tasks/types/taskTypes"
import type { Holiday } from "../../features/holidays/holidayTypes"

const Container = styled.div`
  height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`

const Inner = styled.div`
  flex: 1;            
  display: flex;
  flex-direction: column;
  width: 100%;
`
const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;          
  max-width: 1200px;    
  margin: 0 auto;     
`



export default function Calendar() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [search, setSearch] = useState("")
  const [holidays, setHolidays] = useState<Holiday[]>([])

  useEffect(() => {
    getTasks().then(setTasks)
  }, [])

  useEffect(() => {
    fetchHolidays(currentDate.getFullYear())
      .then(setHolidays)
      .catch(console.error)
  }, [currentDate])

  function nextMonth() {
    setCurrentDate(prev => addMonths(prev, 1))
  }

  function prevMonth() {
    setCurrentDate(prev => subMonths(prev, 1))
  }

  async function addTask(title: string, date: string) {

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      date,
      order: 0
    }

    await createTask(newTask)

    setTasks(prev => [...prev, newTask])
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container>
      <CalendarWrapper>
      <Inner>
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
      </Inner>
      </CalendarWrapper>
    </Container>
  )
}