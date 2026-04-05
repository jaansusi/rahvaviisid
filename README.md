# Nora - Estonian Folk Songs API & Frontend

Eesti Kirjandusmuuseumi rahvaviiside API ja veebiliides (Estonian Literary Museum Folk Songs API and Web Interface).

## Project Structure

- **backend/**: LoopBack 4 API server with PostgreSQL database
- **frontend/**: React application for the web interface
- **scripts/**: Utility scripts for data processing
- **docu/**: Documentation files

## Prerequisites

- **Node.js** (>= 16.x recommended)
- **PostgreSQL** (>= 13.x)
- **Docker & Docker Compose** (for containerized setup)

## Development Setup

### Option 1: Local Development

#### Backend API Setup

The backend is a LoopBack 4 application that provides a REST API for managing Estonian folk songs data.

1. **Install PostgreSQL server** and create a database named `kivi`

2. **Navigate to backend directory** and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. **Configure database connection**:
   - Update `backend/migrations/database.json` with your PostgreSQL credentials
   - Or set environment variables for quick development:
     ```bash
     export DB_HOST=localhost
     export DB_PORT=5432
     export DB_USERNAME=your_username
     export DB_DATABASE=kivi
     export DB_PASSWORD=your_password
     ```

4. **Run database migrations**:
   ```bash
   npm run devdb:migrate
   ```

5. **Start the development server**:
   ```bash
   npm run dev:start
   ```

The API will be available at `http://localhost:3000` with the REST API explorer at `http://localhost:3000/explorer`.

#### Frontend Setup

The frontend is a React application that provides the user interface for browsing and managing folk songs.

1. **Navigate to frontend directory** and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. **Configure API endpoint** (if needed):
   - Update `src/config.js` to point to your backend API URL

3. **Start the development server**:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3001` and will automatically proxy API requests to the backend.

### Option 2: Docker Development

#### Using Docker Compose

The project includes a `compose.yaml` file that sets up all services including PostgreSQL, pgAdmin, backend, and frontend.

**Option 1:**

1. **Start all services**
   ```bash
   docker-compose --profile all up -d
   ```

   This will start all required services.

**Option 2:**

1. **Start database**:
   ```bash
   docker-compose up -d
   ```

   This will start:
   - PostgreSQL database on port 5432
   - pgAdmin on port 5050 (admin@example.com / admin)

2. **Start DB + API**
   ```bash
   docker-compose --profile backend up -d
   ````

   This will start:
   - PostgreSQL database on port 5432
   - pgAdmin on port 5050 (admin@example.com / admin)
   - Backend API on port 3000

3. **Start DB + FE**
   ```
   docker-compose --profile frontend up -d
   ```

   This will start:
   - PostgreSQL database on port 5432
   - pgAdmin on port 5050 (admin@example.com / admin)
   - Frontend on port 3001

4. **View logs**:
   ```bash
   docker-compose logs -f
   ```

5. **Stop services**:
   ```bash
   docker-compose --profile all down
   ```

#### Individual Docker Builds

**Backend:**
```bash
cd backend
npm run docker:build
npm run docker:run
```

**Frontend:**
```bash
cd frontend
npm run docker:build
npm run docker:run
```

## Production Deployment

### Building Docker Images

**Backend:**
```bash
cd backend
npm run docker:release
```

**Frontend:**
```bash
cd frontend
npm run docker:release
```

### Environment Variables

For production deployment, set the following environment variables:

**Backend:**
- `DB_HOST`: Database host
- `DB_PORT`: Database port (default: 5432)
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `DB_DATABASE`: Database name (default: kivi)
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 3000)

## Available Scripts

### Backend
- `npm start`: Start the production server
- `npm run dev:start`: Start development server with local DB config
- `npm run build`: Build TypeScript to JavaScript
- `npm run build:watch`: Build and watch for changes
- `npm run test`: Run tests
- `npm run lint`: Check code style
- `npm run database:migrate`: Run database migrations
- `npm run openapi-spec`: Generate OpenAPI specification

### Frontend
- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run tests
- `npm run lint`: Check code style

## Database Management

### Creating the Application Database User

The application uses a dedicated PostgreSQL user (`local_user`) rather than the root `postgres` user. Before creating the database and running migrations, create this user:

1. **Connect to PostgreSQL as the root user**:
   ```bash
   psql -U postgres -h localhost
   ```

2. **Create the application user and grant permissions**:
   ```sql
   -- Create the application user
   CREATE USER local_user WITH PASSWORD 'local_user_password';

   -- Grant connect privilege on the database
   GRANT CONNECT ON DATABASE kivi TO local_user;

   -- Grant schema usage and table privileges
   GRANT USAGE ON SCHEMA folk_tune TO local_user;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA folk_tune TO local_user;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA folk_tune TO local_user;

   -- Ensure future tables in the schema are also accessible
   ALTER DEFAULT PRIVILEGES IN SCHEMA folk_tune
     GRANT ALL PRIVILEGES ON TABLES TO local_user;
   ALTER DEFAULT PRIVILEGES IN SCHEMA folk_tune
     GRANT ALL PRIVILEGES ON SEQUENCES TO local_user;
   ```

   > **Note:** The `folk_tune` schema is created by the first migration (`20210117110438-createSchema`). Run `npm run database:create` and then the schema migration before granting schema-level privileges, or run all the grants after `npm run database:migrate`.

3. **For production**, use strong credentials and set them via environment variables (`DB_USERNAME`, `DB_PASSWORD`) in your `.env` file. See `.env.template` for the full list of required variables.

### Creating and Managing Database

```bash
# Create database
cd backend
npm run devdb:create

# Run migrations
npm run devdb:migrate

# Drop database (careful!)
npm run devdb:drop
```

### pgAdmin Access

When using Docker Compose, pgAdmin is available at `http://localhost:5050`:
- Email: admin@example.com
- Password: admin

## API Documentation

Once the backend is running, visit `http://localhost:3000/explorer` to access the interactive API documentation powered by OpenAPI/Swagger.

## Troubleshooting

1. **Database connection issues**: Ensure PostgreSQL is running and credentials are correct
2. **Port conflicts**: Check if ports 3000, 3001, or 5432 are already in use
3. **Migration errors**: Ensure database exists and user has proper permissions
4. **Docker issues**: Make sure Docker daemon is running and you have sufficient disk space