# MovieMingle

<img src="frontend/public/logo.png" alt="MovieMingle Logo" width="200"/>

## Members

- **Eunous, Nadine** (ne035, 43372)
- **Fas, Annalena** (af110, 42766)
- **Heath, India** (ih047, 5016720)
- **Herdtner, Antonia** (ah247, 43400)
- **Seifert, Fiona** (fs158, 41936)
- **Tynan, Serafina** (st110, 5016754)

## Project Abstract

MovieMingle is an application where users can choose between two movies in a "this or that" fashion, aiming to find the perfect movie for their next movie night. Users can make a pre-selection by choosing genres or years, and then view detailed information about each movie, such as a short abstract and a poster, before making a choice. Additionally, users can save movies to a watchlist and rate them after watching.

## Getting Started Guide

### Prerequisites

- Docker installed on your machine.

### Starting the Application

1. Install node modules with the following commands:
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
2. Navigate to the root directory containing the docker-compose.yaml file.
3. Make sure that Docker is running and run the following commands:
   ```sh
   sudo docker compose build
   sudo docker compose up
   ```

### Accessing the Application

- Open your browser and go to: [http://localhost:5173](http://localhost:5173)

### Login Credentials

- **Username:** `testuser`
- **Password:** `testpassword`

### Additional Requirements

To generate demo data and populate the database, the application uses a seeding script. This script creates a test user and adds movies to the watchlist. You can find it within the routes directory

## Testing

We have written tests for both frontend and backend components.

### Component Tests (Frontend)

- **What?:** Navbar, StarRating
- **Where:** ./frontend/tests
- **Technologies used:** React Testing Library, Vitest and Jest DOM
- **Steps:**
  1. Navigate to the frontend folder:
  ```sh
  cd frontend
  ```
  2. Run the tests:
  ```sh
  npm run test
  ```

### End-To-End Tests (Frontend)

- **What?:** Complete User Flow
- **Where:** ./fontend/cypress
- **Technologies used:** Cypress
- **Steps:**
  1. Install Cypress:
  ```sh
  npm install cypress
  ```
  2. Make sure Docker is running and navigate to the frontend folder:
  ```sh
  cd frontend
  ```
  3. Open Cypress:
  ```sh
  npx cypress open
  ```
  4. In the Cypress interface, select "E2E" from the test suites dropdown and then run `login.spec.js` in Chrome.

### Unit Tests (Backend)

- **What?:** registration and login
- **Where:** ./backend/src/tests
- **Technologies used:** Jest
- **Steps:**

1. Run tests:
   ```sh
   cd backend
   npm run test
   ```
