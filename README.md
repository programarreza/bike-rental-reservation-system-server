## Project Name: bike-rental-reservation-system-server

## Live Url: [https://bikerentalclient-md-shafikul-islams-projects.vercel.app/](https://bikerentalclient-md-shafikul-islams-projects.vercel.app/)

## Features:

- User authentication and authorization
  - Sign up
  - Login
  - JWT-based authentication
  - Role-based access control (admin and user)
- User profile management
  - View profile
  - Update profile
- Bike management (Admin only)
  - Create bike
  - Update bike
  - Delete bike
  - Get all bikes
- Rental management
  - Create rental
  - Return bike (Admin only)
  - Get all rentals for a user
- Error handling
  - No data found handling
  - Global error handling middleware
  - Validation error handling using Zod
  - Not found route handling
- Database operations with Mongoose
- Consistent API responses using a custom response utility

## Technology Stack:

- Programming Language: TypeScript
- Web Framework: Express.js
- ODM & Validation Library: Zod, Mongoose for MongoDB

## How to run the application locally

- install node_module: npm install
- add .env file flowing the .env.example file
- npm run build
- npm run start:dev
