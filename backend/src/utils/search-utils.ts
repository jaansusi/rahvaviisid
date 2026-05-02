// Postgres FTS query builder for tune & person search.

export type SortDir = 'asc' | 'desc';

export type TuneSortKey =
  | 'relevance'
  | 'reference'
  | 'created'
  | 'modified'
  | 'verified';

export type PersonSortKey =
  | 'relevance'
  | 'surname'
  | 'created'
  | 'modified';

export interface PersonRoleFilter {
  personId: number;
  roleId?: number;
}

export interface TuneFilters {
  tuneStateId?: number[];
  nationId?: number[];
  languageId?: number[];
  countryId?: number[];

  tuneReference?: string;
  textReference?: string;
  soundReference?: string;
  videoReference?: string;

  tuneFormId?: number[];
  textFormId?: number[];
  rhythmTypeId?: number[];
  soundRangeId?: number[];

  keySignatureId?: number[];
  pitchId?: number[];
  measureId?: number[];

  tuneGenreId?: number[];
  songGenreId?: number[];
  songTopicId?: number[];
  verseFormId?: number[];

  parishId?: number[];
  municipalityId?: number[];
  villageId?: number[];

  personId?: number[];
  personRole?: PersonRoleFilter[];

  verified?: boolean;
  hasSound?: boolean;
  hasVideo?: boolean;
  hasMelody?: boolean;

  createdFrom?: string;
  createdTo?: string;
  modifiedFrom?: string;
  modifiedTo?: string;
}

export interface PersonFilters {
  sexId?: number[];
  birthYearFrom?: number;
  birthYearTo?: number;
  deathYearFrom?: number;
  deathYearTo?: number;
  roleId?: number[];
  parishId?: number[];
}

export interface TuneSearchRequest {
  q?: string;
  filters?: TuneFilters;
  sort?: TuneSortKey;
  sortDir?: SortDir;
  page?: number;
  pageSize?: number;
}

export interface PersonSearchRequest {
  q?: string;
  filters?: PersonFilters;
  sort?: PersonSortKey;
  sortDir?: SortDir;
  page?: number;
  pageSize?: number;
}

export interface BuiltQuery {
  sql: string;
  countSql: string;
  params: unknown[];
}

const MAX_PAGE_SIZE = 200;
const DEFAULT_PAGE_SIZE = 25;

class ParamBag {
  readonly values: unknown[] = [];
  add(value: unknown): string {
    this.values.push(value);
    return `$${this.values.length}`;
  }
}

const TUNE_SELECT_COLUMNS = `
  t.id,
  t.tune_state_id   AS "tuneStateId",
  t.tune_reference  AS "tuneReference",
  t.text_reference  AS "textReference",
  t.sound_reference AS "soundReference",
  t.video_reference AS "videoReference",
  t.catalogue,
  t.nation_id       AS "nationId",
  t.language_id     AS "languageId",
  t.country_id      AS "countryId",
  t.publications,
  t.remarks,
  t.verified_by     AS "verifiedBy",
  t.verified,
  t.created,
  t.modified
`;

const PERSON_SELECT_COLUMNS = `
  p.id,
  p.pid,
  p.given_name  AS "givenName",
  p.surname,
  p.nickname,
  p.birth_year  AS "birthYear",
  p.death_year  AS "deathYear",
  p.sex_id      AS "sexId",
  p.remarks,
  p.created,
  p.modified,
  COALESCE((
    SELECT count(DISTINCT tpr.tune_id)::int
      FROM folk_tune.tunes_persons_roles tpr
      WHERE tpr.person_id = p.id
  ), 0) AS "tuneCount",
  COALESCE((
    SELECT array_agg(DISTINCT tpr.tune_person_role_type_id)
      FROM folk_tune.tunes_persons_roles tpr
      WHERE tpr.person_id = p.id
  ), ARRAY[]::int[]) AS "roleIds"
`;

function clampPageSize(value: number | undefined): number {
  if (!value || value < 1) return DEFAULT_PAGE_SIZE;
  return Math.min(value, MAX_PAGE_SIZE);
}

function clampPage(value: number | undefined): number {
  if (!value || value < 1) return 1;
  return Math.floor(value);
}

function nonEmpty(value: string | undefined): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function ilikePattern(value: string): string {
  // Escape SQL ILIKE wildcards before wrapping.
  const escaped = value.replace(/[\\%_]/g, ch => `\\${ch}`);
  return `%${escaped}%`;
}

function pushIdArrayCondition(
  conditions: string[],
  params: ParamBag,
  column: string,
  ids: number[] | undefined,
): void {
  if (!ids || ids.length === 0) return;
  conditions.push(`${column} = ANY(${params.add(ids)}::int[])`);
}

function pushExistsCondition(
  conditions: string[],
  params: ParamBag,
  subquery: (placeholder: string) => string,
  ids: number[] | undefined,
): void {
  if (!ids || ids.length === 0) return;
  conditions.push(`EXISTS (${subquery(params.add(ids))})`);
}

function pushDateRange(
  conditions: string[],
  params: ParamBag,
  column: string,
  from: string | undefined,
  to: string | undefined,
): void {
  if (from) conditions.push(`${column} >= ${params.add(from)}`);
  if (to) conditions.push(`${column} <= ${params.add(to)}`);
}

interface TuneFilterClause {
  conditions: string[];
  params: ParamBag;
  hasQuery: boolean;
  rankExpr: string;
}

function buildTuneFilterClause(req: TuneSearchRequest): TuneFilterClause {
  const params = new ParamBag();
  const conditions: string[] = [];
  const filters = req.filters ?? {};

  const q = nonEmpty(req.q);
  let rankExpr = '0::float4';
  if (q) {
    const qParam = params.add(q);
    conditions.push(`t.tsv @@ plainto_tsquery('simple', ${qParam})`);
    rankExpr = `ts_rank(t.tsv, plainto_tsquery('simple', ${qParam}))`;
  }

  pushIdArrayCondition(conditions, params, 't.tune_state_id', filters.tuneStateId);
  pushIdArrayCondition(conditions, params, 't.nation_id', filters.nationId);
  pushIdArrayCondition(conditions, params, 't.language_id', filters.languageId);
  pushIdArrayCondition(conditions, params, 't.country_id', filters.countryId);

  const tuneRef = nonEmpty(filters.tuneReference);
  if (tuneRef) {
    conditions.push(`t.tune_reference ILIKE ${params.add(ilikePattern(tuneRef))}`);
  }
  const textRef = nonEmpty(filters.textReference);
  if (textRef) {
    conditions.push(`t.text_reference ILIKE ${params.add(ilikePattern(textRef))}`);
  }
  const soundRef = nonEmpty(filters.soundReference);
  if (soundRef) {
    conditions.push(`t.sound_reference ILIKE ${params.add(ilikePattern(soundRef))}`);
  }
  const videoRef = nonEmpty(filters.videoReference);
  if (videoRef) {
    conditions.push(`t.video_reference ILIKE ${params.add(ilikePattern(videoRef))}`);
  }

  pushExistsCondition(conditions, params,
    p => `SELECT 1 FROM folk_tune.musical_characteristics mc
            JOIN folk_tune.musical_characteristics_tune_forms mctf
              ON mctf.musical_characteristic_id = mc.id
            WHERE mc.tune_id = t.id AND mctf.tune_form_id = ANY(${p}::int[])`,
    filters.tuneFormId);

  pushExistsCondition(conditions, params,
    p => `SELECT 1 FROM folk_tune.musical_characteristics mc
            JOIN folk_tune.musical_characteristics_text_forms mctxf
              ON mctxf.musical_characteristic_id = mc.id
            WHERE mc.tune_id = t.id AND mctxf.text_form_id = ANY(${p}::int[])`,
    filters.textFormId);

  pushExistsCondition(conditions, params,
    p => `SELECT 1 FROM folk_tune.musical_characteristics mc
            WHERE mc.tune_id = t.id AND mc.sound_range_id = ANY(${p}::int[])`,
    filters.soundRangeId);

  if (filters.rhythmTypeId && filters.rhythmTypeId.length > 0) {
    const p = params.add(filters.rhythmTypeId);
    conditions.push(`(
      EXISTS (SELECT 1 FROM folk_tune.musical_characteristics mc
                JOIN folk_tune.musical_characteristics_rhythm_types mcrt
                  ON mcrt.musical_characteristic_id = mc.id
                WHERE mc.tune_id = t.id AND mcrt.rhythm_type_id = ANY(${p}::int[]))
      OR EXISTS (SELECT 1 FROM folk_tune.tune_encodings te
                   WHERE te.tune_id = t.id AND te.rhythm_type_id = ANY(${p}::int[]))
    )`);
  }

  pushExistsCondition(conditions, params,
    p => `SELECT 1 FROM folk_tune.tune_encodings te
            WHERE te.tune_id = t.id AND te.key_signature_id = ANY(${p}::int[])`,
    filters.keySignatureId);

  pushExistsCondition(conditions, params,
    p => `SELECT 1 FROM folk_tune.tune_encodings te
            WHERE te.tune_id = t.id AND te.pitch_id = ANY(${p}::int[])`,
    filters.pitchId);

  pushExistsCondition(conditions, params,
    p => `SELECT 1 FROM folk_tune.tune_encodings te
            WHERE te.tune_id = t.id AND te.measure_id = ANY(${p}::int[])`,
    filters.measureId);

  pushExistsCondition(conditions, params,
    p => `SELECT 1 FROM folk_tune.tune_songs tso
            JOIN folk_tune.tune_songs_tune_genres tstg ON tstg.tune_song_id = tso.id
            WHERE tso.tune_id = t.id AND tstg.tune_genre_id = ANY(${p}::int[])`,
    filters.tuneGenreId);

  pushExistsCondition(conditions, params,
    p => `SELECT 1 FROM folk_tune.tune_songs tso
            JOIN folk_tune.tune_songs_song_genres tssg ON tssg.tune_song_id = tso.id
            WHERE tso.tune_id = t.id AND tssg.song_genre_id = ANY(${p}::int[])`,
    filters.songGenreId);

  pushExistsCondition(conditions, params,
    p => `SELECT 1 FROM folk_tune.tune_songs tso
            JOIN folk_tune.tune_songs_song_topics tsst ON tsst.tune_song_id = tso.id
            WHERE tso.tune_id = t.id AND tsst.song_topic_id = ANY(${p}::int[])`,
    filters.songTopicId);

  pushExistsCondition(conditions, params,
    p => `SELECT 1 FROM folk_tune.tune_songs tso
            JOIN folk_tune.tune_songs_verse_forms tsvf ON tsvf.tune_song_id = tso.id
            WHERE tso.tune_id = t.id AND tsvf.verse_form_id = ANY(${p}::int[])`,
    filters.verseFormId);

  pushExistsCondition(conditions, params,
    p => `SELECT 1 FROM folk_tune.tune_places tp
            WHERE tp.tune_id = t.id AND tp.parish_id = ANY(${p}::int[])`,
    filters.parishId);

  pushExistsCondition(conditions, params,
    p => `SELECT 1 FROM folk_tune.tune_places tp
            WHERE tp.tune_id = t.id AND tp.municipality_id = ANY(${p}::int[])`,
    filters.municipalityId);

  pushExistsCondition(conditions, params,
    p => `SELECT 1 FROM folk_tune.tune_places tp
            WHERE tp.tune_id = t.id AND tp.village_id = ANY(${p}::int[])`,
    filters.villageId);

  if (filters.personId && filters.personId.length > 0) {
    const p = params.add(filters.personId);
    conditions.push(`(
      EXISTS (SELECT 1 FROM folk_tune.tunes_persons_roles tpr
                WHERE tpr.tune_id = t.id AND tpr.person_id = ANY(${p}::int[]))
      OR EXISTS (SELECT 1 FROM folk_tune.tune_places tp
                   WHERE tp.tune_id = t.id AND tp.person_id = ANY(${p}::int[]))
      OR EXISTS (SELECT 1 FROM folk_tune.tune_transcriptions tt
                   JOIN folk_tune.transcriptions_persons_roles tpr2
                     ON tpr2.tune_transcription_id = tt.id
                   WHERE tt.tune_id = t.id AND tpr2.person_id = ANY(${p}::int[]))
    )`);
  }

  if (filters.personRole && filters.personRole.length > 0) {
    for (const pr of filters.personRole) {
      if (pr.personId == null) continue;
      const personParam = params.add(pr.personId);
      if (pr.roleId != null) {
        const roleParam = params.add(pr.roleId);
        conditions.push(`EXISTS (
          SELECT 1 FROM folk_tune.tunes_persons_roles tpr
            WHERE tpr.tune_id = t.id
              AND tpr.person_id = ${personParam}
              AND tpr.tune_person_role_type_id = ${roleParam}
        )`);
      } else {
        conditions.push(`EXISTS (
          SELECT 1 FROM folk_tune.tunes_persons_roles tpr
            WHERE tpr.tune_id = t.id AND tpr.person_id = ${personParam}
        )`);
      }
    }
  }

  if (filters.verified === true) {
    conditions.push(`t.verified_by IS NOT NULL`);
  } else if (filters.verified === false) {
    conditions.push(`t.verified_by IS NULL`);
  }

  if (filters.hasSound === true) {
    conditions.push(`t.sound_reference IS NOT NULL AND t.sound_reference <> ''`);
  } else if (filters.hasSound === false) {
    conditions.push(`(t.sound_reference IS NULL OR t.sound_reference = '')`);
  }

  if (filters.hasVideo === true) {
    conditions.push(`t.video_reference IS NOT NULL AND t.video_reference <> ''`);
  } else if (filters.hasVideo === false) {
    conditions.push(`(t.video_reference IS NULL OR t.video_reference = '')`);
  }

  if (filters.hasMelody === true) {
    conditions.push(`EXISTS (
      SELECT 1 FROM folk_tune.tune_encodings te
        JOIN folk_tune.tune_melodies tm ON tm.tune_encodings_id = te.id
        WHERE te.tune_id = t.id
    )`);
  } else if (filters.hasMelody === false) {
    conditions.push(`NOT EXISTS (
      SELECT 1 FROM folk_tune.tune_encodings te
        JOIN folk_tune.tune_melodies tm ON tm.tune_encodings_id = te.id
        WHERE te.tune_id = t.id
    )`);
  }

  pushDateRange(conditions, params, 't.created', filters.createdFrom, filters.createdTo);
  pushDateRange(conditions, params, 't.modified', filters.modifiedFrom, filters.modifiedTo);

  return {conditions, params, hasQuery: q != null, rankExpr};
}

export function buildTuneSearchQuery(req: TuneSearchRequest): BuiltQuery {
  const {conditions, params, hasQuery, rankExpr} = buildTuneFilterClause(req);

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const orderBy = buildTuneOrderBy(req.sort, req.sortDir, hasQuery);

  const pageSize = clampPageSize(req.pageSize);
  const page = clampPage(req.page);
  const offset = (page - 1) * pageSize;
  const limitParam = params.add(pageSize);
  const offsetParam = params.add(offset);

  const sql = `
    SELECT ${TUNE_SELECT_COLUMNS},
           ${rankExpr} AS rank
      FROM folk_tune.tunes t
      ${where}
      ORDER BY ${orderBy}
      LIMIT ${limitParam} OFFSET ${offsetParam}
  `;

  const countParams = params.values.slice(0, params.values.length - 2);
  const countSql = `
    SELECT count(*)::int AS total
      FROM folk_tune.tunes t
      ${where}
  `;

  return {
    sql,
    countSql,
    params: params.values,
    // countParams not needed by caller — caller will pass the same params slice.
    // Keeping the structure simple: caller invokes count using params.slice(0, -2).
  } as BuiltQuery & {countParams?: unknown[]};
}

// Whitelist of patchable columns for bulk update. Each entry maps the JSON
// payload key to the database column name. Anything not listed is rejected.
export const TUNE_BULK_UPDATE_COLUMNS: Record<string, string> = {
  tuneStateId: 'tune_state_id',
  nationId:    'nation_id',
  languageId:  'language_id',
  countryId:   'country_id',
  catalogue:   'catalogue',
  publications:'publications',
  remarks:     'remarks',
  verifiedBy:  'verified_by',
  verified:    'verified',
};

export interface TuneBulkUpdateRequest {
  q?: string;
  filters?: TuneFilters;
  patch: Record<string, unknown>;
}

export interface BulkUpdateQuery {
  sql: string;
  params: unknown[];
  countSql: string;
  countParams: unknown[];
}

export function buildTuneBulkUpdateQuery(
  req: TuneBulkUpdateRequest,
): BulkUpdateQuery {
  const {conditions, params: filterParams} = buildTuneFilterClause({
    q: req.q,
    filters: req.filters,
  });

  const setFragments: string[] = [];
  const setParams: unknown[] = [];
  for (const [key, column] of Object.entries(TUNE_BULK_UPDATE_COLUMNS)) {
    if (!Object.prototype.hasOwnProperty.call(req.patch, key)) continue;
    setParams.push(req.patch[key]);
    setFragments.push(`${column} = $${setParams.length}`);
  }
  if (setFragments.length === 0) {
    throw new Error('No allowed fields supplied to bulk update');
  }

  // Filter clause params start at $1 inside its own ParamBag; we need to
  // renumber them so they sit *after* the SET params.
  const offset = setParams.length;
  const renumberedConditions = conditions.map(cond =>
    cond.replace(/\$(\d+)/g, (_, n) => `$${parseInt(n, 10) + offset}`),
  );
  const where =
    renumberedConditions.length > 0
      ? `WHERE id IN (SELECT t.id FROM folk_tune.tunes t WHERE ${renumberedConditions.join(' AND ')})`
      : '';

  const sql = `
    UPDATE folk_tune.tunes
       SET ${setFragments.join(', ')}, modified = NOW()
       ${where}
  `;

  const countWhere =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const countSql = `
    SELECT count(*)::int AS total
      FROM folk_tune.tunes t
      ${countWhere}
  `;

  return {
    sql,
    params: [...setParams, ...filterParams.values],
    countSql,
    countParams: filterParams.values,
  };
}

function buildTuneOrderBy(
  sort: TuneSortKey | undefined,
  dir: SortDir | undefined,
  hasQuery: boolean,
): string {
  const direction: SortDir = dir === 'asc' ? 'asc' : dir === 'desc' ? 'desc' : 'desc';
  switch (sort) {
    case 'reference':
      return `t.tune_reference ${direction === 'asc' ? 'ASC' : 'DESC'} NULLS LAST, t.id ASC`;
    case 'created':
      return `t.created ${direction === 'asc' ? 'ASC' : 'DESC'}, t.id ASC`;
    case 'modified':
      return `t.modified ${direction === 'asc' ? 'ASC' : 'DESC'}, t.id ASC`;
    case 'verified':
      return `t.verified ${direction === 'asc' ? 'ASC' : 'DESC'} NULLS LAST, t.id ASC`;
    case 'relevance':
    default:
      if (hasQuery) {
        return `rank ${direction === 'asc' ? 'ASC' : 'DESC'}, t.id ASC`;
      }
      return `t.id ASC`;
  }
}

export function buildPersonSearchQuery(req: PersonSearchRequest): BuiltQuery {
  const params = new ParamBag();
  const conditions: string[] = [];
  const filters = req.filters ?? {};

  const q = nonEmpty(req.q);
  let rankExpr = '0::float4';
  if (q) {
    const qParam = params.add(q);
    conditions.push(`p.tsv @@ plainto_tsquery('simple', ${qParam})`);
    rankExpr = `ts_rank(p.tsv, plainto_tsquery('simple', ${qParam}))`;
  }

  pushIdArrayCondition(conditions, params, 'p.sex_id', filters.sexId);

  if (filters.birthYearFrom != null) {
    conditions.push(`p.birth_year >= ${params.add(filters.birthYearFrom)}`);
  }
  if (filters.birthYearTo != null) {
    conditions.push(`p.birth_year <= ${params.add(filters.birthYearTo)}`);
  }
  if (filters.deathYearFrom != null) {
    conditions.push(`p.death_year >= ${params.add(filters.deathYearFrom)}`);
  }
  if (filters.deathYearTo != null) {
    conditions.push(`p.death_year <= ${params.add(filters.deathYearTo)}`);
  }

  pushExistsCondition(conditions, params,
    pp => `SELECT 1 FROM folk_tune.tunes_persons_roles tpr
             WHERE tpr.person_id = p.id
               AND tpr.tune_person_role_type_id = ANY(${pp}::int[])`,
    filters.roleId);

  pushExistsCondition(conditions, params,
    pp => `SELECT 1 FROM folk_tune.tune_places tp
             WHERE tp.person_id = p.id AND tp.parish_id = ANY(${pp}::int[])`,
    filters.parishId);

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const orderBy = buildPersonOrderBy(req.sort, req.sortDir, q != null);

  const pageSize = clampPageSize(req.pageSize);
  const page = clampPage(req.page);
  const offset = (page - 1) * pageSize;
  const limitParam = params.add(pageSize);
  const offsetParam = params.add(offset);

  const sql = `
    SELECT ${PERSON_SELECT_COLUMNS},
           ${rankExpr} AS rank
      FROM folk_tune.persons p
      ${where}
      ORDER BY ${orderBy}
      LIMIT ${limitParam} OFFSET ${offsetParam}
  `;

  const countSql = `
    SELECT count(*)::int AS total
      FROM folk_tune.persons p
      ${where}
  `;

  return {sql, countSql, params: params.values};
}

function buildPersonOrderBy(
  sort: PersonSortKey | undefined,
  dir: SortDir | undefined,
  hasQuery: boolean,
): string {
  const direction: SortDir = dir === 'asc' ? 'asc' : dir === 'desc' ? 'desc' : 'asc';
  const d = direction === 'asc' ? 'ASC' : 'DESC';
  switch (sort) {
    case 'created':
      return `p.created ${d}, p.id ASC`;
    case 'modified':
      return `p.modified ${d}, p.id ASC`;
    case 'surname':
      return `p.surname ${d} NULLS LAST, p.given_name ${d} NULLS LAST, p.id ASC`;
    case 'relevance':
      if (hasQuery) return `rank DESC, p.surname ASC NULLS LAST, p.id ASC`;
      return `p.surname ASC NULLS LAST, p.given_name ASC NULLS LAST, p.id ASC`;
    default:
      if (hasQuery) return `rank DESC, p.surname ASC NULLS LAST, p.id ASC`;
      return `p.surname ASC NULLS LAST, p.given_name ASC NULLS LAST, p.id ASC`;
  }
}

// Strip the trailing LIMIT/OFFSET params so the same condition params can be
// reused for the count query.
export function paramsForCount(built: BuiltQuery): unknown[] {
  return built.params.slice(0, built.params.length - 2);
}
