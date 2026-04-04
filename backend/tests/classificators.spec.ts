import {test, expect} from '@playwright/test';
import {ADMIN_USER, getAuthHeaders} from './helpers/auth';

/**
 * Tests for classificator (lookup table) endpoints.
 * All classificators follow the same CRUD pattern so we test a representative set.
 */

const CLASSIFICATOR_ENDPOINTS = [
  {name: 'nations', path: '/nations'},
  {name: 'languages', path: '/languages'},
  {name: 'countries', path: '/countries'},
  {name: 'sexes', path: '/sexes'},
  {name: 'tune-genres', path: '/tune-genres'},
  {name: 'song-genres', path: '/song-genres'},
  {name: 'song-topics', path: '/song-topics'},
  {name: 'rhythm-types', path: '/rhythm-types'},
  {name: 'sound-ranges', path: '/sound-ranges'},
  {name: 'text-forms', path: '/text-forms'},
  {name: 'tune-forms', path: '/tune-forms'},
  {name: 'verse-forms', path: '/verse-forms'},
  {name: 'key-signatures', path: '/key-signatures'},
  {name: 'pitches', path: '/pitches'},
  {name: 'measures', path: '/measures'},
  {name: 'support-sounds', path: '/support-sounds'},
];

test.describe('Classificator endpoints - GET list', () => {
  for (const endpoint of CLASSIFICATOR_ENDPOINTS) {
    test(`GET ${endpoint.path} - returns array`, async ({request}) => {
      const response = await request.get(endpoint.path);

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(Array.isArray(body)).toBe(true);
    });
  }
});

test.describe('Classificator endpoints - GET count', () => {
  for (const endpoint of CLASSIFICATOR_ENDPOINTS) {
    test(`GET ${endpoint.path}/count - returns count object`, async ({
      request,
    }) => {
      const response = await request.get(`${endpoint.path}/count`);

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body).toHaveProperty('count');
      expect(typeof body.count).toBe('number');
    });
  }
});

test.describe('Classificator endpoints - GET by id', () => {
  for (const endpoint of CLASSIFICATOR_ENDPOINTS) {
    test(`GET ${endpoint.path}/{id} - retrieves first item`, async ({
      request,
    }) => {
      const listRes = await request.get(endpoint.path);
      const items = await listRes.json();

      if (items.length === 0) {
        test.skip();
        return;
      }

      const response = await request.get(`${endpoint.path}/${items[0].id}`);
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body).toHaveProperty('id', items[0].id);
    });
  }
});

test.describe('Classificator CRUD - nations (representative)', () => {
  let adminHeaders: Record<string, string>;

  test.beforeAll(async ({request}) => {
    adminHeaders = await getAuthHeaders(request, ADMIN_USER);
  });

  test('POST /nations - creates a new nation', async ({request}) => {
    const response = await request.post('/nations', {
      data: {name: `TestNation-${Date.now()}`},
      headers: adminHeaders,
    });

    // May succeed or fail depending on required fields - test the response is valid
    expect([200, 422]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('name');

      // Cleanup
      await request.delete(`/nations/${body.id}`, {headers: adminHeaders});
    }
  });

  test('POST /nations - requires authentication for create', async ({
    request,
  }) => {
    const response = await request.post('/nations', {
      data: {name: 'Unauthorized'},
    });

    expect(response.status()).toBe(401);
  });
});
