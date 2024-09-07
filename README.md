# Walky API

## Table of Contents

0. Introduction

1. Features

2. Technologies Used

3. Getting Started

   * Prerequisites

   * Installation
       
   * Configuration
       
   * Running the Server
     
4.  API Endpoints

      * Authentication

      * Users

     * Products

      * Orders

      * Inventory

      * Admin

      * Payment
       
5. Testing
       
6. Deployment
       
7. Contributing

## Introduction
Walky API is a backend service that powers an online shopping platform. The API offers comprehensive functionality for user authentication, product management, order processing, inventory management, admin usage rights and payment processing. This API is the backbone of any e-commerce application, whether it is a web app, mobile app, or both. This README provides a detailed guide to the setup instructions, API endpoints and usage.

## Features
User Authentication: Register, login, and manage user accounts.

Product Management: Add, update, retrieve, and delete product information.

Order Processing: Create and manage orders, including checkout and order status.

Inventory management: Admin manage inventory details.

Admin Controls: Register and manage admin users with elevated privileges.

Payment processing: Pay for orders using Stripe.

## Technologies Used

Node.js: Server-side JavaScript runtime.

Express.js: Web application framework for Node.js.

MongoDB: NoSQL database for storing user, product, and order data.

Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.

JWT (JSON Web Tokens): Authentication and authorization.

Chai: Assertion library for testing.

Mocha: Test framework for Node.js.

## Getting Started
#### Prerequisites
Node.js: Ensure you have Node.js installed. You can download it from nodejs.org.

MongoDB: A MongoDB server must be running. You can use MongoDB Atlas or install MongoDB locally.

### Installation
Clone the repository:

     git clone https://github.com/yourusername/walky.git

Navigate to the project directory:

     cd walky/server

Install dependencies:

     npm install

Configuration

Create a .env file: This file will store environment variables. Create a file named .env in the root of your project directory and add the following variables:

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




  







    








