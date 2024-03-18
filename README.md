# Pru Capstone Starter Code

## Project Deliverables

**Project is due via Pull Request on Friday, March 22nd at 9am EST**

[Link to Capstone Requirements PDF](./assets/Capstone-Project-Guidelines.pdf)

Please fork and clone this repo. To submit your work, please submit a Pull Request with your full name on this repo.

[Pull Request Instructions](https://git.generalassemb.ly/ModernEngineering/start-here/#submitting-your-work-via-pull-request)

_Note: the use of this starter code is optional! Feel free to build your own apps from scratch as you see fit. Please give the instructors a heads up and we'll have you submit your repo links differently._

#### Requirements

You will be expected to develop a new full-stack application that leverages all the technologies covered in the course. All deliverables will be submitted to your GitHub repository on GA’s GitHub Enterprise servers. You will submit:

- Code for a functioning API and react front-end that meet the requirements detailed below
- 3 Dockerfiles that can be used to create a functioning container image of the application, including its API code, dependencies, and necessary configurations

_Prudential has strongly recommended that you build an application with a financial theme (e.g. - budget tracker app, or bill tracker app, etc)_

#### Specific Requirements:

[The project rubric can be found in the Capstone Requirements PDF Doc here](./assets/Capstone-Project-Guidelines.pdf)

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
- [Testing Express With Supertest](https://git.generalassemb.ly/ModernEngineering/todo-express-api-testing-with-supertest)
- [Dockerize Todo App](https://git.generalassemb.ly/ModernEngineering/dockerize-to-do-app)

#### Getting Started

1. `cd backend`
1. `npm i`
1. `npm run start` will start the server on port 3001

<br>

## `backend/db`

- Use the `backend/db/capstone.sql` file to create the schema in your database.
- Run the `db/capstone.sql` file to create the database, table and data: `psql -U postgres -d name_of_your_app_db < db/capstone.sql`

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

Presentations will start on Tuesday February 6th at 9am EST on a volunteers first basis. Everyone will be asked to share their screen and demo their app. Each person will have 5-6 minutes including Q&A.

We ask that you demo the following:

- Demo that you can Create, Read, Update and Delete on a resource.
- What are the biggest challenges and biggest wins from your capstone app?
- Feel free to run one of your test suites for frontend or backend.

_NOTE: In the interest of time, you are not required to demo your Docker containers. You are welcome to demo using your locally running servers._

<br>

## Squads

We've assigned everyone to an instructor so that we get more familiar with individual apps and better provide assistance. Here is when we'll check in.

1. We will check into the main room at 9am EST for attendance. Afterward, we'll split up into squads (in breakouts) for a standup. Here you can address:
   - What you've completed so far? 
   - What you plan to work on that day?
   - Any blockers?

1. We will also have a 1:30pm EST check in after lunch in the Zoom chat each day for attendance.

1. We'll meet in the main room at 4:30pm EST each day for the daily exit ticket. For question "10. Any other general questions or comments to share?", please briefly let us know the following:
   - What did you accomplish today?
   - Did you hit any blockers?
   - What’s your plan for tomorrow?


### Squad Assignments

#### Mario
- Jyothi
- Durga
- Jorge
- Raghunadh
- Naresh
- Victorino
- Anila

#### Troy
- Marina
- Mohammed
- Uma
- Daniel
- Megha
- Calvin
- Matt

#### Suresh
- Leonid
- Rohan
- Yelena
- Romer
- Lindsay
- Khue
- Joe

<br>
