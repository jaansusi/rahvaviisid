-- Postgres FTS support for search-first redesign.
--
-- Adds tsvector columns + GIN indexes on folk_tune.tunes and folk_tune.persons,
-- plus triggers to keep them in sync with their own columns and (for tunes) with
-- directly-owned child rows. Classifier-title and person-name edits do not
-- propagate to tunes.tsv automatically; rebuild via SELECT folk_tune.f_rebuild_all_tune_tsv()
-- after such bulk updates.

ALTER TABLE folk_tune.tunes ADD COLUMN tsv tsvector;
ALTER TABLE folk_tune.persons ADD COLUMN tsv tsvector;

CREATE INDEX IX_tunes_tsv ON folk_tune.tunes USING GIN (tsv);
CREATE INDEX IX_persons_tsv ON folk_tune.persons USING GIN (tsv);

-- ---------------------------------------------------------------------------
-- Persons
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION folk_tune.f_set_person_tsv() RETURNS trigger AS $$
BEGIN
  NEW.tsv := to_tsvector('simple',
    coalesce(NEW.pid, '') || ' ' ||
    coalesce(NEW.given_name, '') || ' ' ||
    coalesce(NEW.surname, '') || ' ' ||
    coalesce(NEW.nickname, '') || ' ' ||
    coalesce(NEW.remarks, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_persons_set_tsv
  BEFORE INSERT OR UPDATE OF pid, given_name, surname, nickname, remarks
  ON folk_tune.persons
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_set_person_tsv();

UPDATE folk_tune.persons SET tsv = to_tsvector('simple',
  coalesce(pid, '') || ' ' ||
  coalesce(given_name, '') || ' ' ||
  coalesce(surname, '') || ' ' ||
  coalesce(nickname, '') || ' ' ||
  coalesce(remarks, '')
);

-- ---------------------------------------------------------------------------
-- Tunes
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION folk_tune.f_build_tune_tsv(p_tune_id integer)
RETURNS tsvector AS $$
  SELECT to_tsvector('simple', coalesce(string_agg(part, ' '), '')) FROM (
    SELECT concat_ws(' ',
      t.tune_reference, t.text_reference, t.sound_reference, t.video_reference,
      t.catalogue, t.publications, t.remarks,
      ts.title, n.title, l.title, c.title
    ) AS part
    FROM folk_tune.tunes t
    LEFT JOIN folk_tune.tune_states ts ON ts.id = t.tune_state_id
    LEFT JOIN folk_tune.nations n ON n.id = t.nation_id
    LEFT JOIN folk_tune.languages l ON l.id = t.language_id
    LEFT JOIN folk_tune.countries c ON c.id = t.country_id
    WHERE t.id = p_tune_id

    UNION ALL
    SELECT concat_ws(' ', er.value, er.description)
    FROM folk_tune.external_references er
    WHERE er.tune_id = p_tune_id

    UNION ALL
    SELECT concat_ws(' ',
      tso.song_type, tso.song_title, tso.first_verse, tso.refrain, tso.remarks,
      string_agg(DISTINCT sg.title, ' '),
      string_agg(DISTINCT tg.title, ' '),
      string_agg(DISTINCT st.title, ' '),
      string_agg(DISTINCT vf.title, ' ')
    )
    FROM folk_tune.tune_songs tso
    LEFT JOIN folk_tune.tune_songs_song_genres tssg ON tssg.tune_song_id = tso.id
    LEFT JOIN folk_tune.song_genres sg ON sg.id = tssg.song_genre_id
    LEFT JOIN folk_tune.tune_songs_tune_genres tstg ON tstg.tune_song_id = tso.id
    LEFT JOIN folk_tune.tune_genres tg ON tg.id = tstg.tune_genre_id
    LEFT JOIN folk_tune.tune_songs_song_topics tsst ON tsst.tune_song_id = tso.id
    LEFT JOIN folk_tune.song_topics st ON st.id = tsst.song_topic_id
    LEFT JOIN folk_tune.tune_songs_verse_forms tsvf ON tsvf.tune_song_id = tso.id
    LEFT JOIN folk_tune.verse_forms vf ON vf.id = tsvf.verse_form_id
    WHERE tso.tune_id = p_tune_id
    GROUP BY tso.id

    UNION ALL
    SELECT concat_ws(' ',
      mc.melostrophe_num_score, mc.melostrophe_num_audio, mc.remarks,
      MAX(sr.title),
      string_agg(DISTINCT rt.title, ' '),
      string_agg(DISTINCT tf.title, ' '),
      string_agg(DISTINCT txf.title, ' ')
    )
    FROM folk_tune.musical_characteristics mc
    LEFT JOIN folk_tune.sound_ranges sr ON sr.id = mc.sound_range_id
    LEFT JOIN folk_tune.musical_characteristics_rhythm_types mcrt ON mcrt.musical_characteristic_id = mc.id
    LEFT JOIN folk_tune.rhythm_types rt ON rt.id = mcrt.rhythm_type_id
    LEFT JOIN folk_tune.musical_characteristics_tune_forms mctf ON mctf.musical_characteristic_id = mc.id
    LEFT JOIN folk_tune.tune_forms tf ON tf.id = mctf.tune_form_id
    LEFT JOIN folk_tune.musical_characteristics_text_forms mcft ON mcft.musical_characteristic_id = mc.id
    LEFT JOIN folk_tune.text_forms txf ON txf.id = mcft.text_form_id
    WHERE mc.tune_id = p_tune_id
    GROUP BY mc.id

    UNION ALL
    SELECT concat_ws(' ',
      tp.other_place, tp.remarks,
      tpt.title, par.title, mun.title, vil.title,
      p.given_name, p.surname, p.nickname
    )
    FROM folk_tune.tune_places tp
    LEFT JOIN folk_tune.tune_place_types tpt ON tpt.id = tp.tune_place_type_id
    LEFT JOIN folk_tune.parishes par ON par.id = tp.parish_id
    LEFT JOIN folk_tune.municipalities mun ON mun.id = tp.municipality_id
    LEFT JOIN folk_tune.villages vil ON vil.id = tp.village_id
    LEFT JOIN folk_tune.persons p ON p.id = tp.person_id
    WHERE tp.tune_id = p_tune_id

    UNION ALL
    SELECT concat_ws(' ',
      tpf.accompaniment, tpf.remarks,
      MAX(apt.title), MAX(tpft.title), MAX(aat.title),
      string_agg(DISTINCT tat.title, ' ')
    )
    FROM folk_tune.tune_performances tpf
    LEFT JOIN folk_tune.actual_performance_types apt ON apt.id = tpf.actual_performance_type_id
    LEFT JOIN folk_tune.traditional_performance_types tpft ON tpft.id = tpf.traditional_performance_type_id
    LEFT JOIN folk_tune.actual_action_types aat ON aat.id = tpf.actual_action_type_id
    LEFT JOIN folk_tune.tune_performances_traditional_actions tpta ON tpta.tune_performance_id = tpf.id
    LEFT JOIN folk_tune.traditional_action_types tat ON tat.id = tpta.traditional_action_type_id
    WHERE tpf.tune_id = p_tune_id
    GROUP BY tpf.id

    UNION ALL
    SELECT concat_ws(' ',
      tpr.name_origin, tpr.remarks,
      tprt.title,
      p.pid, p.given_name, p.surname, p.nickname
    )
    FROM folk_tune.tunes_persons_roles tpr
    LEFT JOIN folk_tune.tune_person_role_types tprt ON tprt.id = tpr.tune_person_role_type_id
    LEFT JOIN folk_tune.persons p ON p.id = tpr.person_id
    WHERE tpr.tune_id = p_tune_id

    UNION ALL
    SELECT concat_ws(' ',
      tt.file_reference, tt.remarks,
      MAX(tsr.title),
      string_agg(DISTINCT tprtt.title, ' '),
      string_agg(DISTINCT trim(concat_ws(' ', tp.given_name, tp.surname, tp.nickname)), ' ')
    )
    FROM folk_tune.tune_transcriptions tt
    LEFT JOIN folk_tune.transcription_sources tsr ON tsr.id = tt.transcription_source_id
    LEFT JOIN folk_tune.transcriptions_persons_roles tpr ON tpr.tune_transcription_id = tt.id
    LEFT JOIN folk_tune.transcription_person_role_types tprtt ON tprtt.id = tpr.transcription_person_role_type_id
    LEFT JOIN folk_tune.persons tp ON tp.id = tpr.person_id
    WHERE tt.tune_id = p_tune_id
    GROUP BY tt.id

    UNION ALL
    SELECT concat_ws(' ',
      te.tempo, te.remarks,
      ks.title, ss.title, pi.title, me.title, ert.title
    )
    FROM folk_tune.tune_encodings te
    LEFT JOIN folk_tune.key_signatures ks ON ks.id = te.key_signature_id
    LEFT JOIN folk_tune.support_sounds ss ON ss.id = te.support_sound_id
    LEFT JOIN folk_tune.pitches pi ON pi.id = te.pitch_id
    LEFT JOIN folk_tune.measures me ON me.id = te.measure_id
    LEFT JOIN folk_tune.rhythm_types ert ON ert.id = te.rhythm_type_id
    WHERE te.tune_id = p_tune_id
  ) parts
  WHERE part IS NOT NULL AND part <> '';
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION folk_tune.f_refresh_tune_tsv(p_tune_id integer)
RETURNS void AS $$
BEGIN
  IF p_tune_id IS NULL THEN
    RETURN;
  END IF;
  UPDATE folk_tune.tunes
    SET tsv = folk_tune.f_build_tune_tsv(p_tune_id)
    WHERE id = p_tune_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger: tunes table itself.
CREATE OR REPLACE FUNCTION folk_tune.f_trg_refresh_own_tune_tsv() RETURNS trigger AS $$
BEGIN
  PERFORM folk_tune.f_refresh_tune_tsv(NEW.id);
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_tunes_refresh_tsv
  AFTER INSERT OR UPDATE OF tune_reference, text_reference, sound_reference,
    video_reference, catalogue, publications, remarks,
    tune_state_id, nation_id, language_id, country_id
  ON folk_tune.tunes
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_own_tune_tsv();

-- Generic trigger: child table with a tune_id column.
CREATE OR REPLACE FUNCTION folk_tune.f_trg_refresh_tsv_by_tune_id() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM folk_tune.f_refresh_tune_tsv(OLD.tune_id);
    RETURN OLD;
  END IF;
  PERFORM folk_tune.f_refresh_tune_tsv(NEW.tune_id);
  IF TG_OP = 'UPDATE' AND OLD.tune_id IS DISTINCT FROM NEW.tune_id THEN
    PERFORM folk_tune.f_refresh_tune_tsv(OLD.tune_id);
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_external_references_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.external_references
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_id();

CREATE TRIGGER tr_tune_songs_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.tune_songs
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_id();

CREATE TRIGGER tr_musical_characteristics_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.musical_characteristics
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_id();

CREATE TRIGGER tr_tune_places_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.tune_places
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_id();

CREATE TRIGGER tr_tune_performances_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.tune_performances
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_id();

CREATE TRIGGER tr_tunes_persons_roles_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.tunes_persons_roles
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_id();

CREATE TRIGGER tr_tune_transcriptions_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.tune_transcriptions
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_id();

CREATE TRIGGER tr_tune_encodings_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.tune_encodings
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_id();

-- Trigger: M2M children of tune_songs.
CREATE OR REPLACE FUNCTION folk_tune.f_trg_refresh_tsv_by_tune_song_id() RETURNS trigger AS $$
DECLARE
  v_tune_id integer;
  v_song_id integer;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_song_id := OLD.tune_song_id;
  ELSE
    v_song_id := NEW.tune_song_id;
  END IF;
  SELECT tune_id INTO v_tune_id FROM folk_tune.tune_songs WHERE id = v_song_id;
  PERFORM folk_tune.f_refresh_tune_tsv(v_tune_id);
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_tssg_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.tune_songs_song_genres
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_song_id();

CREATE TRIGGER tr_tstg_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.tune_songs_tune_genres
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_song_id();

CREATE TRIGGER tr_tsst_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.tune_songs_song_topics
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_song_id();

CREATE TRIGGER tr_tsvf_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.tune_songs_verse_forms
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_song_id();

-- Trigger: M2M children of musical_characteristics.
CREATE OR REPLACE FUNCTION folk_tune.f_trg_refresh_tsv_by_mc_id() RETURNS trigger AS $$
DECLARE
  v_tune_id integer;
  v_mc_id integer;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_mc_id := OLD.musical_characteristic_id;
  ELSE
    v_mc_id := NEW.musical_characteristic_id;
  END IF;
  SELECT tune_id INTO v_tune_id FROM folk_tune.musical_characteristics WHERE id = v_mc_id;
  PERFORM folk_tune.f_refresh_tune_tsv(v_tune_id);
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_mcrt_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.musical_characteristics_rhythm_types
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_mc_id();

CREATE TRIGGER tr_mctf_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.musical_characteristics_tune_forms
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_mc_id();

CREATE TRIGGER tr_mcft_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.musical_characteristics_text_forms
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_mc_id();

-- Trigger: M2M children of tune_performances.
CREATE OR REPLACE FUNCTION folk_tune.f_trg_refresh_tsv_by_tune_performance_id() RETURNS trigger AS $$
DECLARE
  v_tune_id integer;
  v_perf_id integer;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_perf_id := OLD.tune_performance_id;
  ELSE
    v_perf_id := NEW.tune_performance_id;
  END IF;
  SELECT tune_id INTO v_tune_id FROM folk_tune.tune_performances WHERE id = v_perf_id;
  PERFORM folk_tune.f_refresh_tune_tsv(v_tune_id);
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_tpta_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.tune_performances_traditional_actions
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_performance_id();

-- Trigger: children of tune_transcriptions.
CREATE OR REPLACE FUNCTION folk_tune.f_trg_refresh_tsv_by_tune_transcription_id() RETURNS trigger AS $$
DECLARE
  v_tune_id integer;
  v_tt_id integer;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_tt_id := OLD.tune_transcription_id;
  ELSE
    v_tt_id := NEW.tune_transcription_id;
  END IF;
  SELECT tune_id INTO v_tune_id FROM folk_tune.tune_transcriptions WHERE id = v_tt_id;
  PERFORM folk_tune.f_refresh_tune_tsv(v_tune_id);
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_tpr_refresh_tsv
  AFTER INSERT OR UPDATE OR DELETE ON folk_tune.transcriptions_persons_roles
  FOR EACH ROW EXECUTE PROCEDURE folk_tune.f_trg_refresh_tsv_by_tune_transcription_id();

-- Bulk rebuild helper. Run after classifier-title or person-name bulk edits to
-- re-sync tunes.tsv (those edits don't propagate automatically).
CREATE OR REPLACE FUNCTION folk_tune.f_rebuild_all_tune_tsv() RETURNS void AS $$
BEGIN
  UPDATE folk_tune.tunes SET tsv = folk_tune.f_build_tune_tsv(id);
END;
$$ LANGUAGE plpgsql;

-- Initial backfill.
SELECT folk_tune.f_rebuild_all_tune_tsv();
