# Search-first Rahvaviisid redesign

## Diagnosis

Today the site is structured as **CRUD lists with a bolt-on search**:

- [App.js:78-82](../../frontend/src/App.js#L78-L82) — `/` is a HomePage, `/otsing` is a separate page, and `/:asset/*` exposes raw browseable lists.
- [SearchComponent.js](../../frontend/src/Components/Search/SearchComponent.js) — text-only input, two modes (`reference` / `full`), no filters, no sort, no classifier facets.
- Backend search ([backend/src/utils/search-utils.ts](../../backend/src/utils/search-utils.ts) + `tunes.controller.ts`) loads all tunes with relations and post-filters in JS — won't scale and can't be faceted.
- "Classifiers" UI is a deep drill (type → classifier → tunes-list), instead of being **a way to filter tunes**.
- Editing UX is solid (auth + audit trail exist) but the editor experience is buried inside list/detail flows rather than surfaced from search.

The redesign reframes the site so search is the front door, classifiers become filters, and editors get inline affordances on search results.

---

## Locked decisions

1. **Postgres FTS** (no Elastic/OpenSearch).
2. **No suggestions/draft layer.** Editors are employees — saves are immediate and visible. Existing audit log is the safety net.
3. **Search is fully public** — no auth gate on `/otsi/*` or the search endpoints.
4. **Inline filter tooltips** — delete the `searchHelp` page and `/otsinguabi` route.
5. **No search analytics.**

---

## Phase 1 — Information architecture

| Old | New |
|---|---|
| `/` HomePage | `/` redirects to `/otsi/viisid` |
| `/otsing`, `/otsinguabi` | Removed |
| `/viisid` list | Removed → `/otsi/viisid` |
| `/isikud` list | Removed → `/otsi/isikud` |
| `/klassifikaatorid/:type/:id` tune list | Redirects to `/otsi/viisid?<type>=<id>` |
| `/viisid/:id/vaata`, `/muuda`, `/uus`, `/kopeeri`, `/audit` | Kept |
| `/isikud/:id/vaata`, `/muuda` | Kept |
| `/klassifikaatorid` CRUD | Moved under `/halda/klassifikaatorid` (editor-gated) |

Header tabs: **Otsi viise**, **Otsi isikuid**, plus editor-only **Halda** menu.

Files: [App.js:78-82](../../frontend/src/App.js#L78-L82), [Header.js](../../frontend/src/Components/Layout/Header.js), [LocationHeader.js](../../frontend/src/Components/Layout/LocationHeader.js).

---

## Phase 2 — Tune search (`/otsi/viisid`)

Two-pane layout. URL is the source of truth — every filter is a query param, sharable, bookmarkable, browser-back works.

**Filter rail** (collapsible groups, multi-select, info-icon tooltips on each filter):

- Identity: `tuneReference`, `textReference`, `soundReference`, `videoReference`
- Classification: `tuneState`, `tuneForm`, `tuneGenre`, `rhythmType`, `keySignature`, `pitch`, `measure`, `soundRange`, `textForm`, `verseForm`, `songGenre`, `songTopic`
- Geography: cascading `parish` → `municipality` → `village`
- People: person + role (e.g. *singer = X*)
- Origin: `nation`, `language`, `country`
- Flags: `verified`, `hasMelody`, `hasSound`, `hasVideo`
- Dates: `created`, `modified` ranges

**Top bar:** free-text query + sort (relevance | reference | created | modified | verified) + page size.

**Results:** card rows — references, primary singer, parish, abcjs first-line preview, state + verified badges. Editors see inline **Edit** / **Open** actions (role-gated render only — backend still authorizes).

New: `frontend/src/Components/Search/TuneSearch/` (`TuneSearchPage`, `FilterPanel`, `FilterGroup`, `ResultCard`, `SortBar`).

Repurpose: [SearchBar.js](../../frontend/src/Components/Search/SearchBar.js), [SearchResults.js](../../frontend/src/Components/Search/SearchResults.js).

Delete (after redirect): [TunesList.js](../../frontend/src/Components/Tunes/TunesList.js).

---

## Phase 3 — Backend (Postgres FTS)

1. **Migration** in `backend/migrations/`: add `tsv tsvector` column to `folk_tune` and `person`. Trigger populates from references + remarks + joined classifier titles + joined person names. GIN index on `tsv`. Stemming: `simple` (Estonian dict optional later).
2. **New endpoint** `POST /tunes/search` accepting:
   ```
   { q?: string, filters: {...}, sort, page, pageSize }
   ```
   Single SQL query: `WHERE tsv @@ plainto_tsquery($q) AND <filter joins/INs> ORDER BY ts_rank|<sort>`. **No auth decorator** — public.
3. **Mirror** for `POST /persons/search`.
4. Replace [backend/src/utils/search-utils.ts](../../backend/src/utils/search-utils.ts) with a query-builder module. Drop `type=full`; keep `type=reference` only as a thin shortcut, or remove entirely.

---

## Phase 4 — Person search (`/otsi/isikud`)

Smaller version of the tune search:

- Free text over `givenName`, `surname`, `nickname`, `pid`, `remarks`.
- Filters: `sex`, life-year ranges, "appears in tunes as" role (collector / singer / transcriber / …), parish (via tune relations).
- Result row: full name + dates + role badges + tune count → links to person detail.

---

## Phase 5 — Editor affordances

No suggestions table. All edits are immediate.

- Role-gated **Halda** menu in the header: Halda viise, Halda isikuid, Klassifikaatorid, Auditilogi.
- Editor-only **Edit / Duplicate / Delete** buttons rendered inline on tune and person search result cards.
- Reattach [MassModification.js](../../frontend/src/Components/Search/MassModification.js) as a **bulk action on the current filtered result set** (e.g. "set state to X for all 47 matching tunes") — editor-only.
- "New tune" / "New person" buttons on the respective search pages, editor-only.

Existing [audit](../../frontend/src/Components/Tunes/TuneAudit.js) trail covers traceability.

---

## Phase 6 — Cleanup

- Delete `TunesList.js`, `PersonsList.js`, the `searchHelp` page content + i18n strings, the `/otsinguabi` route.
- Update breadcrumbs in [LocationHeader.js](../../frontend/src/Components/Layout/LocationHeader.js).
- Update header nav and remove the standalone search page link.

---

## Build order

1. **Phase 3** (FTS migration + endpoints) — unblocks UI.
2. **Phase 2** (tune search UI).
3. **Phase 1** (route restructuring, classifier-link redirects).
4. **Phase 4** (person search).
5. **Phase 5** (editor affordances + bulk actions).
6. **Phase 6** (cleanup).
