-- To update this script, use the output of this script:

-- SELECT 'SELECT SETVAL(' ||
--        quote_literal(quote_ident(PGT.schemaname) || '.' || quote_ident(S.relname)) ||
--        ', COALESCE(MAX(' ||quote_ident(C.attname)|| '), 1) ) FROM ' ||
--        quote_ident(PGT.schemaname)|| '.'||quote_ident(T.relname)|| ';'
-- FROM pg_class AS S,
--      pg_depend AS D,
--      pg_class AS T,
--      pg_attribute AS C,
--      pg_tables AS PGT
-- WHERE S.relkind = 'S'
--     AND S.oid = D.objid
--     AND D.refobjid = T.oid
--     AND D.refobjid = C.attrelid
--     AND D.refobjsubid = C.attnum
--     AND T.relname = PGT.tablename
-- ORDER BY S.relname;

SELECT SETVAL('folk_tune.actual_action_types_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.actual_action_types;
SELECT SETVAL('folk_tune.actual_performance_types_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.actual_performance_types;
SELECT SETVAL('folk_tune.audit_log_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.audit_log;
SELECT SETVAL('folk_tune.countries_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.countries;
SELECT SETVAL('folk_tune.external_references_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.external_references;
SELECT SETVAL('folk_tune.key_signatures_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.key_signatures;
SELECT SETVAL('folk_tune.languages_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.languages;
SELECT SETVAL('folk_tune.measures_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.measures;
SELECT SETVAL('folk_tune.municipalities_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.municipalities;
SELECT SETVAL('folk_tune.musical_characteristics_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.musical_characteristics;
SELECT SETVAL('folk_tune.musical_characteristics_rhythm_types_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.musical_characteristics_rhythm_types;
SELECT SETVAL('folk_tune.musical_characteristics_text_forms_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.musical_characteristics_text_forms;
SELECT SETVAL('folk_tune.musical_characteristics_tune_forms_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.musical_characteristics_tune_forms;
SELECT SETVAL('folk_tune.nations_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.nations;
SELECT SETVAL('folk_tune.pages_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.pages;
SELECT SETVAL('folk_tune.parishes_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.parishes;
SELECT SETVAL('folk_tune.persons_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.persons;
SELECT SETVAL('folk_tune.pitches_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.pitches;
SELECT SETVAL('folk_tune.rhythm_types_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.rhythm_types;
SELECT SETVAL('folk_tune.sexes_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.sexes;
SELECT SETVAL('folk_tune.song_genres_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.song_genres;
SELECT SETVAL('folk_tune.song_topics_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.song_topics;
SELECT SETVAL('folk_tune.sound_ranges_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.sound_ranges;
SELECT SETVAL('folk_tune.support_sounds_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.support_sounds;
SELECT SETVAL('folk_tune.text_forms_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.text_forms;
SELECT SETVAL('folk_tune.traditional_action_types_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.traditional_action_types;
SELECT SETVAL('folk_tune.traditional_performance_types_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.traditional_performance_types;
SELECT SETVAL('folk_tune.transcription_person_role_types_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.transcription_person_role_types;
SELECT SETVAL('folk_tune.transcription_sources_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.transcription_sources;
SELECT SETVAL('folk_tune.transcriptions_persons_roles_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.transcriptions_persons_roles;
SELECT SETVAL('folk_tune.tune_encodings_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_encodings;
SELECT SETVAL('folk_tune.tune_forms_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_forms;
SELECT SETVAL('folk_tune.tune_genres_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_genres;
SELECT SETVAL('folk_tune.tune_melodies_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_melodies;
SELECT SETVAL('folk_tune.tune_performances_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_performances;
SELECT SETVAL('folk_tune.tune_performances_traditional_actions_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_performances_traditional_actions;
SELECT SETVAL('folk_tune.tune_person_role_types_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_person_role_types;
SELECT SETVAL('folk_tune.tune_place_types_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_place_types;
SELECT SETVAL('folk_tune.tune_places_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_places;
SELECT SETVAL('folk_tune.tune_songs_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_songs;
SELECT SETVAL('folk_tune.tune_songs_song_genres_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_songs_song_genres;
SELECT SETVAL('folk_tune.tune_songs_song_topics_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_songs_song_topics;
SELECT SETVAL('folk_tune.tune_songs_tune_genres_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_songs_tune_genres;
SELECT SETVAL('folk_tune.tune_songs_verse_forms_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_songs_verse_forms;
SELECT SETVAL('folk_tune.tune_states_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_states;
SELECT SETVAL('folk_tune.tune_transcriptions_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tune_transcriptions;
SELECT SETVAL('folk_tune.tunes_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tunes;
SELECT SETVAL('folk_tune.tunes_persons_roles_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.tunes_persons_roles;
SELECT SETVAL('folk_tune.verse_forms_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.verse_forms;
SELECT SETVAL('folk_tune.villages_id_seq', COALESCE(MAX(id), 1) ) FROM folk_tune.villages;