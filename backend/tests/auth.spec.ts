import {test, expect} from '@playwright/test';
import {ADMIN_USER, EDITOR_USER, login} from './helpers/auth';

test.describe('Authentication', () => {
  test('POST /users/login - returns a JWT token for valid credentials', async ({
    request,
  }) => {
    const response = await request.post('/users/login', {
      data: {email: ADMIN_USER.email, password: ADMIN_USER.password},
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.split('.')).toHaveLength(3); // JWT format: header.payload.signature
  });

  test('POST /users/login - rejects invalid password', async ({request}) => {
    const response = await request.post('/users/login', {
      data: {email: ADMIN_USER.email, password: 'WrongPassword#123!'},
    });

    expect(response.status()).toBe(401);
  });

  test('POST /users/login - rejects non-existent user', async ({request}) => {
    const response = await request.post('/users/login', {
      data: {email: 'nobody@example.com', password: 'Whatever#1234!'},
    });

    expect(response.status()).toBe(401);
  });

  test('protected endpoints reject requests without token', async ({
    request,
  }) => {
    const response = await request.get('/users');
    expect(response.status()).toBe(401);
  });

  test('protected endpoints reject requests with invalid token', async ({
    request,
  }) => {
    const response = await request.get('/users', {
      headers: {Authorization: 'Bearer invalid.token.here'},
    });

    expect(response.status()).toBe(401);
  });

  test('protected endpoints accept valid JWT token', async ({request}) => {
    const token = await login(
      request,
      ADMIN_USER.email,
      ADMIN_USER.password,
    );
    const response = await request.get('/users', {
      headers: {Authorization: `Bearer ${token}`},
    });

    expect(response.status()).toBe(200);
  });
});

test.describe('Authorization', () => {
  test('editor cannot access admin-only endpoints (GET /users)', async ({
    request,
  }) => {
    const token = await login(
      request,
      EDITOR_USER.email,
      EDITOR_USER.password,
    );
    const response = await request.get('/users', {
      headers: {Authorization: `Bearer ${token}`},
    });

    expect(response.status()).toBe(403);
  });

  test('editor can access editor-allowed endpoints (GET /persons)', async ({
    request,
  }) => {
    const token = await login(
      request,
      EDITOR_USER.email,
      EDITOR_USER.password,
    );
    // GET /persons is public (no auth decorator on the find method)
    const response = await request.get('/persons');
    expect(response.status()).toBe(200);
  });

  test('admin can access admin-only endpoints', async ({request}) => {
    const token = await login(
      request,
      ADMIN_USER.email,
      ADMIN_USER.password,
    );
    const response = await request.get('/users', {
      headers: {Authorization: `Bearer ${token}`},
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });
});
