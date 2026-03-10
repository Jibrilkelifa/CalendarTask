📅 Calendar Task Management App

A full-stack calendar-based task management application where users can create, organize, and move tasks across calendar days using drag-and-drop.

The application provides a clean monthly calendar interface and allows users to manage tasks efficiently.

# Live Demo

Frontend: (after deployment)
Backend API: (after deployment)

# Project Overview

This project was built as part of a technical assessment to demonstrate full-stack development skills using modern technologies.

The application allows users to:

View tasks inside a monthly calendar

Create tasks for specific days

Drag and drop tasks to reorder them

Move tasks between different calendar days

Persist tasks in a database

Search tasks quickly

View public holidays for each date

The system follows a clean architecture structure to keep the code scalable and maintainable.

# Features
📅 Calendar View

Monthly calendar layout

Automatic generation of days for each month

Navigation between months

# Task Management

Users can:

Create tasks

Update tasks

Drag to reorder tasks

Move tasks between days

Each task is stored with:

title
date
order
🔎 Search

Users can search tasks instantly using the search bar.

# Drag and Drop

Tasks can be rearranged or moved between dates using:

dnd-kit

# Holidays Integration

Public holidays are fetched from:

Nager.Date API

# Database Persistence

Tasks are stored in:

MongoDB

Using:

Mongoose

# Architecture

The project is split into Frontend and Backend.

# Frontend Architecture

Built using:

React

TypeScript

Vite

styled-components

Folder structure:

src
 ├ app
 │   └ App.tsx
 │
 ├ components
 │   ├ layout
 │   │   └ TopBar.tsx
 │   │
 │   ├ calendar
 │   │   ├ Calendar.tsx
 │   │   ├ CalendarHeader.tsx
 │   │   ├ CalendarGrid.tsx
 │   │   ├ DayCell.tsx
 │   │   └ WeekDays.tsx
 │   │
 │   ├ task
 │   │   └ TaskCard.tsx
 │   │
 │   └ search
 │       └ SearchBar.tsx
 │
 ├ features
 │   ├ tasks
 │   │   ├ api
 │   │   │   └ taskApi.ts
 │   │   ├ hooks
 │   │   │   └ useTasks.ts
 │   │   └ types
 │   │       └ taskTypes.ts
 │   │
 │   └ holidays
 │       ├ api
 │       │   └ holidayApi.ts
 │       └ types
 │           └ holidayTypes.ts
 │
 ├ hooks
 │   └ useCalendar.ts
 │
 ├ services
 │   └ httpClient.ts
 │
 ├ utils
 │   └ calendarUtils.ts
 │
 └ styles
     └ globalStyles.ts

This modular structure improves scalability and separation of concerns.

⚙ Backend Architecture

Built using:

Node.js

Express

MongoDB

Clean architecture layers:

src
 ├ config
 │   └ db.js
 │
 ├ controllers
 │   └ task.controller.js
 │
 ├ services
 │   └ task.service.js
 │
 ├ repositories
 │   └ task.repository.js
 │
 ├ dtos
 │   └ task.dto.js
 │
 ├ models
 │   └ task.model.js
 │
 ├ routes
 │   └ task.routes.js
 │
 ├ middlewares
 │   └ error.middleware.js
 │
 └ utils
     └ asyncHandler.js

This layered structure helps maintain:

separation of responsibilities

easier testing

scalable architecture

# Installation
1️⃣ Clone the repository
git clone https://github.com/yourusername/calendar-task-app.git
🖥 Run Frontend
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🖥 Run Backend
cd backend
npm install
npm run dev

Backend runs on:

http://localhost:5000
🗄 Database Setup

Install:

MongoDB

Create .env file:

MONGO_URI=mongodb://127.0.0.1:27017/calendar_tasks
📡 API Endpoints
Get tasks
GET /tasks
Create task
POST /tasks

Example body:

{
 "title": "Finish report",
 "date": "2026-03-10",
 "order": 0
}
Update task
PUT /tasks/:id

Used for:

updating task

changing order

moving task to another day