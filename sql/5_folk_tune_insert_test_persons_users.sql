INSERT INTO folk_tune.persons (pid, given_name, surname, nickname, birth_year, death_year, sex_id, remarks) 
VALUES 
    (NULL, 'Taive', 'Särg', NULL, NULL, NULL, 2, NULL),
    (NULL, 'Olga', 'Ivaškevitš', NULL, NULL, NULL, 2, NULL),
    (NULL, 'Helen', 'Kõmmus', NULL, NULL, NULL, 2, NULL),
    (NULL, 'Kristi', 'Seemen', NULL, 1976, NULL, 2, NULL),
    (NULL, 'Martin', 'Paroll', 'Zut', 1980, NULL, 1, NULL),
    (NULL, 'Katrin', 'Avloi', NULL, NULL, NULL, 2, NULL),
    (NULL, 'Arved', 'Saat', NULL, NULL, NULL, 1, NULL),
    (NULL, 'Ants', 'Unt', NULL, NULL, NULL, 1, NULL),
    (NULL, 'Miina', 'Kempman', NULL, 1845, NULL, 2, NULL),
    (NULL, 'Mari', 'Lagen', NULL, 1845, NULL, 2, NULL),
    (NULL, 'V.', 'Koch', NULL, NULL, NULL, 3, NULL),
    (NULL, 'Armas Otto', 'Väisanen', NULL, 1890, NULL, 1, NULL),
    (NULL, 'Mai', 'Joonaks', NULL, NULL, NULL, 2, NULL),
    ('KM-14017-08118-28171', 'Karl', 'Leichter', NULL, 1902, 1987, 1, NULL),
    ('KM-13105-62389-15920', 'Paul', 'Ariste', NULL, 1905, 1990, 1, '<Paul Berg>'),
    ('KM-13149-55168-43301', 'Edna', 'Tuvi', NULL, 1955, NULL, 2, '<Edna Lips'),
    (NULL, 'Külli', 'Tammkivi', NULL, NULL, NULL, 2, NULL),
    ('KM-14017-23634-60645', 'Juhan', 'Treilmann', NULL, NULL, NULL, 1, NULL),
    ('KM-13303-72722-81977', 'Herbert', 'Tampere', NULL, 1909, 1975, 1, NULL),
    (NULL, 'Hilda', 'Paju', NULL, NULL, NULL, 2, NULL),
    ('KM-13312-40087-16702', 'Andrei', 'Ramul', NULL, 1842, 1926, 1, '<preester>')
;


INSERT INTO folk_tune.users (person_id, user_role_type_id, username, password, is_active) 
VALUES 
    (1, 1, 'taivelohmuse@netscape.net', '$2y$10$4EuLXgOaL5O08OFPjb2.cedd3hOjMJcyOiXM7vm.KiZKKg..76rBi', TRUE),
    (2, 1, 'olga@folklore.ee', '$2y$10$V32EB4tVRPuOyJO1ob6xaOJmGXL3Byxy2DDJM1vcEz1IbFmHmJu7C', TRUE),
    (3, 3, 'helen', '$2y$10$BpEAqZucmoQRfqXLBEHSZOrZHaaz23jvgybJT4AZ.oz8ngSK4a1nC', FALSE),
    (4, 1, 'kristi.seemen@gmail.com', '$2y$10$zEXJBsFKXPQbIKaSUzKcn.YDCiRNaWAAPjiPGgC2.ZyxHMjdGxCPS', TRUE),
    (5, 1, 'martinparoll@gmail.com', '$2y$10$dEx9BRK1Ak8Aq/Zktbm.MeN1gz8nXvlL1NO.7fekUJw8gDHQANXHe', TRUE),
    (6, 1, 'katrin.avloi@gmail.com', '$2y$10$TRfqx8WMkJ/PQgbhUJ65dOQrdT46K0djGlpMjpGTjynvcgZ2zyoRO', TRUE)
;