CREATE TABLE folk_tune.pages
(
    id serial PRIMARY KEY,
    name text,
    content text
);

INSERT INTO folk_tune.pages (id, name, content) VALUES (1, 'home', 'Kodu');