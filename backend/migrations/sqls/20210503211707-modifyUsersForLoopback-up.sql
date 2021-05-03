CREATE TABLE public."user"
(
    id uuid NOT NULL,
    realm text,
    username text,
    email text NOT NULL,
    "emailverified" boolean,
    "verificationtoken" text,
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