/*----- TUNE PERSON  -----*/
INSERT INTO folk_tune.tunes_persons_roles 
(tune_id, person_id, name_origin, person_age, tune_person_role_type_id, action_start_year, remarks)
VALUES
  (3, 20, NULL, NULL, 1, 1923, NULL)
;

INSERT INTO folk_tune.tunes_persons_roles 
(tune_id, person_id, name_origin, person_age, tune_person_role_type_id, action_start_year, remarks)
VALUES
  (3, 21, 'preester Andrei Ramul', NULL, 2, 1850, '<Saadetud 1923>')
;

/*----- PLACE -----*/
INSERT INTO folk_tune.tune_places 
(tune_id, person_id, tune_place_type_id, parish_id, municipality_id, village_id, other_place, remarks) 
VALUES 
  (3, 20, 1, 8, NULL, NULL, NULL, NULL)
;

INSERT INTO folk_tune.tune_places 
(tune_id, person_id, tune_place_type_id, parish_id, municipality_id, village_id, other_place, remarks) 
VALUES 
  (3, 21, 2, 9, 6, 7, NULL, NULL)
;

/*----- PERFORMANCE -----*/
INSERT INTO folk_tune.tune_performances 
(tune_id, actual_performance_type_id, traditional_performance_type_id, actual_action_type_id, 
  accompaniment, remarks)
VALUES 
  (3, 1, NULL, NULL, NULL, NULL)
;

/*----- SONG -----*/
INSERT INTO folk_tune.tune_songs 
(tune_id, song_type, first_verse, refrain, remarks)
VALUES
  (3, 'Jänese õhkamine', 'Oh mina vaene valge jänes', NULL, NULL)
;

INSERT INTO folk_tune.tune_songs_song_genres 
(tune_song_id, song_genre_id)
VALUES
  (1, 47)
;

INSERT INTO folk_tune.tune_songs_verse_forms 
(tune_song_id, verse_form_id)
VALUES
  (1, 1)
;

/*----- MUSICAL CHARACTERISTICS -----*/
INSERT INTO folk_tune.musical_characteristics 
(tune_id, sound_range_id, melostrophe_num_score, melostrophe_num_audio, is_variable, remarks)
VALUES
  (3, 3, NULL, NULL, FALSE, NULL)
;

INSERT INTO folk_tune.musical_characteristics_tune_forms 
(musical_characteristic_id, tune_form_id)
VALUES
  (1, 2)
;

INSERT INTO folk_tune.musical_characteristics_text_forms 
(musical_characteristic_id, text_form_id)
VALUES
  (1, 2)
;

INSERT INTO folk_tune.musical_characteristics_rhythm_types 
(musical_characteristic_id, rhythm_type_id)
VALUES
  (1, 3)
;

/*----- TRANSCRIPTION -----*/
INSERT INTO folk_tune.tune_transcriptions 
(tune_id, transcription_source_id, file_reference)
VALUES
  (3, 1, 'A_3476.jpg')
;

/*----- TRANSCRIPTION PERSON -----*/
INSERT INTO folk_tune.transcriptions_persons_roles 
(tune_transcription_id, person_id, transcription_person_role_type_id, action_year, remarks)
VALUES
  (1, 21, 1, NULL, NULL)
;

INSERT INTO folk_tune.transcriptions_persons_roles 
(tune_transcription_id, person_id, transcription_person_role_type_id, action_year, remarks)
VALUES
  (1, 21, 2, NULL, NULL)
;
