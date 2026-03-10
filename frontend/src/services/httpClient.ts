import axios from "axios"

export const http = axios.create({
  baseURL: process.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

