CREATE DOMAIN folk_tune.D_timestamp timestamp NOT NULL DEFAULT localtimestamp(0)
    CONSTRAINT CK_timestamp_check CHECK (VALUE BETWEEN '2020-01-01' AND '2200-01-01')
;

CREATE TABLE folk_tune.sexes
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_sexes PRIMARY KEY (id),
    CONSTRAINT CK_sexes_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_sexes_title ON folk_tune.sexes (UPPER(title))
;

CREATE TABLE folk_tune.persons
(
    id serial NOT NULL,
    pid text,
    given_name text,
    surname text,
    nickname text,
    birth_year smallint,
    death_year smallint,
    sex_id smallint NOT NULL,
    remarks text,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_persons PRIMARY KEY (id),
    CONSTRAINT FK_persons_sexes FOREIGN KEY (sex_id) REFERENCES folk_tune.sexes (id),
    CONSTRAINT CK_persons_name_exist CHECK 
    (
        (given_name IS NOT NULL) OR 
        (surname IS NOT NULL) OR
        (nickname IS NOT NULL)
    ),
    CONSTRAINT CK_persons_death_year_no_earlier_than_birth_year CHECK (death_year >= birth_year),
    CONSTRAINT CK_persons_modified_no_earlier_than_created CHECK (modified >= created)
) WITH (fillfactor = 90)
;

CREATE INDEX IX_persons_sexes ON folk_tune.persons (sex_id)
;

CREATE UNIQUE INDEX IX_persons_pid ON folk_tune.persons (UPPER(pid))
;

CREATE TABLE folk_tune.users
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    realm text,
    email text UNIQUE NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,
    emailverified boolean,
    verificationtoken text,
    username text,
    firstname text,
    lastname text,
    roles text[],
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_users PRIMARY KEY (id),
    CONSTRAINT CK_users_modified_no_earlier_than_created CHECK (modified >= created)
) WITH (fillfactor = 90)
;

CREATE TABLE folk_tune."user_credentials"
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    password text NOT NULL,
    userid uuid UNIQUE,
    CONSTRAINT fk_user_credentials_user FOREIGN KEY (userid)
        REFERENCES folk_tune.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
;

CREATE TABLE folk_tune."refresh_token"
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    userid uuid NOT NULL,
    refreshToken text,
    CONSTRAINT fk_refresh_token_user FOREIGN KEY (userid)
        REFERENCES folk_tune.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
;

CREATE TABLE folk_tune.tune_states
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_states PRIMARY KEY (id),
    CONSTRAINT CK_tune_states_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_tune_states_title ON folk_tune.tune_states (UPPER(title))
;

CREATE TABLE folk_tune.nations
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_nations PRIMARY KEY (id),
    CONSTRAINT CK_nations_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_nations_title ON folk_tune.nations (UPPER(title))
;

CREATE TABLE folk_tune.languages
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_languages PRIMARY KEY (id),
    CONSTRAINT CK_languages_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_languages_title ON folk_tune.languages (UPPER(title))
;

CREATE TABLE folk_tune.countries
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_countries PRIMARY KEY (id),
    CONSTRAINT CK_countries_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_countries_title ON folk_tune.countries (UPPER(title))
;

CREATE TABLE folk_tune.tunes
(
    id serial NOT NULL,
    tune_state_id smallint NOT NULL DEFAULT 1,
    tune_reference text,
    text_reference text,
    sound_reference text,
    video_reference text,
    catalogue text,
    nation_id smallint NOT NULL DEFAULT 1,
    language_id smallint NOT NULL DEFAULT 1,
    country_id smallint NOT NULL DEFAULT 1,
    publications text,
    remarks text,
    verified_by uuid,
    verified_by_id integer,
    verified date,
        tune_id smallint,
    old_tune_id smallint,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tunes PRIMARY KEY (id),
    CONSTRAINT FK_tunes_tune_states FOREIGN KEY (tune_state_id) REFERENCES folk_tune.tune_states (id),
    CONSTRAINT FK_tunes_nations FOREIGN KEY (nation_id) REFERENCES folk_tune.nations (id),
    CONSTRAINT FK_tunes_languages FOREIGN KEY (language_id) REFERENCES folk_tune.languages (id),
    CONSTRAINT FK_tunes_countries FOREIGN KEY (country_id) REFERENCES folk_tune.countries (id),
    CONSTRAINT FK_tunes_users FOREIGN KEY (verified_by) REFERENCES folk_tune.users (id),
    CONSTRAINT CK_tunes_reference_exist CHECK 
    (
        (tune_reference IS NOT NULL) OR 
        (text_reference IS NOT NULL) OR
        (sound_reference IS NOT NULL) OR
        (video_reference IS NOT NULL)
    ),
    CONSTRAINT CK_tunes_verified_consistent_with_verified_by CHECK (NOT (verified IS NOT NULL) OR (verified_by IS NOT NULL)),
    CONSTRAINT CK_tunes_verified_check CHECK (verified BETWEEN '2000-01-01' AND '2200-01-01'),
    CONSTRAINT CK_tunes_verified_no_greater_than_current_date CHECK (verified <= date_trunc('day', localtimestamp(0))),
    CONSTRAINT CK_tunes_modified_no_earlier_than_created CHECK (modified >= created)
) WITH (fillfactor = 90)
;

CREATE INDEX IX_tunes_tune_states ON folk_tune.tunes (tune_state_id)
;

CREATE INDEX IX_tunes_nations ON folk_tune.tunes (nation_id)
;

CREATE INDEX IX_tunes_languages ON folk_tune.tunes (language_id)
;

CREATE INDEX IX_tunes_countries ON folk_tune.tunes (country_id)
;

CREATE INDEX IX_tunes_users ON folk_tune.tunes (verified_by)
;

CREATE TABLE folk_tune.tune_place_types
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_place_types PRIMARY KEY (id),
    CONSTRAINT CK_tune_place_types_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_tune_place_types_title ON folk_tune.tune_place_types (UPPER(title))
;

CREATE TABLE folk_tune.parishes
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_parishes PRIMARY KEY (id),
    CONSTRAINT CK_parishes_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_parishes_title ON folk_tune.parishes (UPPER(title))
;

CREATE TABLE folk_tune.municipalities
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_municipalities PRIMARY KEY (id),
    CONSTRAINT CK_municipalities_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_municipalities_title ON folk_tune.municipalities (UPPER(title))
;

CREATE TABLE folk_tune.villages
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_villages PRIMARY KEY (id),
    CONSTRAINT CK_villages_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_villages_title ON folk_tune.villages (UPPER(title))
;

CREATE TABLE folk_tune.tune_places
(
    id serial NOT NULL,
    tune_id integer NOT NULL,
    person_id integer,
    tune_place_type_id smallint NOT NULL,
    parish_id smallint NOT NULL,
    municipality_id smallint,
    village_id smallint,
    other_place text,
    remarks text,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_places PRIMARY KEY (id),
    CONSTRAINT FK_tune_places_tunes FOREIGN KEY (tune_id) REFERENCES folk_tune.tunes (id) ON DELETE CASCADE,
    CONSTRAINT FK_tune_places_persons FOREIGN KEY (person_id) REFERENCES folk_tune.persons (id),
    CONSTRAINT FK_tune_places_tune_place_types FOREIGN KEY (tune_place_type_id) REFERENCES folk_tune.tune_place_types (id),
    CONSTRAINT FK_tune_places_parishes FOREIGN KEY (parish_id) REFERENCES folk_tune.parishes (id),
    CONSTRAINT FK_tune_places_municipalities FOREIGN KEY (municipality_id) REFERENCES folk_tune.municipalities (id),
    CONSTRAINT FK_tune_places_villages FOREIGN KEY (village_id) REFERENCES folk_tune.villages (id),
    CONSTRAINT CK_tune_places_modified_no_earlier_than_created CHECK (modified >= created)
) WITH (fillfactor = 90)
;

CREATE INDEX IX_tune_places_tunes ON folk_tune.tune_places (tune_id)
;

CREATE INDEX IX_tune_places_persons ON folk_tune.tune_places (person_id)
;

CREATE INDEX IX_tune_places_tune_place_types ON folk_tune.tune_places (tune_place_type_id)
;

CREATE INDEX IX_tune_places_parishes ON folk_tune.tune_places (parish_id)
;

CREATE INDEX IX_tune_places_municipalities ON folk_tune.tune_places (municipality_id)
;

CREATE INDEX IX_tune_places_villages ON folk_tune.tune_places (village_id)
;

CREATE TABLE folk_tune.actual_performance_types
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_actual_performance_types PRIMARY KEY (id),
    CONSTRAINT CK_actual_performance_types_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_actual_performance_types_title ON folk_tune.actual_performance_types (UPPER(title))
;

CREATE TABLE folk_tune.traditional_performance_types
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_traditional_performance_types PRIMARY KEY (id),
    CONSTRAINT CK_tpt_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_traditional_performance_types_title ON folk_tune.traditional_performance_types (UPPER(title))
;

CREATE TABLE folk_tune.actual_action_types
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_actual_action_types PRIMARY KEY (id),
    CONSTRAINT CK_actual_action_types_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_actual_action_types_title ON folk_tune.actual_action_types (UPPER(title))
;

CREATE TABLE folk_tune.tune_performances
(
    id serial NOT NULL,
    tune_id integer NOT NULL,
    actual_performance_type_id smallint NOT NULL,
    traditional_performance_type_id smallint,
    actual_action_type_id smallint,
    accompaniment text,
    remarks text,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_performances PRIMARY KEY (id),
    CONSTRAINT UQ_tune_performances_tune_id UNIQUE (tune_id),
    CONSTRAINT FK_tune_performances_tunes FOREIGN KEY (tune_id) REFERENCES folk_tune.tunes (id) ON DELETE CASCADE,
    CONSTRAINT FK_tune_performances_actual_performance_types FOREIGN KEY (actual_performance_type_id)
        REFERENCES folk_tune.actual_performance_types (id),
    CONSTRAINT FK_tune_performances_traditional_performance_types FOREIGN KEY (traditional_performance_type_id)
        REFERENCES folk_tune.traditional_performance_types (id),
    CONSTRAINT FK_tune_performances_actual_action_types FOREIGN KEY (actual_action_type_id)
        REFERENCES folk_tune.actual_action_types (id),
    CONSTRAINT CK_tune_performances_modified_no_earlier_than_created CHECK (modified >= created)
) WITH (fillfactor = 90)
;

CREATE INDEX IX_tune_performances_actual_performance_types ON folk_tune.tune_performances (actual_performance_type_id)
;

CREATE INDEX IX_tune_performances_traditional_performance_types ON folk_tune.tune_performances (traditional_performance_type_id)
;

CREATE INDEX IX_tune_performances_actual_action_types ON folk_tune.tune_performances (actual_action_type_id)
;

CREATE TABLE folk_tune.traditional_action_types
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_traditional_action_types PRIMARY KEY (id),
    CONSTRAINT CK_traditional_action_types_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_traditional_action_types_title ON folk_tune.traditional_action_types (UPPER(title))
;

CREATE TABLE folk_tune.tune_performances_traditional_actions
(
    id serial NOT NULL,
    tune_performance_id integer NOT NULL,
    traditional_action_type_id smallint NOT NULL,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_performances_traditional_actions PRIMARY KEY (id),
    CONSTRAINT UQ_tpta_tune_performance_id_traditional_action_type_id UNIQUE (tune_performance_id, traditional_action_type_id),
    CONSTRAINT FK_tpta_tune_performances FOREIGN KEY (tune_performance_id)
        REFERENCES folk_tune.tune_performances (id) ON DELETE CASCADE,
    CONSTRAINT FK_tpta_traditional_action_types FOREIGN KEY (traditional_action_type_id)
        REFERENCES folk_tune.traditional_action_types (id),
    CONSTRAINT CK_tpta_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE INDEX IX_tpta_traditional_action_types ON folk_tune.tune_performances_traditional_actions (traditional_action_type_id)
;

CREATE TABLE folk_tune.tune_songs
(
    id serial NOT NULL,
    tune_id integer NOT NULL,
    song_type text,
    song_title text,
    first_verse text,
    refrain text,
    remarks text,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_songs PRIMARY KEY (id),
    CONSTRAINT UQ_tune_songs_tune_id UNIQUE (tune_id),
    CONSTRAINT FK_tune_songs_tunes FOREIGN KEY (tune_id) REFERENCES folk_tune.tunes (id) ON DELETE CASCADE,
    CONSTRAINT CK_tune_songs_modified_no_earlier_than_created CHECK (modified >= created)
) WITH (fillfactor = 90)
;

CREATE TABLE folk_tune.song_genres
(
    id smallserial NOT NULL,
    parent_id smallint DEFAULT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    lft smallint DEFAULT NULL,
    rght smallint DEFAULT NULL,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_song_genres PRIMARY KEY (id),
    CONSTRAINT FK_song_genres FOREIGN KEY (parent_id) REFERENCES folk_tune.song_genres (id) ON DELETE SET NULL,
    CONSTRAINT CK_song_genres_id_not_equal_parent_id CHECK (id <> parent_id),
    CONSTRAINT CK_song_genres_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE INDEX IX_song_genres_lft ON folk_tune.song_genres (lft)
;

CREATE INDEX IX_song_genres_rght ON folk_tune.song_genres (rght)
;

CREATE UNIQUE INDEX IX_song_genres_parent_id_title ON folk_tune.song_genres (COALESCE(parent_id, 0), UPPER(title))
;

CREATE TABLE folk_tune.tune_genres
(
    id smallserial NOT NULL,
    parent_id smallint DEFAULT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    lft smallint DEFAULT NULL,
    rght smallint DEFAULT NULL,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_genres PRIMARY KEY (id),
    CONSTRAINT FK_tune_genres FOREIGN KEY (parent_id) REFERENCES folk_tune.tune_genres (id) ON DELETE SET NULL,
    CONSTRAINT CK_tune_genres_id_not_equal_parent_id CHECK (id <> parent_id),
    CONSTRAINT CK_tune_genres_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE INDEX IX_tune_genres_lft ON folk_tune.tune_genres (lft)
;

CREATE INDEX IX_tune_genres_rght ON folk_tune.tune_genres (rght)
;

CREATE UNIQUE INDEX IX_tune_genres_parent_id_title ON folk_tune.tune_genres (COALESCE(parent_id, 0), UPPER(title))
;

CREATE TABLE folk_tune.tune_songs_song_genres
(
    id serial NOT NULL,
    tune_song_id integer NOT NULL,
    song_genre_id smallint NOT NULL,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_songs_song_genres PRIMARY KEY (id),
    CONSTRAINT UQ_tssg_tune_song_id_song_genre_id UNIQUE (tune_song_id, song_genre_id),
    CONSTRAINT FK_tssg_tune_songs FOREIGN KEY (tune_song_id) REFERENCES folk_tune.tune_songs (id) ON DELETE CASCADE,
    CONSTRAINT FK_tssg_song_genres FOREIGN KEY (song_genre_id) REFERENCES folk_tune.song_genres (id),
    CONSTRAINT CK_tssg_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE INDEX IX_tssg_song_genres ON folk_tune.tune_songs_song_genres (song_genre_id)
;

CREATE TABLE folk_tune.tune_songs_tune_genres
(
    id serial NOT NULL,
    tune_song_id integer NOT NULL,
    tune_genre_id smallint NOT NULL,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_songs_tune_genres PRIMARY KEY (id),
    CONSTRAINT UQ_tstg_tune_song_id_tune_genre_id UNIQUE (tune_song_id, tune_genre_id),
    CONSTRAINT FK_tstg_tune_songs FOREIGN KEY (tune_song_id) REFERENCES folk_tune.tune_songs (id) ON DELETE CASCADE,
    CONSTRAINT FK_tstg_tune_genres FOREIGN KEY (tune_genre_id) REFERENCES folk_tune.tune_genres (id),
    CONSTRAINT CK_tstg_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE INDEX IX_tstg_tune_genres ON folk_tune.tune_songs_tune_genres (tune_genre_id)
;

CREATE TABLE folk_tune.song_topics
(
    id smallserial NOT NULL,
    parent_id smallint DEFAULT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    lft smallint DEFAULT NULL,
    rght smallint DEFAULT NULL,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_song_topics PRIMARY KEY (id),
    CONSTRAINT FK_song_topics FOREIGN KEY (parent_id) REFERENCES folk_tune.song_topics (id) ON DELETE SET NULL,
    CONSTRAINT CK_song_topics_id_not_equal_parent_id CHECK (id <> parent_id),
    CONSTRAINT CK_song_topics_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE INDEX IX_song_topics_lft ON folk_tune.song_topics (lft)
;

CREATE INDEX IX_song_topics_rght ON folk_tune.song_topics (rght)
;

CREATE UNIQUE INDEX IX_song_topics_parent_id_title ON folk_tune.song_topics (COALESCE(parent_id, 0), UPPER(title))
;

CREATE TABLE folk_tune.tune_songs_song_topics
(
    id serial NOT NULL,
    tune_song_id integer NOT NULL,
    song_topic_id smallint NOT NULL,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_songs_song_topics PRIMARY KEY (id),
    CONSTRAINT UQ_tsst_tune_song_id_song_topic_id UNIQUE (tune_song_id, song_topic_id),
    CONSTRAINT FK_tsst_tune_songs FOREIGN KEY (tune_song_id) REFERENCES folk_tune.tune_songs (id) ON DELETE CASCADE,
    CONSTRAINT FK_tsst_song_topics FOREIGN KEY (song_topic_id) REFERENCES folk_tune.song_topics (id),
    CONSTRAINT CK_tsst_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE INDEX IX_tsst_song_topics ON folk_tune.tune_songs_song_topics (song_topic_id)
;

CREATE TABLE folk_tune.verse_forms
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_verse_forms PRIMARY KEY (id),
    CONSTRAINT CK_verse_forms_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_verse_forms_title ON folk_tune.verse_forms (UPPER(title))
;

CREATE TABLE folk_tune.tune_songs_verse_forms
(
    id serial NOT NULL,
    tune_song_id integer NOT NULL,
    verse_form_id smallint NOT NULL,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_songs_verse_forms PRIMARY KEY (id),
    CONSTRAINT UQ_tsvf_tune_song_id_verse_form_id UNIQUE (tune_song_id, verse_form_id),
    CONSTRAINT FK_tsvf_tune_songs FOREIGN KEY (tune_song_id) REFERENCES folk_tune.tune_songs (id) ON DELETE CASCADE,
    CONSTRAINT FK_tsvf_verse_forms FOREIGN KEY (verse_form_id) REFERENCES folk_tune.verse_forms (id),
    CONSTRAINT CK_tsvf_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE INDEX IX_tsvf_verse_forms ON folk_tune.tune_songs_verse_forms (verse_form_id)
;

CREATE TABLE folk_tune.sound_ranges
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_sound_ranges PRIMARY KEY (id),
    CONSTRAINT CK_sound_ranges_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_sound_ranges_title ON folk_tune.sound_ranges (UPPER(title))
;

CREATE TABLE folk_tune.musical_characteristics
(
    id serial NOT NULL,
    tune_id integer NOT NULL,
    sound_range_id smallint NOT NULL,
    melostrophe_num_score text,
    melostrophe_num_audio text,
    is_variable boolean NOT NULL DEFAULT FALSE,
    remarks text,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_musical_characteristics PRIMARY KEY (id),
    CONSTRAINT UQ_musical_characteristics_tune_id UNIQUE (tune_id),
    CONSTRAINT FK_musical_characteristics_tunes FOREIGN KEY (tune_id) REFERENCES folk_tune.tunes (id) ON DELETE CASCADE,
    CONSTRAINT FK_musical_characteristics_sound_ranges FOREIGN KEY (sound_range_id) REFERENCES folk_tune.sound_ranges (id),
    CONSTRAINT CK_musical_characteristics_modified_no_earlier_than_created CHECK (modified >= created)
) WITH (fillfactor = 90)
;

CREATE INDEX IX_musical_characteristics_sound_ranges ON folk_tune.musical_characteristics (sound_range_id)
;

CREATE TABLE folk_tune.rhythm_types
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_rhythm_types PRIMARY KEY (id),
    CONSTRAINT CK_rhythm_types_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_rhythm_types_title ON folk_tune.rhythm_types (UPPER(title))
;

CREATE TABLE folk_tune.musical_characteristics_rhythm_types
(
    id serial NOT NULL,
    musical_characteristic_id integer NOT NULL,
    rhythm_type_id smallint NOT NULL,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_musical_characteristics_rhythm_types PRIMARY KEY (id),
    CONSTRAINT UQ_mcrt_musical_characteristic_id_rhythm_type_id UNIQUE (musical_characteristic_id, rhythm_type_id),
    CONSTRAINT FK_mcrt_musical_characteristics FOREIGN KEY (musical_characteristic_id)
        REFERENCES folk_tune.musical_characteristics (id) ON DELETE CASCADE,
    CONSTRAINT FK_mcrt_rhythm_types FOREIGN KEY (rhythm_type_id) REFERENCES folk_tune.rhythm_types (id),
    CONSTRAINT CK_mcrt_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE INDEX IX_mcrt_rhythm_types ON folk_tune.musical_characteristics_rhythm_types (rhythm_type_id)
;

CREATE TABLE folk_tune.tune_forms
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_forms PRIMARY KEY (id),
    CONSTRAINT CK_tune_forms_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_tune_forms_title ON folk_tune.tune_forms (UPPER(title))
;

CREATE TABLE folk_tune.musical_characteristics_tune_forms
(
    id serial NOT NULL,
    musical_characteristic_id integer NOT NULL,
    tune_form_id smallint NOT NULL,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_musical_characteristics_tune_forms PRIMARY KEY (id),
    CONSTRAINT UQ_mctf_musical_characteristic_id_tune_form_id UNIQUE (musical_characteristic_id, tune_form_id),
    CONSTRAINT FK_mctf_musical_characteristics FOREIGN KEY (musical_characteristic_id)
        REFERENCES folk_tune.musical_characteristics (id) ON DELETE CASCADE,
    CONSTRAINT FK_mctf_tune_forms FOREIGN KEY (tune_form_id) REFERENCES folk_tune.tune_forms (id),
    CONSTRAINT CK_mctf_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE INDEX IX_mctf_tune_forms ON folk_tune.musical_characteristics_tune_forms (tune_form_id)
;

CREATE TABLE folk_tune.text_forms
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_text_forms PRIMARY KEY (id),
    CONSTRAINT CK_text_forms_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_text_forms_title ON folk_tune.text_forms (UPPER(title))
;

CREATE TABLE folk_tune.musical_characteristics_text_forms
(
    id serial NOT NULL,
    musical_characteristic_id integer NOT NULL,
    text_form_id smallint NOT NULL,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_musical_characteristics_text_forms PRIMARY KEY (id),
    CONSTRAINT UQ_mcft_musical_characteristic_id_text_form_id UNIQUE (musical_characteristic_id, text_form_id),
    CONSTRAINT FK_mcft_musical_characteristics FOREIGN KEY (musical_characteristic_id)
        REFERENCES folk_tune.musical_characteristics (id) ON DELETE CASCADE,
    CONSTRAINT FK_mcft_text_forms FOREIGN KEY (text_form_id) REFERENCES folk_tune.text_forms (id),
    CONSTRAINT CK_mcft_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE INDEX IX_mcft_text_forms ON folk_tune.musical_characteristics_text_forms (text_form_id)
;

CREATE TABLE folk_tune.tune_person_role_types
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_person_role_types PRIMARY KEY (id),
    CONSTRAINT CK_tune_person_role_types_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_tune_person_role_types_title ON folk_tune.tune_person_role_types (UPPER(title))
;

CREATE TABLE folk_tune.tunes_persons_roles
(
    id serial NOT NULL,
    tune_id integer NOT NULL,
    person_id integer,
    name_origin text,
    person_age smallint,
    tune_person_role_type_id smallint NOT NULL,
    action_start_year smallint,
    action_end_year smallint,
    remarks text,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tunes_persons_roles PRIMARY KEY (id),
    CONSTRAINT UQ_tunes_persons_roles UNIQUE (tune_id, person_id, tune_person_role_type_id),
    CONSTRAINT FK_tunes_persons_roles_tunes FOREIGN KEY (tune_id) REFERENCES folk_tune.tunes (id) ON DELETE CASCADE,
    CONSTRAINT FK_tunes_persons_roles_persons FOREIGN KEY (person_id) REFERENCES folk_tune.persons (id),
    CONSTRAINT FK_tunes_persons_roles_tune_person_role_types FOREIGN KEY (tune_person_role_type_id)
        REFERENCES folk_tune.tune_person_role_types (id)
) WITH (fillfactor = 90)
;

CREATE INDEX IX_tunes_persons_roles_persons ON folk_tune.tunes_persons_roles (person_id)
;

CREATE INDEX IX_tunes_persons_roles_tune_person_role_types ON folk_tune.tunes_persons_roles (tune_person_role_type_id)
;

CREATE TABLE folk_tune.transcription_sources
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_transcription_sources PRIMARY KEY (id),
    CONSTRAINT CK_transcription_sources_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_transcription_sources_title ON folk_tune.transcription_sources (UPPER(title))
;

CREATE TABLE folk_tune.tune_transcriptions
(
    id serial NOT NULL,
    tune_id integer NOT NULL,
    transcription_source_id smallint NOT NULL,
    file_reference varchar(150),
        remarks text,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_transcriptions PRIMARY KEY (id),
    CONSTRAINT FK_tune_transcriptions_tunes FOREIGN KEY (tune_id) REFERENCES folk_tune.tunes (id) ON DELETE CASCADE,
    CONSTRAINT FK_tune_transcriptions_transcription_sources FOREIGN KEY (transcription_source_id)
        REFERENCES folk_tune.transcription_sources (id),
    CONSTRAINT CK_tune_transcriptions_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE INDEX IX_tune_transcriptions_transcription_sources ON folk_tune.tune_transcriptions (transcription_source_id)
;

CREATE TABLE folk_tune.transcription_person_role_types
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_transcription_person_role_types PRIMARY KEY (id),
    CONSTRAINT CK_tprt_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_transcription_person_role_types_title ON folk_tune.transcription_person_role_types (UPPER(title))
;

CREATE TABLE folk_tune.transcriptions_persons_roles
(
    id serial NOT NULL,
    tune_transcription_id integer NOT NULL,
    person_id integer,
    name_origin text,
    person_age smallint,
    transcription_person_role_type_id smallint NOT NULL,
    action_year smallint,
        action_start_year smallint,
    action_end_year smallint,
    remarks text,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_transcriptions_persons_roles PRIMARY KEY (id),
    CONSTRAINT UQ_transcriptions_persons_roles UNIQUE (tune_transcription_id, person_id, transcription_person_role_type_id),
    -- CONSTRAINT FK_transcriptions_persons_roles_tune_transcriptions FOREIGN KEY (tune_transcription_id)
        -- REFERENCES folk_tune.tune_transcriptions (id) ON DELETE CASCADE,
    CONSTRAINT FK_transcriptions_persons_roles_persons FOREIGN KEY (person_id) REFERENCES folk_tune.persons (id),
    CONSTRAINT FK_transcriptions_persons_roles_transcription_person_role_types FOREIGN KEY (transcription_person_role_type_id)
        REFERENCES folk_tune.transcription_person_role_types (id),
    CONSTRAINT CK_tpr_modified_no_earlier_than_created CHECK (modified >= created)
) WITH (fillfactor = 90)
;

CREATE INDEX IX_transcriptions_persons_roles_persons ON folk_tune.transcriptions_persons_roles (person_id)
;

CREATE INDEX IX_transcriptions_persons_roles_transcription_person_role_types ON folk_tune.transcriptions_persons_roles 
    (transcription_person_role_type_id)
;

CREATE TABLE folk_tune.key_signatures
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_key_signatures PRIMARY KEY (id),
    CONSTRAINT CK_key_signatures_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_key_signatures_title ON folk_tune.key_signatures (UPPER(title))
;

CREATE TABLE folk_tune.pitches
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_pitches PRIMARY KEY (id),
    CONSTRAINT CK_pitches_modified_no_earlier_than_created CHECK (modified >= created)
)
;


CREATE TABLE folk_tune.support_sounds
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_support_sounds PRIMARY KEY (id),
    CONSTRAINT CK_support_sounds_modified_no_earlier_than_created CHECK (modified >= created)
)
;


CREATE TABLE folk_tune.measures
(
    id smallserial NOT NULL,
    title text,
    description text,
    is_active boolean NOT NULL DEFAULT TRUE,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_measures PRIMARY KEY (id),
    CONSTRAINT CK_measures_modified_no_earlier_than_created CHECK (modified >= created)
)
;

CREATE UNIQUE INDEX IX_measures_title ON folk_tune.measures (UPPER(title))
;

CREATE TABLE folk_tune.tune_encodings
(
    id serial NOT NULL,
    tune_id integer NOT NULL,
    key_signature_id smallint,
    support_sound_id smallint,
    pitch_id smallint,
    measure_id smallint,
    rhythm_type text,
    tempo text,
    remarks text,
    created folk_tune.D_timestamp,
    modified folk_tune.D_timestamp,
    CONSTRAINT PK_tune_encodings PRIMARY KEY (id),
    -- CONSTRAINT FK_tune_encodings_tunes FOREIGN KEY (tune_id) REFERENCES folk_tune.tunes (id) ON DELETE CASCADE,
    CONSTRAINT FK_tune_encodings_key_signatures FOREIGN KEY (key_signature_id) REFERENCES folk_tune.key_signatures (id),
    CONSTRAINT FK_tune_encodings_support_sounds FOREIGN KEY (support_sound_id) REFERENCES folk_tune.support_sounds (id),
    CONSTRAINT FK_tune_encodings_pitches FOREIGN KEY (pitch_id) REFERENCES folk_tune.pitches (id),
    CONSTRAINT FK_tune_encodings_measures FOREIGN KEY (measure_id) REFERENCES folk_tune.measures (id),
    CONSTRAINT CK_tune_encodings_modified_no_earlier_than_created CHECK (modified >= created)
) WITH (fillfactor = 90)
;

CREATE INDEX IX_tune_encodings_key_signatures ON folk_tune.tune_encodings (key_signature_id)
;

CREATE INDEX IX_tune_encodings_support_sounds ON folk_tune.tune_encodings (support_sound_id)
;

CREATE INDEX IX_tune_encodings_pitches ON folk_tune.tune_encodings (pitch_id)
;

CREATE INDEX IX_tune_encodings_measures ON folk_tune.tune_encodings (measure_id)
;

CREATE OR REPLACE FUNCTION folk_tune.F_change_tune_state() RETURNS TRIGGER AS $$
    DECLARE
        V_verified_by uuid;
    BEGIN
        V_verified_by := NEW.verified_by;
        IF (V_verified_by) IS NOT NULL THEN
            UPDATE folk_tune.tunes SET tune_state_id = 2 WHERE id = NEW.id;
        ELSE
            UPDATE folk_tune.tunes SET tune_state_id = 1 WHERE id = NEW.id;
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = folk_tune, public, pg_temp
;

COMMENT ON FUNCTION folk_tune.F_change_tune_state() 
    IS 'Changes the state of a tune to "verified" or "entered" after changing verified_by field.'
;

CREATE TRIGGER TR_tunes_change_tune_state
    AFTER INSERT OR UPDATE OF verified_by ON folk_tune.tunes
    FOR EACH ROW 
    EXECUTE PROCEDURE folk_tune.F_change_tune_state()
;
