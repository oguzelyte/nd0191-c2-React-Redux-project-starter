# Employee Polls Project

This repository holds code for the Udacity React Nanodegree course Employee Polls redux app. It is an application that uses a static database within `_DATA.js` and allows users to vote, create polls. There is also a dropdown login functionality allowing to impersonate an authenticated user. There is a leaderboard page, where you can see statistical information about users in the app. There is also an individual question page, where you can see which question the user answered and some statistics.

Project uses tailwindcss for component styles.

Lastly, there are some jest and snapshot tests written to check the functionality of the app.

## How to launch the project?

- install all project dependencies with `npm install`
- start the development server with `npm start`
- run all tests with `npm test`

## Project Rundown

- **tests** - holds code of all tests for the code
- actions - has authenticated user, questions, users action creators
- components - holds all the components of the app
- middleware - holds logger middleware, which prints out the state of the app after each action
- reducers - holds app's reducer functions, controlling state behaviour changes
- styles - holds app's style
- utils - holds the `_DATA.js` file and various helper & wrapper files
