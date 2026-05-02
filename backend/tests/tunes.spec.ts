import {test, expect} from '@playwright/test';
import {ADMIN_USER, EDITOR_USER, getAuthHeaders, login} from './helpers/auth';
import {newTune} from './helpers/test-data';

test.describe('Tunes CRUD', () => {
  let adminHeaders: Record<string, string>;
  let editorHeaders: Record<string, string>;

  test.beforeAll(async ({request}) => {
    adminHeaders = await getAuthHeaders(request, ADMIN_USER);
    editorHeaders = await getAuthHeaders(request, EDITOR_USER);
  });

  test('GET /tunes - lists tunes (public)', async ({request}) => {
    const response = await request.get('/tunes');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('GET /tunes/count - returns tune count (public)', async ({request}) => {
    const response = await request.get('/tunes/count');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('count');
    expect(typeof body.count).toBe('number');
  });

  test('POST /tunes - requires authentication', async ({request}) => {
    const response = await request.post('/tunes', {
      data: newTune(),
    });

    expect(response.status()).toBe(401);
  });

  test('POST /tunes - admin can create a tune', async ({request}) => {
    const tune = newTune();
    const response = await request.post('/tunes', {
      data: tune,
      headers: adminHeaders,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.tuneReference).toBe(tune.tuneReference);
    expect(body.nationId).toBe(tune.nationId);

    // Cleanup
    await request.delete(`/tunes/${body.id}`, {headers: adminHeaders});
  });

  test('POST /tunes - editor cannot create a tune (authorization restricts to admin)', async ({request}) => {
    const tune = newTune();
    const response = await request.post('/tunes', {
      data: tune,
      headers: editorHeaders,
    });

    expect(response.status()).toBe(403);
  });

  test('POST /tunes - rejects tune without any reference', async ({
    request,
  }) => {
    const response = await request.post('/tunes', {
      data: {
        tuneReference: '',
        textReference: '',
        soundReference: '',
        videoReference: '',
        nationId: 1,
        languageId: 1,
        countryId: 1,
        tuneStateId: 1,
      },
      headers: adminHeaders,
    });

    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(body.error.message).toBe('validation.tunes.invalidReferences');
  });

  test('GET /tunes/{id} - retrieves a specific tune', async ({request}) => {
    // Create
    const tune = newTune();
    const createRes = await request.post('/tunes', {
      data: tune,
      headers: adminHeaders,
    });
    const created = await createRes.json();

    // Fetch by ID
    const getRes = await request.get(`/tunes/${created.id}`);
    expect(getRes.status()).toBe(200);
    const fetched = await getRes.json();
    expect(fetched.id).toBe(created.id);
    expect(fetched.tuneReference).toBe(tune.tuneReference);

    // Cleanup
    await request.delete(`/tunes/${created.id}`, {headers: adminHeaders});
  });

  test('PATCH /tunes/{id} - updates a tune', async ({request}) => {
    // Create
    const createRes = await request.post('/tunes', {
      data: newTune(),
      headers: adminHeaders,
    });
    const created = await createRes.json();

    // Update (id must be in body for insertTune to update rather than create)
    const newRef = `UPDATED-${Date.now()}`;
    const patchRes = await request.patch(`/tunes/${created.id}`, {
      data: {id: created.id, tuneReference: newRef},
      headers: adminHeaders,
    });
    expect(patchRes.status()).toBe(204);

    // Verify
    const getRes = await request.get(`/tunes/${created.id}`);
    const updated = await getRes.json();
    expect(updated.tuneReference).toBe(newRef);

    // Cleanup
    await request.delete(`/tunes/${created.id}`, {headers: adminHeaders});
  });

  test('DELETE /tunes/{id} - deletes a tune', async ({request}) => {
    const createRes = await request.post('/tunes', {
      data: newTune(),
      headers: adminHeaders,
    });
    const created = await createRes.json();

    const delRes = await request.delete(`/tunes/${created.id}`, {
      headers: adminHeaders,
    });
    expect(delRes.status()).toBe(204);

    // Verify deleted
    const getRes = await request.get(`/tunes/${created.id}`);
    expect(getRes.status()).toBeGreaterThanOrEqual(400);
  });

  test('DELETE /tunes/{id} - requires authentication', async ({request}) => {
    const createRes = await request.post('/tunes', {
      data: newTune(),
      headers: adminHeaders,
    });
    const created = await createRes.json();

    const delRes = await request.delete(`/tunes/${created.id}`);
    expect(delRes.status()).toBe(401);

    // Cleanup
    await request.delete(`/tunes/${created.id}`, {headers: adminHeaders});
  });

  test('GET /tunes/{id} - returns 404 for non-existent tune', async ({
    request,
  }) => {
    const response = await request.get('/tunes/999999');
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('POST /tunes - creates tune with nested tuneSongs', async ({
    request,
  }) => {
    const tune = {
      ...newTune(),
      tuneSongs: [{songTitle: 'Test Song', firstVerse: 'La la la'}],
    };

    const response = await request.post('/tunes', {
      data: tune,
      headers: adminHeaders,
    });
    expect(response.status()).toBe(200);
    const body = await response.json();

    // Fetch with relations to verify nested creation
    const getRes = await request.get(
      `/tunes/${body.id}?filter=${encodeURIComponent(JSON.stringify({include: [{relation: 'tuneSongs'}]}))}`,
    );
    const fetched = await getRes.json();
    expect(fetched.tuneSongs).toBeDefined();
    expect(fetched.tuneSongs.length).toBe(1);
    expect(fetched.tuneSongs[0].songTitle).toBe('Test Song');

    // Cleanup
    await request.delete(`/tunes/${body.id}`, {headers: adminHeaders});
  });
});

test.describe('Tunes Search', () => {
  let adminHeaders: Record<string, string>;
  let createdTuneId: number;
  const searchRef = `SEARCH-${Date.now()}`;

  test.beforeAll(async ({request}) => {
    adminHeaders = await getAuthHeaders(request, ADMIN_USER);

    // Create a tune with a known reference for searching
    const createRes = await request.post('/tunes', {
      data: newTune({tuneReference: searchRef}),
      headers: adminHeaders,
    });
    const created = await createRes.json();
    createdTuneId = created.id;
  });

  test.afterAll(async ({request}) => {
    if (createdTuneId) {
      await request.delete(`/tunes/${createdTuneId}`, {headers: adminHeaders});
    }
  });

  test('POST /tunes/search - returns paginated tunes when no query', async ({
    request,
  }) => {
    const response = await request.post('/tunes/search', {data: {}});
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.items)).toBe(true);
    expect(typeof body.total).toBe('number');
  });

  test('POST /tunes/search - free-text query finds tune by reference', async ({
    request,
  }) => {
    const response = await request.post('/tunes/search', {
      data: {q: searchRef},
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.items.length).toBeGreaterThanOrEqual(1);
    const found = body.items.find((t: any) => t.tuneReference === searchRef);
    expect(found).toBeDefined();
  });

  test('POST /tunes/search - free-text query is case-insensitive', async ({
    request,
  }) => {
    const response = await request.post('/tunes/search', {
      data: {q: searchRef.toLowerCase()},
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.items.length).toBeGreaterThanOrEqual(1);
  });

  test('POST /tunes/search - returns empty for no match', async ({request}) => {
    const response = await request.post('/tunes/search', {
      data: {q: 'NONEXISTENT_REF_12345'},
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.items.length).toBe(0);
    expect(body.total).toBe(0);
  });

  test('POST /tunes/search - tuneReference filter narrows results', async ({
    request,
  }) => {
    const response = await request.post('/tunes/search', {
      data: {filters: {tuneReference: searchRef}},
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    const found = body.items.find((t: any) => t.tuneReference === searchRef);
    expect(found).toBeDefined();
  });

  test('POST /tunes/search - pagination respects pageSize', async ({request}) => {
    const response = await request.post('/tunes/search', {
      data: {pageSize: 1, page: 1},
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.items.length).toBeLessThanOrEqual(1);
  });
});
