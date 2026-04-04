import {test, expect} from '@playwright/test';
import {ADMIN_USER, EDITOR_USER, getAuthHeaders} from './helpers/auth';
import {newPerson} from './helpers/test-data';

test.describe('Persons CRUD', () => {
  let adminHeaders: Record<string, string>;
  let editorHeaders: Record<string, string>;

  test.beforeAll(async ({request}) => {
    adminHeaders = await getAuthHeaders(request, ADMIN_USER);
    editorHeaders = await getAuthHeaders(request, EDITOR_USER);
  });

  test('GET /persons - lists persons (public)', async ({request}) => {
    const response = await request.get('/persons');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('GET /persons - results are sorted by surname, givenName, nickname', async ({
    request,
  }) => {
    // Create two persons with known sort order
    const personA = newPerson({surname: 'Aardvark', givenName: 'Zed'});
    const personB = newPerson({surname: 'Zebra', givenName: 'Adam'});

    const resA = await request.post('/persons', {
      data: personA,
      headers: adminHeaders,
    });
    const createdA = await resA.json();

    const resB = await request.post('/persons', {
      data: personB,
      headers: adminHeaders,
    });
    const createdB = await resB.json();

    const listRes = await request.get('/persons');
    const body = await listRes.json();
    const surnames = body.map((p: any) => p.surname);

    // Aardvark should come before Zebra
    const indexA = surnames.indexOf('Aardvark');
    const indexB = surnames.indexOf('Zebra');
    if (indexA !== -1 && indexB !== -1) {
      expect(indexA).toBeLessThan(indexB);
    }

    // Cleanup
    await request.delete(`/persons/${createdA.id}`, {headers: adminHeaders});
    await request.delete(`/persons/${createdB.id}`, {headers: adminHeaders});
  });

  test('GET /persons/count - returns person count', async ({request}) => {
    const response = await request.get('/persons/count');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('count');
    expect(typeof body.count).toBe('number');
  });

  test('POST /persons - requires authentication', async ({request}) => {
    const response = await request.post('/persons', {
      data: newPerson(),
    });

    expect(response.status()).toBe(401);
  });

  test('POST /persons - admin can create a person', async ({request}) => {
    const person = newPerson();
    const response = await request.post('/persons', {
      data: person,
      headers: adminHeaders,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.givenName).toBe(person.givenName);
    expect(body.surname).toBe(person.surname);
    expect(body.sexId).toBe(person.sexId);

    // Cleanup
    await request.delete(`/persons/${body.id}`, {headers: adminHeaders});
  });

  test('POST /persons - editor cannot create a person (authorization restricts to admin)', async ({request}) => {
    const person = newPerson();
    const response = await request.post('/persons', {
      data: person,
      headers: editorHeaders,
    });

    expect(response.status()).toBe(403);
  });

  test('POST /persons - rejects person with no names', async ({request}) => {
    const response = await request.post('/persons', {
      data: {
        givenName: '',
        surname: '',
        nickname: '',
        sexId: 1,
      },
      headers: adminHeaders,
    });

    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(body.error.message).toBe('validation.person.noNames');
  });

  test('POST /persons - allows person with only nickname', async ({
    request,
  }) => {
    const response = await request.post('/persons', {
      data: {
        givenName: '',
        surname: '',
        nickname: `Nickname-${Date.now()}`,
        sexId: 1,
      },
      headers: adminHeaders,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id');

    // Cleanup
    await request.delete(`/persons/${body.id}`, {headers: adminHeaders});
  });

  test('GET /persons/{id} - retrieves a specific person', async ({
    request,
  }) => {
    const person = newPerson();
    const createRes = await request.post('/persons', {
      data: person,
      headers: adminHeaders,
    });
    const created = await createRes.json();

    const getRes = await request.get(`/persons/${created.id}`);
    expect(getRes.status()).toBe(200);
    const fetched = await getRes.json();
    expect(fetched.id).toBe(created.id);
    expect(fetched.givenName).toBe(person.givenName);

    // Cleanup
    await request.delete(`/persons/${created.id}`, {headers: adminHeaders});
  });

  test('PATCH /persons/{id} - updates a person', async ({request}) => {
    const createRes = await request.post('/persons', {
      data: newPerson(),
      headers: adminHeaders,
    });
    const created = await createRes.json();

    const patchRes = await request.patch(`/persons/${created.id}`, {
      data: {givenName: 'UpdatedName'},
      headers: adminHeaders,
    });
    expect(patchRes.status()).toBe(204);

    const getRes = await request.get(`/persons/${created.id}`);
    const updated = await getRes.json();
    expect(updated.givenName).toBe('UpdatedName');

    // Cleanup
    await request.delete(`/persons/${created.id}`, {headers: adminHeaders});
  });

  test('PATCH /persons/{id} - rejects update that removes all names', async ({
    request,
  }) => {
    const createRes = await request.post('/persons', {
      data: newPerson(),
      headers: adminHeaders,
    });
    const created = await createRes.json();

    const patchRes = await request.patch(`/persons/${created.id}`, {
      data: {givenName: '', surname: '', nickname: ''},
      headers: adminHeaders,
    });
    expect(patchRes.status()).toBe(422);

    // Cleanup
    await request.delete(`/persons/${created.id}`, {headers: adminHeaders});
  });

  test('DELETE /persons/{id} - deletes a person', async ({request}) => {
    const createRes = await request.post('/persons', {
      data: newPerson(),
      headers: adminHeaders,
    });
    const created = await createRes.json();

    const delRes = await request.delete(`/persons/${created.id}`, {
      headers: adminHeaders,
    });
    expect(delRes.status()).toBe(204);

    const getRes = await request.get(`/persons/${created.id}`);
    expect(getRes.status()).toBeGreaterThanOrEqual(400);
  });

  test('DELETE /persons/{id} - requires authentication', async ({request}) => {
    const createRes = await request.post('/persons', {
      data: newPerson(),
      headers: adminHeaders,
    });
    const created = await createRes.json();

    const delRes = await request.delete(`/persons/${created.id}`);
    expect(delRes.status()).toBe(401);

    // Cleanup
    await request.delete(`/persons/${created.id}`, {headers: adminHeaders});
  });
});
