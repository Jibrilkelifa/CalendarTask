import { useEffect, useState } from "react"
import { fetchHolidays } from "../features/holidays/api/holidayApi"
import type { Holiday } from "../features/holidays/types/holidayTypes"

export function useHolidays(year: number) {

  const [holidays, setHolidays] = useState<Holiday[]>([])

  useEffect(() => {

    fetchHolidays(year)
      .then(setHolidays)
      .catch(console.error)

  }, [year])

  return holidays
}