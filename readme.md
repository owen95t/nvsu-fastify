# Backend Test

This backend uses the following technologies
- Node.js
- Typescript
- Fastify
- Prisma (ORM)

## Setup

- Clone project
- Run npm install
- Create .env file and copy over the variables from `.env.example`. Please define the `JWT_SECRET` variable to a string of your choice.


## To Run

Run `nodemon` in root of folder to start the server. The project has already been built and the js files are in the `dist` folder.
Nodemon will run from the files in the dist folder. 

## Routes

To view all routes and its inputs, please import Postman Collection from the file titled `NVSU.postman_collection.json`.
Feel free to register a user and try out the APIs via Postman.

## Database

The database used is SQLite. This is for ease of development. Prisma.js is the database connector/ORM for this project.

## ER Diagram

The ER Diagram of the database can be viewed in the file titled `prisma-erd.jpg`
