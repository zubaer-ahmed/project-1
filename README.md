# Repository Information

This repository contains two separate applications: a `frontend` and a `backend`.

## Frontend

The `frontend` of this project is a web application built using `React`, `Vite`, and `TailwindCSS`. It is responsible for the user interface and interactions of the application.

### Getting Started

To run the vite frontend server:

```bash
cd frontend
npm install
npm run dev
```

The frontend should now be accessible at http://localhost:5173.

## Backend

The `backend` of this project is a server application built using `Express.js` and `MongoDB`. It handles data storage, retrieval, and serves as the API for the frontend.

### Structure

The `backend` directory is organized as follows:

- `controllers`: Contains methods that normally handle HTTP requests and responses.
- `models`: Defines data models for MongoDB.
- `routes`: Contains route definitions for different API endpoints.

### Getting Started

To set up MongoDB:

First you need to create a MongoDB Atlas Cluster and add .env variable named MONGODB_URI to the connection string. For example:

```
MONGODB_URI="mongodb+srv://root:root@cluster0.l2biux6.mongodb.net/?retryWrites=true&w=majority"
```

Then to run the backend express server application:

```bash
cd backend
npm install
npm start
```

The `backend` server should now be running at http://localhost:8001, which is used by frontend app.

## Others

- the file `backend/rest.http` mentions some of the the API endpoints. (The format is directly compatible with VSCode's REST Client Extension)
- `login/signup` system uses JWT. Its sends JWT as both: 1. login/signup response and 2. a cookie. Either may be used to retrieve `JWT` token.

## Contributing

This repository is a submission of progress. Pull requests will not be reviewed. 