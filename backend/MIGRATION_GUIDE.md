# Automatic Database Migrations

This LoopBack 4 application has been configured to automatically run database migrations on startup using the `loopback4-migration` package and a custom `MigrationComponent`.

## How it works

1. **MigrationComponent**: A custom LoopBack 4 component that implements the `LifeCycleObserver` interface
2. **Automatic Execution**: Migrations run automatically during the application startup phase
3. **db-migrate Integration**: Uses the existing `db-migrate` setup to run SQL migrations from the `migrations/` directory

## Configuration

The migration component can be configured in your application. The following options are available:

```typescript
interface MigrationComponentConfig {
  autoMigrate?: boolean;           // Default: true
  failOnMigrationError?: boolean;  // Default: true
  migrationConfigPath?: string;    // Default: './migrations/database.json'
  migrationEnvironment?: string;   // Default: 'migrate'
}
```

### Example configuration in `application.ts`:

```typescript
this.configure('migration').to({
  autoMigrate: true,
  failOnMigrationError: true,
  migrationConfigPath: './migrations/database.json',
  migrationEnvironment: 'migrate'
});
```

## Environment Variables

The migration system uses the same environment variables as your existing `db-migrate` setup:

- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `DB_DATABASE`: Database name

## Migration Files

Migration files are located in the `migrations/` directory and follow the `db-migrate` naming convention:
- `YYYYMMDDHHMMSS-description.js`

## Logs

During startup, you'll see migration logs:
- `🔄 Starting automatic database migrations...`
- `✅ Database migrations completed successfully`
- `❌ Database migrations failed:` (if errors occur)

## Disable Automatic Migrations

To disable automatic migrations (for example, in development), you can configure the component:

```typescript
this.configure('migration').to({
  autoMigrate: false
});
```

## Manual Migration

You can still run migrations manually using:
```bash
npm run database:migrate
```

## Docker

When running in Docker, migrations will run automatically as part of the container startup process. Make sure your database is accessible and environment variables are properly set.
