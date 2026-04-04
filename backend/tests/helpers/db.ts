import {Client} from 'pg';
import {genSalt, hash} from 'bcryptjs';
import {TestUser} from './auth';

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'kivi',
};

export async function seedUser(user: TestUser): Promise<void> {
  const client = new Client(DB_CONFIG);
  await client.connect();
  try {
    // Check if user already exists
    const existing = await client.query(
      'SELECT id FROM folk_tune.users WHERE email = $1',
      [user.email],
    );
    if (existing.rows.length > 0) {
      return;
    }

    const passwordHash = await hash(user.password, await genSalt());
    const result = await client.query(
      `INSERT INTO folk_tune.users (email, roles, firstname, lastname, is_active, username)
       VALUES ($1, $2::text[], $3, $4, $5, $6)
       RETURNING id`,
      [user.email, user.roles, user.firstName, user.lastName, user.isActive, user.username],
    );
    const userId = result.rows[0].id;
    await client.query(
      'INSERT INTO folk_tune.user_credentials (password, userid) VALUES ($1, $2)',
      [passwordHash, userId],
    );
  } finally {
    await client.end();
  }
}

export async function deleteUserCredentials(userId: string): Promise<void> {
  const client = new Client(DB_CONFIG);
  await client.connect();
  try {
    await client.query(
      'DELETE FROM folk_tune.user_credentials WHERE userid = $1',
      [userId],
    );
  } finally {
    await client.end();
  }
}
