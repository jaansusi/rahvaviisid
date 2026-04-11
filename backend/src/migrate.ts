// eslint-disable-next-line @typescript-eslint/no-var-requires
const DBMigrate = require('db-migrate');

export async function runDbMigrations(): Promise<void> {
  console.log('Running database migrations...');
  const dbmigrate = DBMigrate.getInstance(true, {
    config: './migrations/database.json',
    env: 'dev',
  });
  await dbmigrate.up();
  console.log('Database migrations completed successfully');
}

export async function runMigration() {
  await runDbMigrations();
}
