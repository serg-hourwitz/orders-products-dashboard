# Orders & Products Dashboard

A full-stack Orders & Products management dashboard built with Next.js, React, TypeScript, Redux Toolkit, MySQL, REST API, JWT authentication, Socket.IO, Docker, internationalization, analytics charts, and automated tests.

The project demonstrates a production-oriented SPA architecture with persistent data storage, protected routes, real-time browser session tracking, responsive UI, containerization, and cloud deployment.

## Live Demo

The production application is available at:

https://orders-products-dashboard.onrender.com

### Demo Credentials

```text
Email: admin@example.com
Password: admin123
```

### Database Health

Production database health endpoint:

```text
https://orders-products-dashboard.onrender.com/api/health/db
```

Expected response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

> The application is hosted on Render's free tier. The service may spin down
> after a period of inactivity, so the first request can take additional time.

## Features

### Orders

- Orders list
- Order details view
- Product count for each order
- Order dates in multiple formats
- Total order prices in USD and UAH
- Order creation
- Form validation
- Order deletion
- Delete confirmation modal
- Related products displayed in order details
- Persistent database storage

### Products

- Products list
- Product type filtering
- Product title and type
- Product guarantee dates
- Product prices in USD and UAH
- Related order information
- Product analytics by type

### Authentication

- JWT-based authentication
- HTTP-only session cookie
- Protected application routes
- Persistent authentication between browser sessions
- Login and logout flows
- Server-side route protection

### Real-Time Sessions

- Socket.IO integration
- Active browser sessions counter
- Each connected browser tab is tracked as an individual active session
- Session count updates when tabs connect or disconnect

### User Experience

- Responsive desktop and mobile layouts
- Mobile navigation drawer
- Animated UI transitions with Framer Motion
- English and Ukrainian localization
- Language preference persistence using Web Storage
- Analytics charts
- Lazy-loaded chart components
- Custom 404 page

### Engineering

- TypeScript
- Redux Toolkit global state
- REST API
- Repository-based database access
- MySQL persistence
- Docker and Docker Compose
- Production Docker image
- Automated unit and API route tests
- ESLint
- Production cloud deployment

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
- Custom Node.js server
- MySQL
- mysql2
- JWT authentication with `jose`
- Socket.IO

### Testing

- Vitest
- React Testing Library
- Testing Library User Event
- jsdom

### Infrastructure

Local environment:

- Docker
- Docker Compose
- Node.js 22
- MySQL 8.4

Production environment:

- Render Web Service
- Docker
- TiDB Cloud Starter
- MySQL-compatible database protocol
- TLS database connection

## Architecture

The application follows a layered architecture:

```text
UI Components
      ↓
Redux / Services
      ↓
REST API
      ↓
Repositories
      ↓
Database
```

Database access is isolated in the repository layer.

This keeps API route handlers independent from raw SQL queries, improves separation of concerns, and makes the API layer easier to test.

The application uses a custom Node.js server to run Next.js and Socket.IO through the same HTTP server.

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

## Requirements

For the recommended Docker setup, install:

- Git
- Docker Desktop with Docker Compose

For local development with the Next.js application running directly on the host, install additionally:

- Node.js 22+
- npm

## Quick Start with Docker

Clone the repository:

```bash
git clone https://github.com/serg-hourwitz/orders-products-dashboard.git
cd orders-products-dashboard
```

Create the local environment file.

### Windows CMD

```bat
copy .env.example .env.local
```

### macOS / Linux

```bash
cp .env.example .env.local
```

Build and start the complete application:

```bash
docker compose up -d --build
```

Check the containers:

```bash
docker compose ps
```

Expected result:

- application container is running
- MySQL container is running
- MySQL reports `healthy`

Open:

```text
http://localhost:3000
```

Sign in using:

```text
Email: admin@example.com
Password: admin123
```

## Local Development

The Next.js application can also run directly on the host while MySQL runs in Docker.

Install dependencies:

```bash
npm ci
```

Create `.env.local`.

Windows:

```bat
copy .env.example .env.local
```

macOS / Linux:

```bash
cp .env.example .env.local
```

For local development, use:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_SSL=false
```

Start only MySQL:

```bash
docker compose up -d mysql
```

Check its state:

```bash
docker compose ps
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The custom Node.js server starts both Next.js and Socket.IO.

## Environment Variables

The repository contains `.env.example`.

Example local configuration:

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
DB_SSL=false
```

`MYSQL_*` variables configure the local MySQL Docker container.

`DB_*` variables configure the application's database connection.

For cloud databases that require TLS:

```env
DB_SSL=true
```

Production secrets are configured through the hosting platform and are not stored in the repository.

Never commit `.env.local`, production database passwords, or production JWT secrets.

## Database

The application uses three main tables:

```text
orders
  │
  └── products
        │
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

Deleting an order automatically deletes its related products. Deleting a product automatically deletes its related prices through `ON DELETE CASCADE`.

### Local Database

The local Docker environment uses:

```text
MySQL 8.4
```

Docker initializes the database from:

```text
database/schema.sql
database/seed.sql
```

### Database Health Endpoint

```text
GET /api/health/db
```

Local example:

```bash
curl http://localhost:3000/api/health/db
```

Production:

```text
https://orders-products-dashboard.onrender.com/api/health/db
```

Expected response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

## REST API

Protected endpoints require authentication.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Sign in |
| `GET` | `/api/auth/session` | Get the current session |
| `POST` | `/api/auth/logout` | Sign out |
| `GET` | `/api/orders` | Get orders |
| `POST` | `/api/orders` | Create an order |
| `DELETE` | `/api/orders/:id` | Delete an order |
| `GET` | `/api/products` | Get products |
| `GET` | `/api/health/db` | Check database connection |

## Authentication

Authentication is implemented using JWT.

After successful login:

1. the server validates the demo credentials
2. a JWT is created
3. the token is stored in an HTTP-only cookie
4. protected routes become accessible

Authentication persists while the session cookie remains valid.

Logging out removes the session and redirects the user to the login page.

Protected application routes include:

```text
/orders
/products
```

## Real-Time Active Sessions

Socket.IO is integrated into the custom Node.js server.

Each connected browser tab creates its own Socket.IO connection.

For example:

```text
1 browser tab  → 1 active session
2 browser tabs → 2 active sessions
3 browser tabs → 3 active sessions
```

Closing a browser tab disconnects its Socket.IO connection and decreases the active sessions counter after the disconnect is detected by the server.

Because Socket.IO requires a persistent Node.js process, the project uses `server.ts` rather than relying exclusively on a serverless runtime.

## Internationalization

The interface supports:

- English
- Ukrainian

The selected language is stored in browser Web Storage and restored after reload.

This provides persistent language preferences without requiring a user account setting.

## Analytics

The application includes analytics charts built with Recharts.

Chart components are lazy-loaded to avoid including analytics code in the initial page rendering path unnecessarily.

Product analytics include product distribution by type.

## Responsive Design

The application supports desktop, tablet, and mobile layouts.

Desktop navigation uses a sidebar.

At smaller viewport widths, the sidebar is replaced with a mobile header and navigation drawer.

The mobile menu supports:

- animated opening and closing
- backdrop closing
- close button
- route selection
- Escape key
- language switching
- session information
- logout

## Docker

Docker Compose runs:

```text
Next.js / Node.js application
            +
        MySQL 8.4
```

Start the complete stack:

```bash
docker compose up -d --build
```

Check services:

```bash
docker compose ps
```

Stop the stack:

```bash
docker compose down
```

Stop the stack and delete persisted MySQL data:

```bash
docker compose down -v
```

The `-v` option removes the MySQL volume.

On the next clean startup, the schema and seed data are initialized again from:

```text
database/schema.sql
database/seed.sql
```

If port `3306` is already occupied by a local MySQL installation, stop the local service or change the host-side MySQL port in `docker-compose.yml`.

## Production Deployment

The production application is deployed as a Docker-based Web Service on Render.

### Application

```text
Platform: Render
Service: Web Service
Runtime: Docker
Region: Frankfurt (EU Central)
```

Production URL:

```text
https://orders-products-dashboard.onrender.com
```

The production service runs the same custom Node.js server used by the project, allowing Next.js and Socket.IO to operate in the same container.

### Production Database

The production database is hosted on TiDB Cloud Starter.

```text
Database: TiDB Cloud
Protocol: MySQL-compatible
Connection: TLS
```

The application connects using `mysql2`.

Production database credentials are supplied through Render environment variables and are never stored in source control.

The production database contains the same relational model used by the local MySQL environment:

```text
orders
  │
  └── products
        │
        └── product_prices
```

### WebSocket Deployment

Socket.IO runs through the Render Web Service using the same HTTP server as Next.js.

This allows the active sessions counter to work in the deployed application without requiring a separate WebSocket service.

### Free Tier Note

The production demo uses Render's free compute tier.

The service can spin down after a period of inactivity. As a result, the first request after an idle period can take longer while the application starts.

Subsequent requests operate normally while the service remains active.

## Testing

Run the complete automated test suite:

```bash
npm run test:run
```

The tests cover:

- Redux selectors
- UI components
- product filtering
- order form validation
- order creation behavior
- REST API routes
- repository interaction through mocked boundaries

API route tests mock the repository layer, so the automated suite does not require a live MySQL instance.

Database integration can be verified separately using:

```text
GET /api/health/db
```

Current verified result:

```text
Test Files  7 passed (7)
Tests       29 passed (29)
```

## Code Quality

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Recommended final validation:

```bash
npm run lint
npm run test:run
npm run build
```

## Available Scripts

Development server:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Production server:

```bash
npm run start
```

ESLint:

```bash
npm run lint
```

Tests in watch mode:

```bash
npm test
```

Run tests once:

```bash
npm run test:run
```

Test coverage:

```bash
npm run test:coverage
```

## Clean Repository Verification

A reviewer can reproduce the project from a clean clone.

Clone:

```bash
git clone https://github.com/serg-hourwitz/orders-products-dashboard.git
cd orders-products-dashboard
```

Create the environment file.

Windows:

```bat
copy .env.example .env.local
```

macOS / Linux:

```bash
cp .env.example .env.local
```

Start the complete Docker environment:

```bash
docker compose up -d --build
```

Check containers:

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

Login:

```text
Email: admin@example.com
Password: admin123
```

For source-code validation:

```bash
npm ci
npm run lint
npm run test:run
npm run build
```

## Production Verification

A reviewer can test the deployed version without installing the project locally.

Open:

```text
https://orders-products-dashboard.onrender.com
```

Login:

```text
Email: admin@example.com
Password: admin123
```

Recommended production checks:

1. Sign in and open Orders.
2. Open order details.
3. Create an order.
4. Reload the page and verify that the order persists.
5. Delete the created order.
6. Open Products and test product type filtering.
7. Switch between English and Ukrainian.
8. Reload and verify that the selected language persists.
9. Open the application in another browser tab and verify the active sessions counter.
10. Test the responsive mobile navigation.
11. Log out and verify that protected routes redirect to login.
12. Check the database health endpoint.

## Git Workflow

The project was developed incrementally using Git feature and setup branches with focused commits.

The repository history demonstrates the implementation of the main features, including:

- project configuration
- Redux state
- Orders UI
- Products UI
- REST API
- order creation and deletion
- Socket.IO
- internationalization
- automated tests
- analytics
- JWT authentication
- Docker
- MySQL persistence
- responsive UI
- production deployment support

## Summary

Orders & Products Dashboard demonstrates a full-stack React/Next.js application with:

- component-based UI
- global state management
- routing
- REST API
- persistent relational data
- authentication
- real-time WebSocket communication
- responsive design
- internationalization
- Web Storage
- form validation
- analytics
- automated testing
- Docker
- cloud deployment

The project can be evaluated either through the live production deployment or reproduced locally using Docker Compose.
