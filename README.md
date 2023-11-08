# Pru Capstone Starter Code

## Project Deliverables

[Link to Capstone Requirements PDF](https://git.generalassemb.ly/ModernEngineering/getting-started-cohort-4-october-2023/blob/main/Capstone%20Project%20Guidelines.pdf)

Please fork and clone this repo.

#### Requirements

You will be expected to develop a new full-stack application that leverages all the technologies covered in the course. All deliverables will be submitted to your GitHub repository on GA’s GitHub Enterprise servers. You will submit:

- Code for a functioning API and react front-end that meet the requirements detailed below
- 3 Dockerfiles that can be used to create a functioning container image of the application, including its API code, dependencies, and necessary configurations

#### Specific Requirements:

[The project rubric can be found in the Capstone Requirements PDF Doc here](https://git.generalassemb.ly/ModernEngineering/getting-started-cohort-4-october-2023)

1. Data Model:
   - Implement and use a PostgreSQL database for storage
   - Demonstrate your API can write to and read from the database
1. API Endpoints:
   - Using Express, implement working API endpoints corresponding to CRUD operations
1. React User Interface:
   - CRUD operations are accessible to a user from a React front-end
   - _Styling will not be part of the evaluation_
   - _React Router does not need to be included_
1. Testing:

   - 3 Jest Unit tests on the React app
   - 3 Jest Unit tests on the Express app
   - 1 End-to-End browser test with Selenium

1. Containerization:
   - Create 3 Dockerfiles (backend, db, frontend) to containerize your application
   - Build 3 images and run 3 containers from the `Dockerfile`

<br>

## `backend`

These npm packages are pre-installed:

- nodemon
- pg
- supertest
- cors
- jest

#### Reference Links

- [Express Todo Api Lesson](https://git.generalassemb.ly/ModernEngineering/express-to-do-api)
- [Testing Express With Supertest](https://git.generalassemb.ly/ModernEngineering/testing-express-with-supertest)
- [Dockerize Todo App](https://git.generalassemb.ly/ModernEngineering/dockerize-to-do-app)

#### Getting Started

1. `cd backend`
1. `npm i`
1. `npm run start` will start the server on port 3001

<br>

## `backend/db`

- Use the `backend/db/data.sql` file to create the schema in your database.
- Run the `db/data.sql` file to create the database, table and data: `psql -U postgres -d name_of_your_app_db < db/data.sql`

  _Note - If you're asked, the default password for the `postgres` user is `postgres`_

- Note- In `index.js`, you have 2 `pool` variables: one for local development and one when you build your backend `Dockefile`.

<br>

## `frontend`

This is a React application created with `npx create-react-app`.

These npm packages are pre-installed:

- [Material UI](https://mui.com/material-ui/)
- [React Router Dom](https://reactrouter.com/en/main)

#### Getting Started

1. `cd frontend`
1. `npm i`
1. `npm run start` will start the server on port 3000

#### Reference Links

- [Testing React With Jest Walkthrough](https://git.generalassemb.ly/ModernEngineering/testing-react-with-jest-walkthrough)
- [Selenium Walkthrough](https://git.generalassemb.ly/ModernEngineering/selenium-walkthrough)

<br>

## Presentations

Presentations will start on Friday November 17th at 9am EST on a volunteers first basis. Everyone will be asked to share their screen and demo their app. We ask that you demo the following:

- Demo that you can Create, Read, Update and Delete on a resource.
- What are the biggest challenges and biggest wins from your capstone app?

<br>

## Squads

We will check in as squads (in breakouts) at 9am EST and 1:30pm EST each day for a standup.

#### Ben

- Alan Johnson
- Jimili Jacob
- Taha Guler
- Becky Foley
- Joshua Suzuki
- Eric Mauro
- Dilshan Meringage
- Sunitha Raghurajan

#### Troy

- Chiragkumar Patel
- Vladimir Temelkoski
- Julian Garcia-Sanabria
- Fredrik Eriksson
- Daniel Ingersoll
- David Nothnagel
- Swati Kadakia

#### Marc

- Chun Xu
- Ozgur Ozcan
- Qiyu "Charles" Chen
- Lawrence Mabin
- Priyanshi Choudhary
- Pujitha Kongara
- Michael Neilson

<br>
