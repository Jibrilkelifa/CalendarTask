import axios from "axios"
import type { Holiday } from "./holidayTypes"

export async function fetchHolidays(
  year: number
): Promise<Holiday[]> {

  const response = await axios.get(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/US`
  )

  return response.data.map((h: any) => ({
    date: h.date,
    name: h.localName
  }))
}