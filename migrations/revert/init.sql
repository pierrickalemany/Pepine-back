-- SQLBook: Code
-- Revert pepine:init from pg

BEGIN;

-- Deleting tables in a single command
DROP TABLE IF EXISTS 
    "order_has_product",
    "product_has_media",
    "product_has_category",
    "product",
    "media",
    "category",
    "order",
    "hardiness_zone",
    "yield",
    "water_requirement",
    "exposure",
    "ground_cover_power",
    "foliage",
    "strate",
    "user" CASCADE;

-- Deleting the sequence
DROP SEQUENCE IF EXISTS order_id_seq;

-- Domain deletion
DROP DOMAIN IF EXISTS "email";

COMMIT;
