# Orders & Products Dashboard

A full-stack SPA dashboard for managing orders and products.

The project is built with Next.js, React, TypeScript, Redux Toolkit, MySQL, REST API, JWT authentication, Socket.IO, Docker, internationalization, charts, and automated tests.

## Features

- Orders list and order details
- Products list with filtering by product type
- Order creation with form validation
- Order deletion with confirmation
- Persistent data storage in MySQL
- REST API for orders and products
- JWT-based authentication
- Protected application routes
- Redux Toolkit global state management
- Real-time active browser sessions counter using Socket.IO
- English and Ukrainian localization
- Language preference persistence using Web Storage
- Animated UI transitions with Framer Motion
- Analytics charts with lazy loading
- Responsive UI with mobile navigation
- Unit and API route tests with Vitest
- Production Docker configuration
- MySQL database schema and seed data

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Redux Toolkit
- React Redux
- Bootstrap
- SCSS
- Framer Motion
- React Hook Form
- Zod
- i18next
- react-i18next
- Recharts
- Axios

### Backend

- Next.js Route Handlers
- REST API
- MySQL
- mysql2
- JWT authentication with `jose`
- Socket.IO
- Custom Node.js server

### Testing

- Vitest
- React Testing Library
- Testing Library User Event
- jsdom

### Infrastructure

- Docker
- Docker Compose
- Node.js 22
- MySQL 8.4

## Requirements

For the recommended Docker setup, install:

- Git
- Docker Desktop with Docker Compose

For local development without running the application itself inside Docker, install additionally:

- Node.js 22+
- npm

## Quick Start with Docker

Clone the repository:

```bash
git clone <repository-url>
cd orders-products-dashboard
```

Create the local environment file from the provided example.

Windows CMD:

```bat
copy .env.example .env.local
```

macOS / Linux:

```bash
cp .env.example .env.local
```

Build and start the application:

```bash
docker compose up -d --build
```

Check the container status:

```bash
docker compose ps
```

Expected result:

- application container is running
- MySQL container is running
- MySQL reports `healthy`

Open the application:

```text
http://localhost:3000
```

### Demo Credentials

```text
Email: admin@example.com
Password: admin123
```

After successful authentication, the application creates an HTTP-only JWT session cookie.

### Verify the Database Connection

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

## Environment Variables

The repository contains `.env.example`.

For a local demo setup, copy it to `.env.local`.

Windows CMD:

```bat
copy .env.example .env.local
```

macOS / Linux:

```bash
cp .env.example .env.local
```

Example configuration:

```env
JWT_SECRET=orders-products-dashboard-development-secret-change-in-production

DEMO_USER_EMAIL=admin@example.com
DEMO_USER_PASSWORD=admin123

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

The provided values are intended only for local development and demo purposes.

For a real deployment, replace:

- `JWT_SECRET`
- demo user credentials
- MySQL passwords

Do not commit `.env.local`.

## Docker

Docker Compose starts:

- Next.js application
- MySQL database

The database is initialized automatically from:

```text
database/schema.sql
database/seed.sql
```

Start the project:

```bash
docker compose up -d --build
```

Check running services:

```bash
docker compose ps
```

Stop the project:

```bash
docker compose down
```

Stop the project and remove the MySQL volume:

```bash
docker compose down -v
```

The `-v` option removes persisted database data.

On the next clean startup, the database schema and seed data are recreated automatically from `database/schema.sql` and `database/seed.sql`.

If port `3306` is already used by a local MySQL installation, stop that local service or change the host-side MySQL port in `docker-compose.yml`.

## Local Development

The Next.js application can run directly on the host while MySQL runs in Docker.

Install dependencies:

```bash
npm ci
```

Create the environment file.

Windows CMD:

```bat
copy .env.example .env.local
```

macOS / Linux:

```bash
cp .env.example .env.local
```

For host-based development, keep:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
```

Start MySQL:

```bash
docker compose up -d mysql
```

Check MySQL:

```bash
docker compose ps
```

Start the development server:

```bash
npm run dev
```

The custom Node.js server starts both Next.js and Socket.IO.

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

The database schema is located at:

```text
database/schema.sql
```

Initial demo data is located at:

```text
database/seed.sql
```

The schema uses foreign keys.

Deleting an order automatically deletes related products, and deleting a product automatically deletes related prices through `ON DELETE CASCADE`.

### Database Health Endpoint

```text
GET /api/health/db
```

Example:

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

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Sign in |
| `GET` | `/api/auth/session` | Get current session |
| `POST` | `/api/auth/logout` | Sign out |
| `GET` | `/api/orders` | Get orders |
| `POST` | `/api/orders` | Create an order |
| `DELETE` | `/api/orders/:id` | Delete an order |
| `GET` | `/api/products` | Get products |
| `GET` | `/api/health/db` | Check database connection |

## Real-Time Sessions

Socket.IO is integrated into the custom Node.js server.

Each connected browser tab creates its own Socket.IO connection.

The application displays the number of active browser sessions in real time.

For example:

```text
1 browser tab  → 1 active session
2 browser tabs → 2 active sessions
3 browser tabs → 3 active sessions
```

Closing a tab decreases the counter automatically.

Because Socket.IO requires a persistent Node.js server, the project uses `server.ts` instead of relying only on a serverless runtime.

## Internationalization

The interface supports:

- English
- Ukrainian

The selected language is stored in browser Web Storage and restored after reload.

## Testing

Run the complete test suite:

```bash
npm run test:run
```

The test suite covers:

- Redux selectors
- UI components
- product filtering
- order form validation
- REST API route behavior

API route tests mock the repository layer, so they do not require a live MySQL instance.

Real MySQL integration can be verified through Docker and:

```text
GET /api/health/db
```

Current verified test result:

```text
Test Files  7 passed (7)
Tests       29 passed (29)
```

## Code Quality

Run ESLint:

```bash
npm run lint
```

Verify the production build:

```bash
npm run build
```

Recommended validation sequence:

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

The project follows a layered structure:

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

This keeps API route handlers independent from raw SQL queries and makes them easier to test.

## Clean Repository Verification

A reviewer can verify the project from a clean clone with:

```bash
git clone <repository-url>
cd orders-products-dashboard
```

Create the environment file.

Windows CMD:

```bat
copy .env.example .env.local
```

macOS / Linux:

```bash
cp .env.example .env.local
```

Start the complete stack:

```bash
docker compose up -d --build
```

Check container state:

```bash
docker compose ps
```

Check the database:

```bash
curl http://localhost:3000/api/health/db
```

Open:

```text
http://localhost:3000
```

Login using:

```text
Email: admin@example.com
Password: admin123
```

For source-code validation:

```bash
npm ci
npm run test:run
npm run lint
npm run build
```
