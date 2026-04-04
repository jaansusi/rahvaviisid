import {test as setup} from '@playwright/test';
import {ADMIN_USER, EDITOR_USER, login} from './helpers/auth';
import {seedUser} from './helpers/db';

/**
 * Global setup: ensures test users exist and the API is reachable.
 * Runs once before all other test projects.
 */
setup('seed test users', async ({request}) => {
  // Verify API is up
  const healthCheck = await request.get('/explorer/');
  if (!healthCheck.ok()) {
    throw new Error(
      `API is not reachable at the configured baseURL. Status: ${healthCheck.status()}`,
    );
  }

  // Seed users directly into the database (POST /users requires admin auth)
  await seedUser(ADMIN_USER);
  await seedUser(EDITOR_USER);

  // Verify admin can log in
  const adminToken = await login(
    request,
    ADMIN_USER.email,
    ADMIN_USER.password,
  );
  if (!adminToken) {
    throw new Error('Admin user login failed during setup');
  }
});
