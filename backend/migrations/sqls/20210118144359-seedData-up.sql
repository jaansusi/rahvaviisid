INSERT INTO folk_tune.sexes (title) 
VALUES 
    ('mees'),
    ('naine'),
    ('teadmata'),
    ('ei ole võimalik määratleda')
;

INSERT INTO folk_tune.user_role_types (title) 
VALUES 
    ('administraator'),
    ('toimetaja'),
    ('tavakasutaja')
;

INSERT INTO folk_tune.tune_states (title) 
VALUES 
    ('sisestatud'),
    ('kontrollitud')
;

INSERT INTO folk_tune.nations (title)
VALUES 
    ('eesti'),
    ('vene')
;

INSERT INTO folk_tune.languages (title) 
VALUES 
    ('eesti'),
    ('vene')
;

INSERT INTO folk_tune.countries (title) 
VALUES 
    ('Eesti'),
    ('Läti'),
    ('Põhja-Kaukaasia'),
    ('Venemaa')
;

INSERT INTO folk_tune.tune_person_role_types (title)
VALUES
    ('viisikoguja'),
    ('salvestaja'),
    ('tekstikoguja'),
    ('esitaja')
;

INSERT INTO folk_tune.tune_place_types (title) 
VALUES 
    ('esitaja elukoht'),
    ('esitaja päritolukoht')
;


INSERT INTO folk_tune.parishes (title) 
VALUES
    ('Tartu'), 
    ('Kolga-Jaani'), 
    ('Kuusalu'), 
    ('Koeru'), 
    ('Simuna'),
    ('Iisaku'),
    ('Mustjala'),
    ('Tallinn'),
    ('Laiuse')
;

INSERT INTO folk_tune.municipalities (title) 
VALUES
    ('Kolga'), 
    ('Are'), 
    ('Velise'), 
    ('Võisiku'),
    ('Tudulinna'),
    ('Laius-Tähkvere')
;

INSERT INTO folk_tune.villages (title)
VALUES
    ('Juminda'), 
    ('Leesi'), 
    ('Eavere'), 
    ('Selli'),
    ('Tudulinna'),
    ('Võhma'),
    ('Leedi')
;

INSERT INTO folk_tune.actual_performance_types (title, description)
VALUES 
    ('Ü', 'Üksi'),
    ('E+K', 'Eeslaulja ja koor'),
    ('E+Ü', 'Ees- ja järellaulja'),
    ('R', 'Rühmalaul'),
    ('Ka', 'Kahekesi, ilma ees- ja järellaulmiseta'),
    ('ei ole võimalik määratleda', NULL),
    ('määramata', NULL),
    ('teadmata', NULL)
;

INSERT INTO folk_tune.traditional_performance_types (title, description)
VALUES 
    ('Ü', 'Üksi'),
    ('E+K', 'Eeslaulja ja koor'),
    ('E+Ü', 'Ees- ja järellaulja'),
    ('R', 'Rühmalaul'),
    ('Ka', 'Kahekesi, ilma ees- ja järellaulmiseta'),
    ('ei ole võimalik määratleda', NULL),
    ('määramata', NULL),
    ('teadmata', NULL)
;

INSERT INTO folk_tune.actual_action_types (title)
VALUES 
    ('istudes'),
    ('seistes'),
    ('kulg'),
    ('kiikudes'),
    ('õõtsudes'),
    ('hüpitades (last)'),
    ('jalarõhk'),
    ('käerõhk'),
    ('vibutades (nt sirpi)'),
    ('tammudes'),
    ('hällitades'),
    ('kaar'),
    ('ring (lahtine)'),
    ('sõõr (kinnine)'),
    ('pöör (setu)'),
    ('rida'),
    ('viirg (kõrvuti)'),
    ('kolonn (üksteise taga)'),
    ('rinnati'),
    ('ei ole võimalik määratleda'),
    ('määramata'),
    ('teadmata')
;

INSERT INTO folk_tune.traditional_action_types (title)
VALUES 
    ('istudes'),
    ('seistes'),
    ('kulg'),
    ('kiikudes'),
    ('õõtsudes'),
    ('hüpitades (last)'),
    ('jalarõhk'),
    ('käerõhk'),
    ('vibutades (nt sirpi)'),
    ('tammudes'),
    ('hällitades'),
    ('kaar'),
    ('ring (lahtine)'),
    ('sõõr (kinnine)'),
    ('pöör (setu)'),
    ('rida'),
    ('viirg (kõrvuti)'),
    ('kolonn (üksteise taga)'),
    ('rinnati'),
    ('ei ole võimalik määratleda'),
    ('määramata'),
    ('teadmata')
;
  
INSERT INTO folk_tune.song_genres (parent_id, title, lft, rght)
VALUES 
    (NULL, 'itk', 1, 10),
    (1, 'pulma', 2, 3),
    (1, 'surnu', 4, 5),
    (1, 'nekruti', 6, 7),
    (1, 'juhu', 8, 9),
    (NULL, 'loits', 11, 18),
    (6, 'töö', 12, 13),
    (6, 'ravi', 14, 15),
    (6, 'muu_loits', 16, 17),
    (NULL, 'töö', 19, 40),
    (10, 'lõikus', 20, 21),
    (10, 'heina', 22, 23),
    (10, 'karja', 24, 25),
    (10, 'talgu', 26, 27),
    (10, 'või', 28, 29),
    (10, 'lüps', 30, 31),
    (10, 'ketrus', 32, 33),
    (10, 'marja', 34, 35),
    (10, 'kaluri', 36, 37),
    (10, 'muu_töö', 38, 39),
    (NULL, 'kal', 41, 60),
    (21, 'vastla', 42, 43),
    (21, 'kiige', 44, 45),
    (21, 'mardi', 46, 47),
    (21, 'kadri', 48, 49),
    (21, 'urbe', 50, 51),
    (21, 'jaani', 52, 53),
    (21, 'jüri', 54, 55),
    (21, 'jõulu', 56, 57),
    (21, 'muu_kal', 58, 59),
    (NULL, 'pidu', 60, 71),
    (31, 'pulma', 61, 62),
    (31, 'mängu', 63, 64),
    (31, 'varru', 65, 66),
    (31, 'praasnik', 67, 68),
    (31, 'tantsu', 69, 70),
    (NULL, 'laste', 72, 79),
    (37, 'hälli', 73, 74),
    (37, 'mängitus', 75, 76),
    (37, 'laste', 77, 78),
    (NULL, 'pidu/laste', 80, 83),
    (41, 'mängu', 81, 82),
    (NULL, 'jutulaul', 84, 89),
    (43, 'muinasjutt', 85, 86),
    (43, 'jutt_muu', 87, 88),
    (NULL, 'vaimulik', 90, 91),
    (NULL, 'lüürika', 92, 97),
    (47, 'naiste', 93, 94),
    (47, 'meeste', 95, 96),
    (NULL, 'jutustav', 98, 103),
    (50, 'naiste', 99, 100),
    (50, 'meeste', 101, 102),
    (NULL, 'hääl', 104, 115),
    (53, 'linnu', 105, 106),
    (53, 'loodus', 107, 108),
    (53, 'pilli', 109, 110),
    (53, 'talu', 111, 112),
    (53, 'hääl_muu', 113, 114),
    (NULL, 'hüüded', 116, 121),
    (59, 'karja', 117, 118),
    (59, 'hüüded_muu', 119, 120),
    (NULL, 'ei ole võimalik määratleda', 122, 123),
    (NULL, 'määramata', 124, 125),
    (NULL, 'teadmata', 126, 127)
;

INSERT INTO folk_tune.tune_genres (parent_id, title, lft, rght) 
VALUES 
    (NULL, 'itk', 1, 10),
    (1, 'pulma', 2, 3),
    (1, 'surnu', 4, 5),
    (1, 'nekruti', 6, 7),
    (1, 'juhu', 8, 9),
    (NULL, 'loits', 11, 18),
    (6, 'töö', 12, 13),
    (6, 'ravi', 14, 15),
    (6, 'muu_loits', 16, 17),
    (NULL, 'töö', 19, 40),
    (10, 'lõikus', 20, 21),
    (10, 'heina', 22, 23),
    (10, 'karja', 24, 25),
    (10, 'talgu', 26, 27),
    (10, 'või', 28, 29),
    (10, 'lüps', 30, 31),
    (10, 'ketrus', 32, 33),
    (10, 'marja', 34, 35),
    (10, 'kaluri', 36, 37),
    (10, 'muu_töö', 38, 39),
    (NULL, 'kal', 41, 60),
    (21, 'vastla', 42, 43),
    (21, 'kiige', 44, 45),
    (21, 'mardi', 46, 47),
    (21, 'kadri', 48, 49),
    (21, 'urbe', 50, 51),
    (21, 'jaani', 52, 53),
    (21, 'jüri', 54, 55),
    (21, 'jõulu', 56, 57),
    (21, 'muu_kal', 58, 59),
    (NULL, 'pidu', 60, 71),
    (31, 'pulma', 61, 62),
    (31, 'mängu', 63, 64),
    (31, 'varru', 65, 66),
    (31, 'praasnik', 67, 68),
    (31, 'tantsu', 69, 70),
    (NULL, 'laste', 72, 79),
    (37, 'hälli', 73, 74),
    (37, 'mängitus', 75, 76),
    (37, 'laste', 77, 78),
    (NULL, 'pidu/laste', 80, 83),
    (41, 'mängu', 81, 82),
    (NULL, 'jutulaul', 84, 89),
    (43, 'muinasjutt', 85, 86),
    (43, 'jutt_muu', 87, 88),
    (NULL, 'vaimulik', 90, 91),
    (NULL, 'lüürika', 92, 97),
    (47, 'naiste', 93, 94),
    (47, 'meeste', 95, 96),
    (NULL, 'jutustav', 98, 103),
    (50, 'naiste', 99, 100),
    (50, 'meeste', 101, 102),
    (NULL, 'hääl', 104, 115),
    (53, 'linnu', 105, 106),
    (53, 'loodus', 107, 108),
    (53, 'pilli', 109, 110),
    (53, 'talu', 111, 112),
    (53, 'hääl_muu', 113, 114),
    (NULL, 'hüüded', 116, 121),
    (59, 'karja', 117, 118),
    (59, 'hüüded_muu', 119, 120),
    (NULL, 'ei ole võimalik määratleda', 122, 123),
    (NULL, 'määramata', 124, 125),
    (NULL, 'teadmata', 126, 127)
;

INSERT INTO folk_tune.song_topics (parent_id, title, description, lft, rght) 
VALUES 
    (NULL, 'töö', 'tööd, tegevused', 1, 94),
    (1, 'kari', 'karjatamine, kari, karjane', 2, 3),
    (1, 'õits', 'õitsilkäimine', 4, 5),
    (1, 'hein', 'heinatööd', 6, 7),
    (1, 'kütis', 'kütis', 8, 9),
    (1, 'künd', 'künd', 10, 11),
    (1, 'külv', 'külv', 12, 13),
    (1, 'sõnnik', 'sõnnikulaotamine', 14, 15),
    (1, 'lõikus', 'lõikus', 16, 17),
    (1, 'lina', 'linatööd', 18, 19),
    (1, 'rehepeks', 'rehepeks', 20, 21),
    (1, 'talgud', 'talgud', 22, 23),
    (1, 'lüps', 'lüpsmine', 24, 25),
    (1, 'või', 'võitegu', 26, 27),
    (1, 'jahvatus', 'jahvatamine (käsikivi, veski)', 28, 29),
    (1, 'söögitegu', 'keetmine, küpsetamine', 30, 31),
    (1, 'joogitegu', 'taari ja õlle valmistamine', 32, 33),
    (1, 'lambaniitmine', 'lambaniitmine', 34, 35),
    (1, 'kraasimine, ketrus', 'kraasimine, ketrus', 36, 37),
    (1, 'kangakudumine', 'kangakudumine', 38, 39),
    (1, 'vanutamine, uhtumine', 'vanutamine, uhtumine', 40, 41),
    (1, 'õmblemine', 'õmblemine', 42, 43),
    (1, 'pesupesemine', 'pesupesemine', 44, 45),
    (1, 'koristamine', 'koristamine, pühkimine', 46, 47),
    (1, 'riietus, ehted', 'riietumine, ehtimine, rõivad, ehted', 48, 49),
    (1, 'juuksed', 'juustelõikamine, peasugemine, juuksed, peahari', 50, 51),
    (1, 'saun', 'saun, leil, saunaskäimine, vihtlemine', 52, 53),
    (1, 'ravimine, haigused', 'arstimine, arst, tervis, haigus, trauma, ussihammustus jne', 54, 55),
    (1, 'nõidumine, ennustamine', 'nõidumine, ennustamine', 56, 57),
    (1, 'mäng', 'mängimine', 58, 59),
    (1, 'tuli', 'tuletegemine, tuli', 60, 61),
    (1, 'külalised', 'külaskäimine, külalised', 62, 63),
    (1, 'söök-jook', 'söömine-joomine, söögid-joogid', 64, 65),
    (1, 'viin, kõrts, joodik', 'viin, kõrts, joodik', 66, 67),
    (1, 'piip, tubakas', 'piip, tubakas', 68, 69),
    (1, 'kiik', 'kiikumine, kiigelkäimine, kiik', 70, 71),
    (1, 'sanditamine', 'sanditamine', 72, 73),
    (1, 'liulaskmine', 'liulaskmine', 74, 75),
    (1, 'laul', 'laulmine, laul, laulik', 76, 77),
    (1, 'pill', 'pillimäng, pillimees, pillid', 78, 79),
    (1, 'tants', 'tantsimine', 80, 81),
    (1, 'teekond', 'teekäimine, teekond', 82, 83),
    (1, 'hobune', 'hobune, sõit hobusega, veod', 84, 85),
    (1, 'laev, paat', 'laeva-, paadisõit', 86, 87),
    (1, 'ost-müük, laen', 'linnas turul, poes käimine; ost-müük, laenamine', 88, 89),
    (1, 'kalur', 'kalapüük, kalur, kalad', 90, 91),
    (1, 'jaht', 'jaht, jahimees, jahiloomad', 92, 93),
    (NULL, 'kal', 'kalendripühad ja tähtpäevad', 95, 112),
    (48, 'jõulud', 'jõulud, näärid', 96, 97),
    (48, 'vastla', 'vastlad', 98, 99),
    (48, 'lihavõtted', 'lihavõtted', 100, 101),
    (48, 'jaani', 'jaanipäev', 102, 103),
    (48, 'mardi', 'mardipäev', 104, 105),
    (48, 'kadri', 'kadripäev', 106, 107),
    (48, 'külapühad', 'külapühad (praasnikud)', 108, 109),
    (48, 'muu_kal', 'muud kalendripühad', 110, 111),
    (NULL, 'pere', 'abielu, perekond', 113, 132),
    (57, 'laps', 'laps (kandmine, sünnitamine, hällitamine, hoidmine, kasvatamine)', 114, 115),
    (57, 'neiu ja kodu', 'kodu, kasvupõli, neiupõli, kodust lahkumine', 116, 117),
    (57, 'vaeslaps', 'vaeslaps', 118, 119),
    (57, 'poisid-tüdrukud', 'poisid ja tüdrukud (poiste kiitus ja pilge, vanapoiss, poissmees, neidude kiitus ja pilge, vanatüdruk)', 120, 121),
    (57, 'suhted', 'kaasavalik, armastus, kosjad', 122, 123),
    (57, 'pulmad', 'pulmad (st laulud, milles juttu pulmadest või mis kirjeldavad üksikuid pulmakombeid jne)', 124, 125),
    (57, 'abielu', 'abielu, mees ja naine, isa- ja mehekodu', 126, 127),
    (57, 'lesk', 'lesk', 128, 129),
    (57, 'muud peresuhted', 'perekonnasuhted üldiselt, õed-vennad, vanemad lapsed', 130, 131),
    (NULL, 'elumured', 'elu hooled ja mured', 133, 148),
    (67, 'virkus-laiskus', 'töökus ja laiskus, väsimus ja puhkus, uni', 134, 135),
    (67, 'tüli', 'laim, tüli ja riid', 136, 137),
    (67, 'õnnetus', 'õnnetused, äpardused', 138, 139),
    (67, 'nälg', 'nälg', 140, 141),
    (67, 'surm', 'surm', 142, 143),
    (67, 'kurbus', 'mure, kurbus, lein', 144, 145),
    (67, 'saatus', 'tundmatu tulevik, elusaatus', 146, 147),
    (NULL, 'ühiskond', 'Sotsiaalsed kihistused, ühiskondlikud suhted, ajaloolised sündmused', 149, 166),
    (75, 'mõis', 'mõisaorjus (ja kõik sellega seotu)', 150, 151),
    (75, 'permees-sulane', 'peremees, sulane, saunik', 152, 153),
    (75, 'rikas-vaene', 'rikas ja vaene', 154, 155),
    (75, 'kerjus', 'kerjus', 156, 157),
    (75, 'linn', 'linn', 158, 159),
    (75, 'nekrut', 'nekrut, soldat, sõda', 160, 161),
    (75, 'kuningas', 'kuningad, keisrid jms', 162, 163),
    (75, 'kirik', 'kirik, kirikuõpetaja, köster', 164, 165),
    (NULL, 'usund', 'usk ja mütoloogia', 167, 174),
    (84, 'müüdid', 'müütilised sündmused (tekkelood jms)', 168, 169),
    (84, 'ristiusk', 'ristiusukujutelmad, piiblitegelased', 170, 171),
    (84, 'uskumused-olendid', 'mitmesugused rahvausundilised kujutelmad ja uskumusolendid', 172, 173),
    (NULL, 'loodus', 'loodus', 175, 188),
    (88, 'taevakehad, loodusjõud', 'taevakehad, loodusjõud', 176, 177),
    (88, 'ilmastik, aastaajad', 'ilmastik, aastaajad', 178, 179),
    (88, 'maastik', 'maastikuobjektid (veekogud, mäed jms)', 180, 181),
    (88, 'taimed', 'taimed (ka kultuurtaimed)', 182, 183),
    (88, 'puud', 'puud, mets', 184, 185),
    (88, 'loomad', 'linnud, loomad, putukad', 186, 187),
    (NULL, 'ei ole võimalik määratleda', NULL, 189, 190),
    (NULL, 'määramata', 191, 192, NULL),
    (NULL, 'teadmata', 193, 194, NULL)
;

INSERT INTO folk_tune.verse_forms (title, description) 
VALUES
    ('runo', 'runolaul (regivärss)'),
    ('siird', 'siirdevormiline'),
    ('riim', 'lõppriimiline'),
    ('rõhuline', 'rõhuline värss (itk, loits, vaimulik värsilugemine vms)'),
    ('asem', 'asemantilistest silpidest või vokaalidest koosnev (huiked, joiud jne)'),
    ('muu_v', 'muud vormid')
;

INSERT INTO folk_tune.tune_forms (title, description)
VALUES
    ('1', 'Üherealine'),
    ('2', 'Kaherealine'),
    ('1[2]', 'Põhiliselt üherealine, laulu sees kohati kaherealine'),
    ('2[1]', 'Põhiliselt kaherealine, laulu sees kohati üherealine'),
    ('1R1/2', 'Üherealine viis poolerealise refrääniga'),
    ('1R1', 'Üherealine viis üherealise refrääniga'),
    ('1[2]1/2', 'Põhiliselt üherealine, kohati kaherealine, poolerealise refrääniga'),
    ('1Rpikk', 'Üherealine viis pikema refrääniga'),
    ('1Rsise', 'Üherealine viis, refräänsõna on viisirea sees ja lõpus'),
    ('Ebaregulaarne vorm', 'Ebaregulaarne vorm'),
    ('2R1/2', 'Kaherealine viis poolerealise refrääniga'),
    ('2R1', 'Kaherealine viis üherealise refrääniga'),
    ('2R1eri', 'Kaherealine viis üherealise refrääniga, kummagi viisirea järel on erinev refrään'),
    ('2R2', 'Kaherealine viis kaherealise refrääniga'),
    ('2Reri', 'Kaherealine viis, kummagi viisirea järel on eri pikkusega refrään'),
    ('2Rsise', 'Kaherealine viis, refräänsõna on viisiridade sees ja lõpus'),
    ('3', 'Kolmerealine viis'),
    ('4', 'Neljarealine viis')
;

INSERT INTO folk_tune.text_forms (title)
VALUES
    ('AA/AB'),
    ('AB'),
    ('AA')
;

INSERT INTO folk_tune.rhythm_types (title)
VALUES
    ('1'),
    ('5'),
    ('2')
;

INSERT INTO folk_tune.sound_ranges (title)
VALUES
    ('7v'),
    ('s6'),
    ('ei ole võimalik määratleda'),
    ('määramata'),
    ('teadmata')
;

INSERT INTO folk_tune.transcription_sources (title)
VALUES
    ('noot'),
    ('heli'),
    ('video')
;

INSERT INTO folk_tune.transcription_person_role_types (title)
VALUES
    ('noodistaja'),
    ('litereerija'),
    ('noodigraafik'),
    ('toimetaja')
;

INSERT INTO folk_tune.key_signatures (title) 
VALUES 
    ('#f')
;

INSERT INTO folk_tune.support_sounds (title) 
VALUES 
    ('c'),
    ('cis'),
    ('d'),
    ('dis'),
    ('e'),
    ('f'),
    ('fis'),
    ('g'),
    ('gis'),
    ('a'),
    ('b'),
    ('h'),
    ('c1'),
    ('cis1'),
    ('d1'),
    ('dis1'),
    ('e1'),
    ('f1'),
    ('fis1'),
    ('g1'),
    ('gis1'),
    ('a1'),
    ('b1'),
    ('h1'),
    ('c2')
;

INSERT INTO folk_tune.pitches (title) 
VALUES
    ('g1=c'),
    ('g1=cis'),
    ('g1=d'),
    ('g1=dis'),
    ('g1=e'),
    ('g1=f'),
    ('g1=fis'),
    ('g1=g'),
    ('g1=gis'),
    ('g1=a'),
    ('g1=b'),
    ('g1=h'),
    ('g1=c1'),
    ('g1=cis1'),
    ('g1=d1'),
    ('g1=dis1'),
    ('g1=e1'),
    ('g1=f1'),
    ('g1=fis1'),
    ('g1=g1'),
    ('g1=gis1'),
    ('g1=a1'),
    ('g1=b1'),
    ('g1=h1'),
    ('g1=c2'),
    ('g1=cis2')
;

INSERT INTO folk_tune.measures (title) 
VALUES
    ('3/8'),
    ('4/8'),
    ('6/8'),
    ('8/8'),
    ('12/8'),
    ('2/4'),
    ('3/4'),
    ('4/4'),
    ('5/4')
;

INSERT INTO folk_tune.persons (id, pid, given_name, surname, nickname, birth_year, death_year, sex_id, remarks) 
VALUES 
    (1, NULL, 'Taive', 'Särg', NULL, NULL, NULL, 2, NULL),
    (2, NULL, 'Helen', 'Kõmmus', NULL, NULL, NULL, 2, NULL)
 ;


INSERT INTO folk_tune.users (id, person_id, user_role_type_id, username, password, is_active)
VALUES
    (1, 1, 1, 'taivelohmuse@netscape.net', '$2y$10$4EuLXgOaL5O08OFPjb2.cedd3hOjMJcyOiXM7vm.KiZKKg..76rBi', TRUE),
    (2, 2, 3, 'helen', '$2y$10$BpEAqZucmoQRfqXLBEHSZOrZHaaz23jvgybJT4AZ.oz8ngSK4a1nC', FALSE)
;
