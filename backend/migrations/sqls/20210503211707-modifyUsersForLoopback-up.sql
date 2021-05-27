CREATE TABLE folk_tune."user"
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    realm text,
    username text,
    email text UNIQUE NOT NULL,
    "emailverified" boolean,
    "verificationtoken" text,
    firstname text,
    lastname text,
    roles text[]
);

CREATE TABLE folk_tune."user_credentials"
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    password text NOT NULL,
    "userid" uuid UNIQUE,
    CONSTRAINT fk_user_credentials_user FOREIGN KEY ("userid")
        REFERENCES folk_tune."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE folk_tune."refresh_token"
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userid" uuid NOT NULL,
    "refreshToken" text,
    CONSTRAINT fk_refresh_token_user FOREIGN KEY ("userid")
        REFERENCES folk_tune."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

INSERT INTO folk_tune.user(email, roles, firstname, lastname)
    VALUES ('admin@ekm.ee', ARRAY['admin'], 'Admin', 'Istrator');

INSERT INTO folk_tune.user_credentials(password, userid)
    (SELECT '$2a$10$NkXNEbcUVbW6jopSkoVvIeTgbX8acFD/BRMBUAFS3FP4lxNNaXnxS', id as userid FROM folk_tune.user WHERE email = 'admin@ekm.ee');