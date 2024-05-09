
# Vehicle Project Documentation

Welcome to the Vehicle project documentation. This project utilizes technologies such as NestJS, Prisma, Docker, Mocha with the Unexpected library for unit testing, SQLite as the database, Redis for caching, and Swagger for API documentation.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- Docker
- Git

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository:
   ```bash
   git clone https://github.com/alissoonluan/vehicle
   ```

2. Navigate to the project directory:
   ```bash
   cd vehicle
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Start the application:
   ```bash
   npm run start
   ```
   Alternatively, to start with the development watch mode:
   ```bash
   npm run start:dev
   ```

### Running the tests

To run the unit tests:
```bash
npm run test
```

### Running the coverage

To run the coverage:
```bash
npm run test:cov
```
Navigate to the coverage folder using your file explorer or terminal.
Open the index.html file in a web browser.

## Using the API

You can access the API documentation through the Swagger interface to view and interact with the available endpoints. Below are some of the API endpoints you can access:

- **POST /user** - Create a new user
- **POST /auth/login** - Authenticate a user
- **POST /vehicle** - Create a new vehicle
- **GET /vehicle** - Retrieve all vehicles
- **PUT /vehicle/:id** - Update a vehicle
- **DELETE /vehicle/:id** - Delete a vehicle

## License

Made with ❤️ by Alisson Luan
