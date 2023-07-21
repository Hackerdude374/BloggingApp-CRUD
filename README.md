# blogging-application-using-CRUD

Welcome to the blogging application using CRUD.

This repository contains the source code for a blogging platform built using the PERN (PostgreSQL, Express.js, React, Node.js) stack. The platform allows users to register, create posts, edit posts, add comments, and perform various CRUD (Create, Read, Update, Delete) operations on posts and comments.

## Database setup
to set  up the database:

1. install PostgreSQL
2. create a database for the blogging platform
3. update the database credentials in the config('config/config.js') with your PostgreSQL details.
4. Run sequelize migrations to grant the necessary tables and relationships.

## vsCode Setup
in a new vsCode project, type in the terminal:
```terminal
git clone https://github.com/Hackerdude374/blogging-application-using-CRUD.git
```
then run
```terminal
npm install
```
to install the necessary packages. 

then run 
```terminal
npx sequelize-cli db:migrate
```
to run the necessary migrations.

## Now test the API Endpoints

The API endpoints provided by the server are as follows:

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login a user and obtain an authentication token.
- `GET /api/posts`: Retrieve all posts.
- `GET /api/posts/:id`: Retrieve a specific post by ID.
- `POST /api/posts`: Create a new post.
- `PUT /api/posts/:id`: Update a post.
- `DELETE /api/posts/:id`: Delete a post.
- `GET /api/posts/:id/comments`: Retrieve all comments for a specific post.
- `GET /api/comments/:id`: Retrieve a specific comment by ID.
- `POST /api/comments`: Create a new comment.
- `PUT /api/comments/:id`: Update a comment.
- `DELETE /api/comments/:id`: Delete a comment.

