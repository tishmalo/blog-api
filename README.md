# Blog API

This project is a RESTful API for a versatile blogging platform featuring user authentication, authorization, and basic blog post management.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)

## Features

- **User Authentication and Authorization using JWT**: Secure user registration and login, ensuring access is restricted to authenticated users.
- **User registration and login**: Smooth user onboarding with secure registration and login functionalities.
- **CRUD functionality for blog posts**: Create, Read, Update, Delete operations for managing blog posts.
- **Authorization checks**: Ensures that only authenticated users can perform specific actions.

## Getting Started

Follow these steps to set up the project on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tishmalo/blog-api.git

2 **Navigate to the project directory:**
    ```bash
    cd blog-api

3. **Install dependencies:**
    ```bash
    npm install

4. **Create a .env file in the project root and add the following environment variables:**
    ```bash
    PORT=3000
    DB_URI=mongodb://your-mongodb-uri
    JWT_SECRET=your-jwt-secret

5. **Start the server:**
    ```bash
    npm start

## Usage

1. Make sure to have MongoDB installed and running.
2. Use a tool like Postman or a web browser to interact with the API.
3. Register a user, obtain a JWT token, and include it in the cookies for authenticated requests.

## API Endpoints

- **POST /register:** Register a new user.
- **POST /login:** Login and obtain a JWT token.
- **POST /postBlog:** Create a new blog post (requires authentication).
- **GET /getBlog:** Retrieve all blog posts.
- **GET /getBlog/:id:** Retrieve a specific blog post by ID.
- **PUT /editBlog/:id:** Edit an existing blog post (requires authentication).
- **DELETE /deleteBlog/:id:** Delete a blog post (requires authentication).

## Dependencies

- **passport:** Provides a simple way to implement various authentication strategies.
- **express-session:** Handling sessions on the server.
- **dotenv:** Load environment variables from a .env file.
- **express:** Web framework for Node.js.
- **jsonwebtoken:** JSON Web Token (JWT) implementation.
- **mongodb:** Official MongoDB driver.
- **mongoose:** MongoDB object modeling tool.
- **nodemon:** Development tool that automatically restarts the server.


Feel free to reach out if you have any questions or need further clarification.

**Author:** Jonathan Mutinda

**License:** MIT