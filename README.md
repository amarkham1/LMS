# Lease Management System

This is a full-stack Javascript web-based app which enables its users - predominantly commercial real estate brokers and landlords - to manage and track the status of current lease transactions within the portfolio. Much of the desired functionality is under construction, however users can currently register and log in/out of the system; view current ongoing deals with tenants; and dive into those deals, adding in Negotiation Details as the negotiation progresses and counter-offers are made. The app uses Node.js on the back-end, React on the front-end, and PostGreSQLs for the database. It is deployed through Heroku and is currently live at https://leasingmgmtsys.herokuapp.com/.

## Tech Stack

The app uses the following key packages/technologies:
    - bcrypt, in order to encrypt/hash users passwords when registering
    - Knex.js, in order to connect and communicate with the database
    - Moment.js, for creating and manipulating dates
    - react-select, for its dropdowns used in forms

## Running In Development Mode

1. Clone this repository
2. Run the following code:
```
cd LMS/lms-back-end
createdb -T template0 lms-database
psql lms-database < database
npm install
npm start
```
3. In another terminal window, navigate to the repository and run:
```
cd LMS/lms-front-end
npm install
npm start
```
