INSERT INTO folk_tune.tunes_persons_roles (id, tune_id, person_id, person_age, tune_person_role_type_id, action_start_year, action_end_year, remarks)
VALUES 
    (1,1,1,25,1,2000,2010,'testkommentaar variandile 11');

INSERT INTO folk_tune.tune_Encodings (id, tune_id, tune_encoding_num, key_signature_id, support_sound_id, pitch_id, measure_id, tempo, remarks)
VALUES
    (1,1,1,1,1,1,1,'kiire','tempo märkus');

INSERT INTO folk_tune.tune_songs (id, tune_id, song_type, song_title, first_verse, refrain, remarks)
VALUES
    (1,1,'testlaululiik','testlaulupealkiri','esimene värss','refrään','märkused');

INSERT INTO folk_tune.tune_places (id, tune_id, person_id, tune_place_type_id, parish_id, municipality_id, village_id, other_place, remarks)
VALUES
    (1,1,1,1,1,1,1,'testija talu','ilm oli tavapärane');

INSERT INTO folk_tune.tune_performances (id, tune_id, actual_performance_type_id, traditional_performance_type_id, actual_action_type_id, accompaniment, remarks)
VALUES
    (1,1,1,1,1,'test accompaniment','test esitluse märkus');
