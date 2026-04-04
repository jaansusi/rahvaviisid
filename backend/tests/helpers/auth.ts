import {APIRequestContext} from '@playwright/test';

export interface TestUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: string[];
  isActive: boolean;
  username: string;
}

export const ADMIN_USER: TestUser = {
  email: 'test-admin@example.com',
  password: 'TestAdmin#12345!',
  firstName: 'Test',
  lastName: 'Admin',
  roles: ['admin'],
  isActive: true,
  username: 'test-admin',
};

export const EDITOR_USER: TestUser = {
  email: 'test-editor@example.com',
  password: 'TestEditor#12345!',
  firstName: 'Test',
  lastName: 'Editor',
  roles: ['editor'],
  isActive: true,
  username: 'test-editor',
};

export async function createUser(
  request: APIRequestContext,
  user: TestUser,
): Promise<{id: string}> {
  const response = await request.post('/users', {
    data: user,
  });
  return response.json();
}

export async function login(
  request: APIRequestContext,
  email: string,
  password: string,
): Promise<string> {
  const response = await request.post('/users/login', {
    data: {email, password},
  });
  const body = await response.json();
  return body.token;
}

export async function getAuthHeaders(
  request: APIRequestContext,
  user: TestUser,
): Promise<Record<string, string>> {
  const token = await login(request, user.email, user.password);
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}
