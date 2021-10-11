CREATE TABLE folk_tune.pages
(
    id serial PRIMARY KEY,
    name text,
    content text
);

INSERT INTO folk_tune.pages (name, content) VALUES ('home', 'Kodu');
INSERT INTO folk_tune.pages (name, content) VALUES ('searchHelp', 'Otsingu abi');