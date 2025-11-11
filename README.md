# Where's Waldo?

<div align="center">
  <img align="center" src="waldo.webp" alt="Waldo">
</div>

A full-stack web game where players find hidden characters in detailed scenes and compete for the fastest time on the leaderboard.

![Node version](https://img.shields.io/badge/Node.js->=20-3c873a?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-yellow?style=flat-square)

## Overview

This is a modern implementation of the classic "Where's Waldo?" game, built with a full-stack TypeScript architecture. Players search for specific characters in detailed scenario images, with their completion times tracked and compared against other players on a leaderboard system.

The application features:

- **Interactive gameplay**: Click to locate characters within large scenario images
- **Real-time validation**: Instant feedback when selecting character locations
- **Time tracking**: Precise timing from game start to completion
- **Leaderboard system**: Top 10 scores saved per scenario
- **Multiple scenarios**: Different scenes with unique characters to find

## Architecture

This is a monorepo containing two main packages:

### API (`/api`)

RESTful API built with Node.js and Express that handles:

- Character coordinate validation
- Scenario and character data management
- Score persistence and leaderboard queries
- PostgreSQL database with Drizzle ORM

### Web (`/web`)

React-based single-page application featuring:

- React 19 with TypeScript
- TanStack Query for server state management
- Zustand for client state management
- React Router for navigation
- Tailwind CSS for styling
- Vite for build tooling

## Features

- **Character Detection**: Click on the image to mark where you think characters are hiding
- **Target Box**: Visual feedback showing your selected area
- **Character Menu**: Track which characters you've found
- **Score Timer**: Real-time timer tracking your progress
- **Winner Modal**: Celebration screen with time and leaderboard qualification
- **Top 10 Leaderboard**: Submit your score if you make it to the top 10
- **Multiple Scenarios**: Choose from different scenes with varying difficulty
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **React Router 7** - Routing
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client
- **Vitest** - Unit testing
- **Playwright** - End-to-end testing
- **Testing Library** - Component testing

### Backend

- **Node.js** - Runtime
- **Express 5** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database
- **Zod** - Schema validation
- **Vitest** - Testing framework
- **Supertest** - API testing

### Development Tools

- **pnpm** - Package manager
- **Biome** - Linting and formatting
- **tsx** - TypeScript execution
- **Drizzle Kit** - Database migrations

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **pnpm** >= 10
- **PostgreSQL** database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/danielz0102/where-is-waldo.git
   cd where-is-waldo
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   Create `.env` file in the `/api` directory. Only these variables are mandatory:

   ```env
   DEV_DB_URL=postgresql://user:password@localhost:5432/waldo_dev
   TEST_DB_URL=postgresql://user:password@localhost:5432/waldo_test
   ```

   Create `.env` file in the `/web` directory:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Set up the database:

   ```bash
   cd api
   pnpm db generate
   pnpm db migrate
   pnpm db push
   ```

5. Seed the database (optional):
   ```bash
   pnpm seed:test
   ```

### Running the Application

#### Development Mode

Run both frontend and backend concurrently:

```bash
pnpm dev
```

This starts:

- API server at `http://localhost:3000`
- Web app at `http://localhost:5173`

#### Run Separately

**API only:**

```bash
cd api
pnpm dev
```

**Web only:**

```bash
cd web
pnpm dev
```

### Building for Production

**Build API:**

```bash
cd api
pnpm build
pnpm start
```

**Build Web:**

```bash
cd web
pnpm build
pnpm preview
```

## Project Structure

```
where-is-waldo/
├── api/                          # Backend API
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   ├── models/               # Business logic
│   │   ├── repositories/         # Database access
│   │   ├── routers/              # Route definitions
│   │   ├── schemas/              # Zod validation schemas
│   │   ├── middlewares/          # Express middlewares
│   │   ├── db/                   # Database configuration
│   │   └── lib/                  # Utility functions
│   ├── tests/                    # API tests
│   └── drizzle/                  # Database migrations
│
├── web/                          # Frontend application
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── pages/                # Page components
│   │   ├── services/             # API services
│   │   ├── querys/               # TanStack Query hooks
│   │   ├── stores/               # Zustand stores
│   │   ├── useCases/             # Business logic
│   │   └── lib/                  # Utility functions
│   ├── tests/                    # Frontend tests
│   │   ├── e2e/                  # Playwright tests
│   │   └── integration/          # Component tests
│   └── public/                   # Static assets
│
├── biome.json                    # Biome configuration
├── pnpm-workspace.yaml           # pnpm workspace config
└── vitest.config.ts              # Vitest configuration
```

## Testing

### Run All Tests

```bash
# API tests
cd api
pnpm test

# Web unit tests
cd web
pnpm test

# Web E2E tests
cd web
pnpm test:e2e
```

### Type Checking

```bash
# API
cd api
pnpm check

# Web
cd web
pnpm check
```

### Linting and Formatting

```bash
# Lint
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format
```

## API Endpoints

### Scenarios

- `GET /api/scenarios` - Get all scenarios
- `GET /api/scenarios/:id` - Get scenario by ID
- `GET /api/scenarios/slug/:slug` - Get scenario by slug

### Characters

- `GET /api/characters/scenario/:scenarioId` - Get characters for a scenario
- `POST /api/characters/validate` - Validate character location

### Scores

- `GET /api/scores/scenario/:scenarioId` - Get top 10 scores for a scenario
- `POST /api/scores` - Submit a new score
- `GET /api/scores/isTop10/:scenarioId/:seconds` - Check if time qualifies for top 10

## Database Schema

### scenarios

- `id` - UUID primary key
- `name` - Scenario name
- `slug` - URL-friendly identifier
- `imgUrl` - Image URL

### characters

- `id` - UUID primary key
- `name` - Character name
- `imgUrl` - Character image URL
- `minX`, `maxX`, `minY`, `maxY` - Coordinate boundaries
- `scenarioId` - Foreign key to scenarios

### scores

- `id` - UUID primary key
- `username` - Player username
- `time` - Completion time
- `scenarioId` - Foreign key to scenarios

## How to Play

1. **Select a Scenario**: Choose a scene from the scenario selection screen
2. **Find the Characters**: Character portraits appear at the top of the screen
3. **Click to Search**: Click anywhere on the image where you think a character is hiding
4. **Select Character**: A menu appears - click the character you found
5. **Win the Game**: Find all characters as quickly as possible
6. **Submit Score**: If you're fast enough, submit your name to the leaderboard

## Development

### Adding New Scenarios

1. Add scenario image to your hosting service
2. Insert scenario record in database with image URL
3. Add character records with coordinate boundaries
4. Characters will automatically appear in the game

### Database Migrations

```bash
cd api
pnpm db generate    # Generate migration from schema changes
pnpm db migrate     # Run migrations
pnpm db push        # Push schema to database
pnpm db studio      # Open Drizzle Studio
```

## Performance Considerations

- Images are loaded from external CDN
- Query results cached with TanStack Query
- Optimistic updates for better UX
- Lazy loading for route components
- Production builds minified and optimized

## Acknowledgments

Inspired by the classic "Where's Waldo?" books by Martin Handford.
