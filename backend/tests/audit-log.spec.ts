import {test, expect} from '@playwright/test';
import {ADMIN_USER, getAuthHeaders} from './helpers/auth';
import {newTune} from './helpers/test-data';

test.describe('Audit Log', () => {
  let adminHeaders: Record<string, string>;

  test.beforeAll(async ({request}) => {
    adminHeaders = await getAuthHeaders(request, ADMIN_USER);
  });

  test('GET /audit-logs - lists audit entries', async ({request}) => {
    const response = await request.get('/audit-logs', {headers: adminHeaders});

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('GET /audit-logs/count - returns audit log count', async ({
    request,
  }) => {
    const response = await request.get('/audit-logs/count', {
      headers: adminHeaders,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('count');
    expect(typeof body.count).toBe('number');
  });

  test('creating a tune generates an audit log entry', async ({request}) => {
    // Get initial count
    const beforeCount = await request.get('/audit-logs/count', {
      headers: adminHeaders,
    });
    const countBefore = (await beforeCount.json()).count;

    // Create a tune
    const createRes = await request.post('/tunes', {
      data: newTune(),
      headers: adminHeaders,
    });
    expect(createRes.status()).toBe(200);
    const tune = await createRes.json();

    // Check audit log count increased
    const afterCount = await request.get('/audit-logs/count', {
      headers: adminHeaders,
    });
    const countAfter = (await afterCount.json()).count;
    expect(countAfter).toBeGreaterThan(countBefore);

    // Verify the latest audit log entry references the tune
    const logsRes = await request.get(
      `/audit-logs?filter=${encodeURIComponent(JSON.stringify({order: ['actedAt DESC'], limit: 5}))}`,
      {headers: adminHeaders},
    );
    const logs = await logsRes.json();
    expect(logs.length).toBeGreaterThan(0);

    const latestLog = logs[0];
    expect(latestLog).toHaveProperty('action');
    expect(latestLog).toHaveProperty('actedAt');
    expect(latestLog).toHaveProperty('actedOn');

    // Cleanup
    await request.delete(`/tunes/${tune.id}`, {headers: adminHeaders});
  });
});
