import {test, expect} from '@playwright/test';
import {ADMIN_USER, getAuthHeaders, login} from './helpers/auth';
import {deleteUserCredentials} from './helpers/db';

test.describe('Users CRUD (admin-only)', () => {
  let adminHeaders: Record<string, string>;

  test.beforeAll(async ({request}) => {
    adminHeaders = await getAuthHeaders(request, ADMIN_USER);
  });

  test('GET /users - lists all users', async ({request}) => {
    const response = await request.get('/users', {headers: adminHeaders});

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThanOrEqual(1);
    // Verify user shape
    const user = body[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('roles');
  });

  test('GET /users/count - returns user count', async ({request}) => {
    const response = await request.get('/users/count', {
      headers: adminHeaders,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('count');
    expect(typeof body.count).toBe('number');
    expect(body.count).toBeGreaterThanOrEqual(1);
  });

  test('POST /users - creates a new user and GET /users/{id} retrieves it', async ({
    request,
  }) => {
    const uniqueEmail = `test-${Date.now()}@example.com`;
    const newUser = {
      email: uniqueEmail,
      password: 'NewUser#123456!',
      firstName: 'New',
      lastName: 'User',
      roles: ['editor'],
      isActive: true,
      username: `newuser-${Date.now()}`,
    };

    // Create
    const createRes = await request.post('/users', {
      data: newUser,
      headers: adminHeaders,
    });
    expect(createRes.status()).toBe(200);
    const created = await createRes.json();
    expect(created).toHaveProperty('id');
    expect(created.email).toBe(uniqueEmail);
    expect(created.firstName).toBe('New');

    // Read back
    const getRes = await request.get(`/users/${created.id}`, {
      headers: adminHeaders,
    });
    expect(getRes.status()).toBe(200);
    const fetched = await getRes.json();
    expect(fetched.id).toBe(created.id);
    expect(fetched.email).toBe(uniqueEmail);

    // Cleanup: delete credentials first (FK constraint), then user
    await deleteUserCredentials(created.id);
    const delRes = await request.delete(`/users/${created.id}`, {
      headers: adminHeaders,
    });
    expect(delRes.status()).toBe(204);
  });

  test('PATCH /users/{id} - updates user fields', async ({request}) => {
    // Create a disposable user
    const email = `patch-test-${Date.now()}@example.com`;
    const createRes = await request.post('/users', {
      data: {
        email,
        password: 'PatchTest#12345!',
        firstName: 'Before',
        lastName: 'Update',
        roles: ['editor'],
        isActive: true,
        username: `patchuser-${Date.now()}`,
      },
      headers: adminHeaders,
    });
    const created = await createRes.json();

    // Update
    const patchRes = await request.patch(`/users/${created.id}`, {
      data: {firstName: 'After'},
      headers: adminHeaders,
    });
    expect(patchRes.status()).toBe(204);

    // Verify update
    const getRes = await request.get(`/users/${created.id}`, {
      headers: adminHeaders,
    });
    const updated = await getRes.json();
    expect(updated.firstName).toBe('After');

    // Cleanup
    await deleteUserCredentials(created.id);
    await request.delete(`/users/${created.id}`, {headers: adminHeaders});
  });

  test('DELETE /users/{id} - deletes a user', async ({request}) => {
    const email = `delete-test-${Date.now()}@example.com`;
    const createRes = await request.post('/users', {
      data: {
        email,
        password: 'DeleteTest#1234!',
        firstName: 'Delete',
        lastName: 'Me',
        roles: ['editor'],
        isActive: true,
        username: `deluser-${Date.now()}`,
      },
      headers: adminHeaders,
    });
    const created = await createRes.json();

    // Delete credentials first (FK constraint), then user
    await deleteUserCredentials(created.id);
    const delRes = await request.delete(`/users/${created.id}`, {
      headers: adminHeaders,
    });
    expect(delRes.status()).toBe(204);

    // Verify deletion - should return 404
    const getRes = await request.get(`/users/${created.id}`, {
      headers: adminHeaders,
    });
    expect(getRes.status()).toBeGreaterThanOrEqual(400);
  });

  test('GET /users/{id} - returns 404 for non-existent user', async ({
    request,
  }) => {
    const response = await request.get(
      '/users/00000000-0000-0000-0000-000000000000',
      {headers: adminHeaders},
    );
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('newly created user can log in', async ({request}) => {
    const email = `login-test-${Date.now()}@example.com`;
    const password = 'LoginTest#12345!';
    const createRes = await request.post('/users', {
      data: {
        email,
        password,
        firstName: 'Login',
        lastName: 'Test',
        roles: ['editor'],
        isActive: true,
        username: `loginuser-${Date.now()}`,
      },
      headers: adminHeaders,
    });
    const created = await createRes.json();

    const token = await login(request, email, password);
    expect(token).toBeTruthy();
    expect(token.split('.')).toHaveLength(3);

    // Cleanup
    await deleteUserCredentials(created.id);
    await request.delete(`/users/${created.id}`, {headers: adminHeaders});
  });
});
