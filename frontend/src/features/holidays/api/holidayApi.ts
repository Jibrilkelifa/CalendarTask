import axios from "axios"
import type { Holiday } from "../types/holidayTypes"

export async function fetchHolidays(year: number): Promise<Holiday[]> {

  const res = await axios.get(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/US`
  )

  return res.data.map((h: any) => ({
    date: h.date,
    name: h.localName
  }))

}