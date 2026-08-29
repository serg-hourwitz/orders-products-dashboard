# Orders & Products Dashboard

A full-stack SPA dashboard for managing orders and products.

The project is built with Next.js, React, TypeScript, Redux Toolkit, MySQL, REST API, JWT authentication, Socket.IO, Docker, internationalization, charts, and automated tests.

## Features

* Orders list and order details
* Products list with filtering by product type
* Order creation with form validation
* Order deletion with confirmation
* Persistent data storage in MySQL
* REST API for orders and products
* JWT-based authentication
* Protected application routes
* Redux Toolkit global state management
* Real-time active browser sessions counter using Socket.IO
* English and Ukrainian localization
* Language preference persistence using Web Storage
* Animated UI transitions with Framer Motion
* Analytics charts with lazy loading
* Responsive UI
* Unit and API route tests with Vitest
* Production Docker configuration
* MySQL database schema and seed data

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Redux Toolkit
* React Redux
* Bootstrap
* SCSS
* Framer Motion
* React Hook Form
* Zod
* i18next
* react-i18next
* Recharts
* Axios

### Backend

* Next.js Route Handlers
* REST API
* MySQL
* mysql2
* JWT authentication with `jose`
* Socket.IO
* Custom Node.js server

### Testing

* Vitest
* React Testing Library
* Testing Library User Event
* jsdom

### Infrastructure

* Docker
* Docker Compose
* Node.js 22
* MySQL 8.4

## Requirements

For the recommended Docker setup, install:

* Git
* Docker Desktop with Docker Compose

For local development without running the application inside Docker, install additionally:

* Node.js 22+
* npm

The application requires a MySQL database.

## Clone the Repository

```bash
git clone <repository-url>
cd orders-products-dashboard
```

Replace `<repository-url>` with the URL of this repository.

## Environment Variables

Create a `.env.local` file in the project root.

You can use `.env.example` as a template.

Example:

```env
JWT_SECRET=replace-with-your-secret
DEMO_USER_EMAIL=admin@example.com
DEMO_USER_PASSWORD=replace-with-your-password

MYSQL_DATABASE=orders_products
MYSQL_USER=app_user
MYSQL_PASSWORD=app_password
MYSQL_ROOT_PASSWORD=root_password

DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=orders_products
DB_USER=app_user
DB_PASSWORD=app_password
```

`JWT_SECRET` should be replaced with a sufficiently long random secret for real deployments.

Do not commit `.env.local` to Git.

## Recommended Setup — Docker

Docker Compose starts both:

* Next.js application
* MySQL database

The database schema and initial data are automatically initialized from:

```text
database/schema.sql
database/seed.sql
```

### 1. Create `.env.local`

Create the environment file as described above.

### 2. Build and start the application

```bash
docker compose up -d --build
```

### 3. Check container status

```bash
docker compose ps
```

Both the application and MySQL containers should be running. The MySQL service should report a healthy status.

### 4. Open the application

Open:

```text
http://localhost:3000
```

### 5. Stop the application

```bash
docker compose down
```

To stop the application and remove the MySQL volume:

```bash
docker compose down -v
```

Note that `-v` removes the database volume and therefore deletes persisted database data. The schema and seed data will be recreated the next time the containers start.

## Demo Authentication

The default demo credentials from the example configuration are:

```text
Email: admin@example.com
Password: admin123
```

If you change `DEMO_USER_EMAIL` or `DEMO_USER_PASSWORD` in `.env.local`, use the new values instead.

After successful authentication, the application creates an HTTP-only JWT session cookie.

## Local Development

MySQL can run in Docker while the Next.js application runs directly on the host machine.

### 1. Install dependencies

```bash
npm ci
```

### 2. Create `.env.local`

Use `.env.example` as a template.

For an application running directly on the host, use:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
```

### 3. Start MySQL

```bash
docker compose up -d mysql
```

### 4. Check MySQL status

```bash
docker compose ps
```

### 5. Start the development server

```bash
npm run dev
```

The custom Node.js server starts Next.js and Socket.IO.

Open:

```text
http://localhost:3000
```

## Available Scripts

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Run ESLint:

```bash
npm run lint
```

Run tests in watch mode:

```bash
npm test
```

Run all tests once:

```bash
npm run test:run
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Database

The project uses MySQL with the following main tables:

```text
orders
  |
  └── products
        |
        └── product_prices
```

The schema is located at:

```text
database/schema.sql
```

Initial demo data is located at:

```text
database/seed.sql
```

Relationships use foreign keys.

Deleting an order automatically deletes its related products, and deleting a product automatically deletes its related prices through `ON DELETE CASCADE`.

### Verify the Database Connection

After starting the application, the database health endpoint is available at:

```text
GET /api/health/db
```

For example:

```bash
curl http://localhost:3000/api/health/db
```

Expected response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

## REST API

Protected API endpoints require authentication.

Main endpoints:

| Method   | Endpoint            | Description               |
| -------- | ------------------- | ------------------------- |
| `POST`   | `/api/auth/login`   | Sign in                   |
| `GET`    | `/api/auth/session` | Get current session       |
| `POST`   | `/api/auth/logout`  | Sign out                  |
| `GET`    | `/api/orders`       | Get orders                |
| `POST`   | `/api/orders`       | Create an order           |
| `DELETE` | `/api/orders/:id`   | Delete an order           |
| `GET`    | `/api/products`     | Get products              |
| `GET`    | `/api/health/db`    | Check database connection |

## Real-Time Sessions

Socket.IO is integrated into the custom Node.js server.

Every connected browser tab creates a Socket.IO connection. The application displays the current number of active browser sessions in real time.

Because Socket.IO requires a persistent Node.js server, the application uses `server.ts` instead of a purely static/serverless runtime.

## Internationalization

The interface supports:

* English
* Ukrainian

The selected language is stored in browser Web Storage and restored when the application is opened again.

## Testing

Run the complete test suite:

```bash
npm run test:run
```

The test suite covers:

* Redux selectors
* UI components
* product filtering
* order form validation
* REST API route behavior
* authentication behavior

API route tests mock the repository layer, so they do not require a live MySQL database.

The real MySQL integration can be verified through Docker and the database health endpoint.

## Code Quality

Run:

```bash
npm run lint
```

Then verify the production build:

```bash
npm run build
```

Before submitting changes, the recommended validation sequence is:

```bash
npm run test:run
npm run lint
npm run build
```

## Project Structure

```text
orders-products-dashboard/
├── database/
│   ├── schema.sql
│   └── seed.sql
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── i18n/
│   ├── lib/
│   ├── providers/
│   ├── repositories/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── test/
│   ├── types/
│   └── utils/
├── Dockerfile
├── docker-compose.yml
├── server.ts
├── package.json
└── README.md
```

## Architecture

The application follows a layered structure:

```text
UI Components
      ↓
Redux / Services
      ↓
REST API
      ↓
Repositories
      ↓
MySQL
```

Database access is isolated in the repository layer.

This keeps API route handlers independent from raw SQL queries and makes the API routes easier to test.

## Quick Verification

For a clean self-check of the repository:

```bash
git clone <repository-url>
cd orders-products-dashboard
```

Create `.env.local`, then run:

```bash
docker compose up -d --build
```

Check:

```bash
docker compose ps
```

Verify the database:

```bash
curl http://localhost:3000/api/health/db
```

Open:

```text
http://localhost:3000
```

Log in using the configured demo credentials.

Finally, the source code can be validated with:

```bash
npm ci
npm run test:run
npm run lint
npm run build
```
