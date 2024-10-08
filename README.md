![Walky API Logo](https://github.com/user-attachments/assets/bfc63ef3-e3ce-4776-b9f2-726c9d4d21b8)


# Walky API

## Table of Contents

0. [Introduction](#introduction)

1. [Features](#features)

2. [Technologies Used](#technologies-used)

3. [Getting Started](#getting-started)

   * Prerequisites

   * Installation
       
   * Configuration
       
   * Running the Server
     
4.  [API Endpoints](#api-endpoints)

      * Authentication

      * Users

      * Products

      * Orders

      * Inventory

      * Payment
       
5. [Documentation](#documentation)
  
6. [Contributions](#contributions)


## Introduction
Walky API is a backend service that powers an online shopping platform. The RESTful API offers comprehensive functionality for user authentication, product management, order processing, inventory management, admin usage rights and payment processing. This API is the backbone of any e-commerce application, whether it is a web app, mobile app, or both. This README provides a detailed guide to the setup instructions, API endpoints and usage.

## Features
  * User Authentication: Register, login, and manage user accounts.

  * Product Management: Add, update, retrieve, and delete product information.

  * Order Processing: Create and manage orders, including checkout and order status.

  * Inventory Management: Admin manage inventory details.

  * Admin Rights: Admin with elevated privileges.

  * Payment Processing: Pay for orders using Stripe.

## Technologies Used

  * Node.js: Server-side JavaScript runtime.

  * Express.js: Web application framework for Node.js.

  * MongoDB: NoSQL database for storing user, product, and order data.

  * Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.

  * JWT (JSON Web Tokens): Authentication and authorization.

  * Postman: A popular collaboration platform used for developing, testing and documenting APIs.


## Getting Started
#### Prerequisites
Node.js: Ensure you have Node.js installed. You can download it from https://www.nodejs.org

MongoDB: A MongoDB server must be running. You can use MongoDB Atlas or install MongoDB locally.

### Installation
Clone the repository:

    git clone https://github.com/yourusername/walky.git

Navigate to the project directory:

    cd walky/server

Install dependencies:

    npm install

Configuration

Create a .env file: 

This file will store environment variables. Create a file named .env in the root of your project directory and add the following variables:

     PORT=5000
     MONGO_URI=mongodb://localhost:27017/walky
     JWT_SECRET=your_jwt_secret_key
PORT: The port number for the server to listen on.

MONGO_URI: The connection string for MongoDB. Adjust it if you're using a remote MongoDB server or MongoDB Atlas.

JWT_SECRET: A secret key for signing JSON Web Tokens.
     
Update MongoDB URI: If you are using MongoDB Atlas, replace the MONGO_URI value with your Atlas connection string.

#### Running the Server

Start the server:

     npm start
     
The server will start and listen on the port specified in the .env file (default is 5000).

Access the API: Open your browser or a tool like Postman and make requests to the API endpoints at http://localhost:5000/api.


## API Endpoints
#### Authentication

##### POST /api/auth/register

Description: Register a new user.

Request Body:

    {
        "name": "string",
        "email": "string",
        "password": "string"
    }
            
Responses:

 201 Created:
    

     {
         "token": "string",
          "user": {
            "id": "string",
            "name": "string",
            "email": "string",
            "isAdmin": "boolean"
        }
     }

 400 Bad Request: User already exists.

500 Internal Server Error: Server error.


##### POST /api/auth/register-admin

Description: Register a new admin user.

Request Body:

     {
        "name": "string",
        "email": "string",
        "password": "string"
     }

Responses:

201 Created:

     {
         "token": "string",
           "user": {
           "id": "string",
           "name": "string",
           "email": "string",
           "isAdmin": true
        }
      }


400 Bad Request: Admin already exists.

500 Internal Server Error: Server error.


##### POST /api/auth/login

Description: Log in a user OR admin.

Request Body:

    {
        "email": "string",
        "password": "string"
    }

Responses:

200 OK:

    {
        "token": "string",
        "user": {
          "id": "string",
          "name": "string",
          "email": "string",
          "isAdmin": "boolean"
        }
     }


400 Bad Request: Invalid credentials.

500 Internal Server Error: Server error.

#### Users

##### GET /api/admin/users/:id

Description: Retrieve user details by ID.

Parameters:

    id: User ID.

Responses:

200 OK:

    {
        "_id": "string",
        "name": "string",
        "email": "string",
        "password": "Hashed-string",
        "isAdmin": false,
        "__v": 0
     }


404 Not Found: User not found.

500 Internal Server Error: Server error.


##### DELETE /api/admin/users/:id

Description: Delete a users by ID.

Parameters:

    id: User ID.

Responses:

  200 OK: User removed.

  404 Not Found: User not found.

  500 Internal Server Error: Server error.



#### Products

##### POST /api/products

Description: Create a new product.

Request Body:

    {
        "name": "string",
        "description": "string",
        "price": "number",
        "category": "string",
        "countInStock": "number"
    }

Responses:

201 Created:

    {
        "name": " string",
        "description": "string",
        "price": number,
        "category": "string",
        "countInStock": number,
        "_id": "string",
        "createdAt": "string",
        "updatedAt": "string",
        "__v": 0
    }

  
500 Internal Server Error: Server error.

##### GET /api/products/:id

Description: Retrieve product details by ID.

Parameters:

    id: Product ID.
    
Responses:

200 OK:

    {
        "_id": "string",
        "name": "string",
        "description": "string",
        "price": number,
        "category": "string",
        "countInStock": number,
        "createdAt": "string",
        "updatedAt": "string",
        "__v": 0
     }

404 Not Found: Product not found.

500 Internal Server Error: Server error.


##### PUT /api/products/:id

Description: Update product details.

Parameters:

    id: Product ID.

Request Body:

    {   
        "name":"string",
        "description": "string",
        "price": number,
        "category": "string",
        "countInStock": number
    }

Responses:

200 OK:

    {
        "_id": "string",
        "name": "string",
        "description": "string",
        "price": number,
        "category": "string",
        "countInStock": number,
        "createdAt": "string",
        "updatedAt": "string",
        "__v": 0
     }


404 Not Found: Product not found.

500 Internal Server Error: Server error.


##### DELETE /api/products/:id

Description: Delete a product by ID.

Parameters:

    id: Product ID.

Responses:

  200 OK: Product removed.

  404 Not Found: Product not found.

  500 Internal Server Error: Server error.

  
#### POST /api/payment

Description: Processes a payment for an order.

Request Body:

    {
        "amount": number
    }
    
Response:

Status: 200 OK

Body:

    {
      "success": boolean,
      "message": "string",
      "clientSecret": "string",
      "paymentIntentId": "string",
      "amount": number,
      "currency": "usd"
    }


Status: 400 Bad request, "Invalid amount provided. Amount must be a positive integer in cents."

Status: 500 Internal Server Error, "Payment Intent creation failed due to a server error. Please try again later."

## Documentation

For detailed documentation on each endpoint, including request and response formats, explore the Swagger documentation.

To access the swagger documentation, once your server is running, open a browser and navigate to: 

    http://localhost:5000/api-docs 
    
## Contributions

Contributions are welcome, if you have suggestions for improvements, bug fixes, new features or enahnce the functionality of existing features feel free to contribute. Please follow these guidelines.

  * Fork the repository
                      
  * Create a new branch for your feature or bug fix
    
  * Make your changes and test them thoroughly
    
  * Submit a pull request detailing your changes
