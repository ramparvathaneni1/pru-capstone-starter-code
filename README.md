# Pru Capstone Starter Code

## Project Deliverables

[Link to Requirements](https://git.generalassemb.ly/ModernEngineering/getting-started-cohort-4-october-2023/blob/main/Capstone%20Project%20Guidelines.pdf)

Please fork and clone this repo.

#### Requirements

You will be expected to develop a full-stack application that leverages all the technologies covered in the course. All deliverables will be submitted to your GitHub repository on GA’s GitHub Enterprise servers. You will submit:

- Code for a functioning API and react front-end that meet the requirements detailed on the following page
- A Dockerfile that can be used to create a functioning container image of the application, including its API code, dependencies, and necessary configurations

#### Specific Requirements:

1. Data Model:
   - Implement and use a PostgreSQL database for storage
   - Demonstrate your API can write to and read from the database
1. API Endpoints:
   - Using Express, implement working API endpoints corresponding to CRUD operations
1. React User Interface:
   - CRUD operations are accessible to a user from a React front-end
   - _Styling will not be part of the evaluation_
1. Testing:
   - Unit tests on react components and express routes
   - End-to-End browser testing with Selenium
1. Containerization:
   - Create a `Dockerfile` to containerize your application
   - Build an image from the `Dockerfile`

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

- In `index.js`, the `pool` variable should like like this:

   ```js
   const pool = new Pool({
   user: "postgres",
   host: "localhost",
   database: "capstone_db",
   password: "postgres",
   port: 5432,
   });
   ```

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

## Docker Compose

1. Make sure your postgresql service is stopped: `sudo service postgresql stop`

1. To use Docker Compose, in `backend/index.js`, update the pool variable:

```js
const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "capstone_db",
  password: "docker",
  port: 5432,
});
```

1. `sudo docker-compose up -d --build`
