# MERN Authentication App

A full-stack authentication and authorization application built with the MERN stack (MongoDB, Express, React, and Node.js).

## Features

- **User Authentication**: Users can register and log in using secure authentication.
- **JWT Authorization**: JSON Web Tokens are used to authorize and secure API routes.
- **User Sessions**: The app manages user sessions and keeps users logged in across page reloads.
- **Form Validation**: Uses Zod and react-hook-form for input validation and form handling.
- **Responsive UI**: Built with ShadCN components for a clean, responsive user experience.

## Tech Stack

- **Frontend**: React with Vite, Tailwind CSS for styling, and Redux Toolkit for state management.
- **Backend**: Node.js with Express for the API, MongoDB with Mongoose for database management, and JWT for authentication.
- **Validation**: Zod for schema-based validation.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or above)
- **MongoDB** (either locally or via MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AmrMohamed27/MernAuth.git
   cd MernAuth
   ```

2. Install backend dependencies:

   ```bash
    npm install
   ```

3. Navigate to the `client` directory and install frontend dependencies:

   ```bash
   cd client
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```makefile
PORT=5000
NODE_ENV="development"
MONGO_URI=your_mongo_database_url
JWT_SECRET=your_jwt_secret
```

### Running the App

To run the development server:

1. Set the `NODE_ENV` environment variables in the `.env` file to be `development`.

   ```makefile
   NODE_ENV="development"
   ```

2. In the root folder, open a terminal and Start the backend server:

   ```bash
   npm run dev
   ```

3. In another terminal navigate to the `client` folder and Start the frontend server:

   ```bash
   cd client
   npm run dev
   ```

### Build

To create a production build of the frontend:

```bash
cd client
npm run build
```

### API Endpoints

- `POST /api/auth/`: Logs in a user and returns a JWT token.
- `POST /api/users/`: Registers a new user and returns a JWT token.
- `POST /api/logout`: Logs a user out and removes his JWT token.
- `GET /api/profile`: Returns the profile data of the user currently logged in.
- `POST /api/profile`: Updates the profile data of the user currently logged in.

### Folder Structure

```bash
MernAuth/
├── client/             # React frontend
├── controllers/        # Express route controllers
├── models/             # Mongoose models
├── routes/             # API routes
├── middleware/         # Auth and Error Handling Middleware
├── types/              # Additional type declarations
├── utils/              # Utility Functions (such as token generator function)
├── .env                # Environment Variables
├── package.json        # Packages
└── server.ts           # Express server entry point
```
