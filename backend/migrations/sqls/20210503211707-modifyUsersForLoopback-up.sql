CREATE TABLE public."user"
(
    id uuid NOT NULL,
    realm text,
    username text,
    email text NOT NULL,
    "emailverified" boolean,
    "verificationtoken" text,
    firstname text,
    lastname text,
    roles text[],
    PRIMARY KEY (id)
);
ALTER TABLE public."user"
    ADD CONSTRAINT uniq_user_email UNIQUE (email);

CREATE TABLE public."usercredentials"
(
    id uuid NOT NULL,
    password text NOT NULL,
    "userid" uuid,
    PRIMARY KEY (id),
    CONSTRAINT fk_user_credentials_user FOREIGN KEY ("userid")
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE public.refreshtoken
(
    id uuid NOT NULL,
    "userid" uuid NOT NULL,
    "refreshToken" text,
    PRIMARY KEY (id),
    CONSTRAINT fk_refresh_token_user FOREIGN KEY ("userid")
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

INSERT INTO public.user(id, email, roles, firstname, lastname)
    VALUES (uuid_generate_v4(), 'admin@ekm.ee', ARRAY['admin'], 'Admin', 'Istrator');

INSERT INTO public.usercredentials(id, password, userid)
    (SELECT uuid_generate_v4(), '$2a$10$NkXNEbcUVbW6jopSkoVvIeTgbX8acFD/BRMBUAFS3FP4lxNNaXnxS', id as userid FROM public.user WHERE email = 'admin@ekm.ee');