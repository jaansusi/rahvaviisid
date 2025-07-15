import {EkmViisidApiApplication} from './application';
import {exec} from 'child_process';
import {promisify} from 'util';

const execAsync = promisify(exec);

// export async function migrate(args: string[]) {
//   const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
//   console.log('Migrating schemas (%s existing schema)', existingSchema);

//   const app = new EkmViisidApiApplication();
//   await app.boot();
//   await app.migrateSchema({existingSchema});

//   // Connectors usually keep a pool of opened connections,
//   // this keeps the process running even after all work is done.
//   // We need to exit explicitly.
//   process.exit(0);
// }

export async function runDbMigrations(): Promise<void> {
  try {
    console.log('Running database migrations...');
    const { stdout, stderr } = await execAsync(
      'npx db-migrate up --env migrate --config ./migrations/database.json',
      { cwd: process.cwd(), maxBuffer: 1024 * 5000 }
    );
    
    if (stdout) {
      console.log('Migration output:', stdout);
    }
    if (stderr && !stderr.includes('received')) {
      console.error('Migration errors:', stderr);
    }
    
    console.log('Database migrations completed successfully');
  } catch (error) {
    console.error('Error running database migrations:', error);
    throw error;
  }
}

export async function runMigration() {
  await runDbMigrations();
  // await migrate([]);
}

// migrate(process.argv).catch(err => {
//   console.error('Cannot migrate database schema', err);
//   process.exit(1);
// });
