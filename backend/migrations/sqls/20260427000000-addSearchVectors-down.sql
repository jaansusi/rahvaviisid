DROP TRIGGER IF EXISTS tr_tpr_refresh_tsv ON folk_tune.transcriptions_persons_roles;
DROP TRIGGER IF EXISTS tr_tpta_refresh_tsv ON folk_tune.tune_performances_traditional_actions;
DROP TRIGGER IF EXISTS tr_mcft_refresh_tsv ON folk_tune.musical_characteristics_text_forms;
DROP TRIGGER IF EXISTS tr_mctf_refresh_tsv ON folk_tune.musical_characteristics_tune_forms;
DROP TRIGGER IF EXISTS tr_mcrt_refresh_tsv ON folk_tune.musical_characteristics_rhythm_types;
DROP TRIGGER IF EXISTS tr_tsvf_refresh_tsv ON folk_tune.tune_songs_verse_forms;
DROP TRIGGER IF EXISTS tr_tsst_refresh_tsv ON folk_tune.tune_songs_song_topics;
DROP TRIGGER IF EXISTS tr_tstg_refresh_tsv ON folk_tune.tune_songs_tune_genres;
DROP TRIGGER IF EXISTS tr_tssg_refresh_tsv ON folk_tune.tune_songs_song_genres;
DROP TRIGGER IF EXISTS tr_tune_encodings_refresh_tsv ON folk_tune.tune_encodings;
DROP TRIGGER IF EXISTS tr_tune_transcriptions_refresh_tsv ON folk_tune.tune_transcriptions;
DROP TRIGGER IF EXISTS tr_tunes_persons_roles_refresh_tsv ON folk_tune.tunes_persons_roles;
DROP TRIGGER IF EXISTS tr_tune_performances_refresh_tsv ON folk_tune.tune_performances;
DROP TRIGGER IF EXISTS tr_tune_places_refresh_tsv ON folk_tune.tune_places;
DROP TRIGGER IF EXISTS tr_musical_characteristics_refresh_tsv ON folk_tune.musical_characteristics;
DROP TRIGGER IF EXISTS tr_tune_songs_refresh_tsv ON folk_tune.tune_songs;
DROP TRIGGER IF EXISTS tr_external_references_refresh_tsv ON folk_tune.external_references;
DROP TRIGGER IF EXISTS tr_tunes_refresh_tsv ON folk_tune.tunes;
DROP TRIGGER IF EXISTS tr_persons_set_tsv ON folk_tune.persons;

DROP FUNCTION IF EXISTS folk_tune.f_rebuild_all_tune_tsv();
DROP FUNCTION IF EXISTS folk_tune.f_trg_refresh_tsv_by_tune_transcription_id();
DROP FUNCTION IF EXISTS folk_tune.f_trg_refresh_tsv_by_tune_performance_id();
DROP FUNCTION IF EXISTS folk_tune.f_trg_refresh_tsv_by_mc_id();
DROP FUNCTION IF EXISTS folk_tune.f_trg_refresh_tsv_by_tune_song_id();
DROP FUNCTION IF EXISTS folk_tune.f_trg_refresh_tsv_by_tune_id();
DROP FUNCTION IF EXISTS folk_tune.f_trg_refresh_own_tune_tsv();
DROP FUNCTION IF EXISTS folk_tune.f_refresh_tune_tsv(integer);
DROP FUNCTION IF EXISTS folk_tune.f_build_tune_tsv(integer);
DROP FUNCTION IF EXISTS folk_tune.f_set_person_tsv();

DROP INDEX IF EXISTS folk_tune.IX_persons_tsv;
DROP INDEX IF EXISTS folk_tune.IX_tunes_tsv;

ALTER TABLE folk_tune.persons DROP COLUMN IF EXISTS tsv;
ALTER TABLE folk_tune.tunes DROP COLUMN IF EXISTS tsv;
