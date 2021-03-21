import csv
import sys

if (len(sys.argv) != 2):
    exit(0)

with open(sys.argv[1]) as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=';')
    row_count = 0
    declares = []
    data = []
    for row in csv_reader:
        row_count += 1
        if (row_count == 1):
            continue
        declares.append("DECLARE tune_id_var_{0} integer;".format(row_count))
        tune_sql = "UPDATE folk_tune.tunes SET support_sound='{0}', height='{1}', bar='{2}', clef='{3}' WHERE old_tune_id='{4}';"\
            .format(row['support_sound'], row['height'], row['bar'], row['clef'], row['reference'])
        old_tune_id_sql = "SELECT id INTO tune_id_var_{0} FROM folk_tune.tunes WHERE old_tune_id='{1}' LIMIT 1;".format(row_count, row['reference'])
        melody_sql = "IF NOT {5} IS NULL THEN INSERT INTO folk_tune.tune_melodies \
            (melody, alter, tempo, note_length, reference, tune_id, variation_index, rhythm_type) VALUES \
            ('{0}','{1}','{2}','{3}','{4}',{5},{6},'{7}'); END IF;"\
            .format(row['melody'], row['alter'], row['tempo'], row['note_length'], row['reference'], 'tune_id_var_{0}'.format(row_count), row['variation_index'], row['rhythm_type'])
        data.append("\n".join([tune_sql,old_tune_id_sql,melody_sql]))
        #break
    
    final_sql = "DO $$\n" + "\n".join(declares) + "\nBEGIN\n" + "\n".join(data) + "\nEND $$"
    with open("output.sql", "w+") as f:
        f.write(final_sql)