# Personal Expense Tracker App

## About the Project

The Personal Expense Tracker is a web application that helps users record, manage, and visualize their daily expenses.

## Features

- Add new expenses
- Edit existing expenses
- Delete expenses
- View all expenses
- Calculate total expenses
- View category-wise expenses using a pie chart
- Store expense data in MongoDB
- Responsive user interface

## Technologies Used

- Frontend: React
- Backend: Node.js and Express.js
- Database: MongoDB
- Charts: Chart.js
- Version Control: Git and GitHub

## Project Structure

- "frontend/" – React user interface
- "backend/" – Express API and MongoDB integration

## Setup Instructions

Prerequisites

Install Node.js and npm before running the project. A MongoDB connection is also required.

1. Clone the Repository

git clone https://github.com/anammirza25/zelvora-week-1-expense-tracker.git
cd zelvora-week-1-expense-tracker

2. Configure the Backend

cd backend
npm install

Create a ".env" file inside the "backend" folder and add your MongoDB connection string:

MONGO_URI=your_mongodb_connection_string

Keep your actual ".env" file private. Never upload database credentials to GitHub.

Start the backend:

node server.js

The backend runs at "http://localhost:5000".

3. Configure the Frontend

Open a second terminal from the project root:

cd frontend
npm install
npm run dev

Open the local URL displayed in the terminal, usually "http://localhost:5173".

4. Use the Application

Add an expense, edit or delete an existing expense, and view the total expenses and category-wise chart.

## Screenshots

### Dashboard

"Expense Tracker Dashboard" (screenshots/dashboard.png)

### Expense List

"Expense List with Edit and Delete" (screenshots/expense-list.png)

### Mobile View

"Responsive Mobile View" (screenshots/mobile-view.png)

## Demo

Demo video: See the "demo" folder for the recorded demonstration.