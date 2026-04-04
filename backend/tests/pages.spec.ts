import {test, expect} from '@playwright/test';
import {ADMIN_USER, getAuthHeaders} from './helpers/auth';

test.describe('Pages', () => {
  let adminHeaders: Record<string, string>;

  test.beforeAll(async ({request}) => {
    adminHeaders = await getAuthHeaders(request, ADMIN_USER);
  });

  test('GET /pages - lists all pages (public)', async ({request}) => {
    const response = await request.get('/pages');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('GET /pages/{id} - retrieves a page by id', async ({request}) => {
    // First get the list to find a valid ID
    const listRes = await request.get('/pages');
    const pages = await listRes.json();

    if (pages.length === 0) {
      test.skip();
      return;
    }

    const pageId = pages[0].id;
    const response = await request.get(`/pages/${pageId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id', pageId);
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('content');
  });

  test('PATCH /pages/{id} - requires authentication', async ({request}) => {
    const listRes = await request.get('/pages');
    const pages = await listRes.json();

    if (pages.length === 0) {
      test.skip();
      return;
    }

    const response = await request.patch(`/pages/${pages[0].id}`, {
      data: {content: 'unauthorized update'},
    });
    expect(response.status()).toBe(401);
  });

  test('PATCH /pages/{id} - admin can update page content', async ({
    request,
  }) => {
    const listRes = await request.get('/pages');
    const pages = await listRes.json();

    if (pages.length === 0) {
      test.skip();
      return;
    }

    const pageId = pages[0].id;
    const originalContent = pages[0].content;
    const newContent = `Updated at ${Date.now()}`;

    const patchRes = await request.patch(`/pages/${pageId}`, {
      data: {content: newContent},
      headers: adminHeaders,
    });
    expect(patchRes.status()).toBe(204);

    // Verify
    const getRes = await request.get(`/pages/${pageId}`);
    const updated = await getRes.json();
    expect(updated.content).toBe(newContent);

    // Restore original
    await request.patch(`/pages/${pageId}`, {
      data: {content: originalContent},
      headers: adminHeaders,
    });
  });
});
