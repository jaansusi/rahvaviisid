let counter = Date.now();

function unique(prefix: string): string {
  return `${prefix}-${++counter}`;
}

export function newPerson(overrides: Record<string, unknown> = {}) {
  return {
    givenName: unique('GivenName'),
    surname: unique('Surname'),
    nickname: '',
    sexId: 1,
    birthYear: 1900,
    deathYear: 1980,
    remarks: '',
    ...overrides,
  };
}

export function newTune(overrides: Record<string, unknown> = {}) {
  return {
    tuneReference: unique('REF'),
    textReference: '',
    soundReference: '',
    videoReference: '',
    nationId: 1,
    languageId: 1,
    countryId: 1,
    tuneStateId: 1,
    catalogue: '',
    remarks: '',
    publications: '',
    ...overrides,
  };
}

export function newPage(overrides: Record<string, unknown> = {}) {
  return {
    name: unique('Page'),
    content: 'Test page content',
    ...overrides,
  };
}
