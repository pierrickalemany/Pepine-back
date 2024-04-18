-- Deploy pepine:init to pg
-- Start of transaction
BEGIN;

-- Creating a domain to validate email addresses
CREATE DOMAIN "email" AS text
CHECK(
    value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
);

CREATE TABLE
    "user"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "first_name" TEXT NOT NULL CHECK (LENGTH("first_name") <= 50),
        "last_name" TEXT NOT NULL CHECK (LENGTH("last_name") <= 50),
        "phone" TEXT NOT NULL CHECK (LENGTH("phone") <= 50),
        "email" email NOT NULL UNIQUE CHECK (LENGTH("email") <= 50),
        "password" TEXT NOT NULL UNIQUE,
        "role" TEXT NOT NULL DEFAULT 'user',
        "reset_token" TEXT,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );

CREATE TABLE
    "strate"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "value" TEXT NOT NULL UNIQUE,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );
CREATE TABLE
    "foliage"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "value" TEXT NOT NULL UNIQUE,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );

CREATE TABLE
    "ground_cover_power"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "value" TEXT NOT NULL UNIQUE,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );
CREATE TABLE
    "exposure"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "value" TEXT NOT NULL UNIQUE,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );
CREATE TABLE
    "water_requirement"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "value" TEXT NOT NULL UNIQUE,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );
CREATE TABLE
    "yield"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "value" TEXT NOT NULL UNIQUE,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );
CREATE TABLE
    "hardiness_zone"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "value" TEXT NOT NULL UNIQUE,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );

/*create starting sequence for order reference*/
CREATE SEQUENCE order_id_seq START 1;

CREATE TABLE
    "order"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "reference" TEXT DEFAULT LPAD(nextval('order_id_seq')::TEXT, 5, '0'),
        "first_name_order" TEXT NOT NULL,
        "last_name_order" TEXT NOT NULL,
        "total_price" NUMERIC(5, 2) NOT NULL,
        "status" TEXT NOT NULL,
        "user_id" INT NULL REFERENCES "user"(id) ON DELETE SET NULL,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );

CREATE TABLE
    "category"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "value" TEXT NOT NULL UNIQUE,
        "description" TEXT,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );

CREATE TABLE
    "media"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "url" TEXT NOT NULL UNIQUE,
        "name" TEXT NOT NULL UNIQUE CHECK (LENGTH("name") <= 50),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );

CREATE TABLE
    "product"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" TEXT NOT NULL CHECK (LENGTH("name") <= 50),
        "scientific_name" TEXT NOT NULL CHECK (LENGTH("scientific_name") <= 100),
        "maturity_height" TEXT CHECK (LENGTH("maturity_height") <= 50),
        "maturity_width" TEXT CHECK (LENGTH("maturity_width") <= 50),
        "family" TEXT CHECK (LENGTH("family") <= 50),
        "origin" TEXT CHECK (LENGTH("origin") <= 50),
        "flower_color" TEXT CHECK (LENGTH("flower_color") <= 50),
        "leaf_color" TEXT CHECK (LENGTH("leaf_color") <= 50),
        "description1" TEXT,
        "description2" TEXT,
        "size" TEXT CHECK (LENGTH("size") <= 50),
        "pot" TEXT CHECK (LENGTH("pot") <= 50),
        "stock" INT NOT NULL DEFAULT 0,
        "price" NUMERIC(5, 2) CHECK (price >= 0.0),
        "vat" NUMERIC,
        "status" BOOLEAN NOT NULL,
        "user_id" INT NOT NULL REFERENCES "user"(id),
        "yield_id" INT NOT NULL REFERENCES "yield"(id),
        "hardiness_zone_id" INT NOT NULL REFERENCES "hardiness_zone"(id),
        "water_requirement_id" INT NOT NULL REFERENCES "water_requirement"(id),
        "exposure_id" INT NOT NULL REFERENCES "exposure"(id),
        "ground_cover_power_id" INT NOT NULL REFERENCES "ground_cover_power"(id),
        "strate_id" INT NOT NULL REFERENCES "strate"(id),
        "foliage_id" INT NOT NULL REFERENCES "foliage"(id),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );

CREATE TABLE
    "product_has_category"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "product_id" INT REFERENCES "product"(id) ON DELETE CASCADE, 
        "category_id" INT REFERENCES "category"(id)
    );


CREATE TABLE
    "product_has_media"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "product_id" INT REFERENCES "product"(id) ON DELETE CASCADE,
        "media_id" INT REFERENCES "media"(id) ON DELETE CASCADE,
        "order" INT NOT NULL CHECK ("order" >= 0),
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );

CREATE TABLE
    "order_has_product"(
        "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "product_id" INT REFERENCES "product"(id) ON DELETE SET NULL,
        "order_id" INT REFERENCES "order"(id),
        "quantity" INT NOT NULL CHECK (quantity >= 0),
        "price_time_order" NUMERIC(5, 2) NOT NULL,
        "vat" NUMERIC NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz
    );

COMMIT;