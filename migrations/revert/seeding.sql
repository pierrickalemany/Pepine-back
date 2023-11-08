-- SQLBook: Code
-- Revert pepine:seeding from pg

BEGIN;

DELETE FROM "product_has_category";
DELETE FROM "order_has_product";
DELETE FROM "product_has_media";
DELETE FROM "media";
DELETE FROM "product";
DELETE FROM "order";
DELETE FROM "user";
DELETE FROM "foliage";
DELETE FROM "strate";
DELETE FROM "category";
DELETE FROM "ground_cover_power";
DELETE FROM "exposure";
DELETE FROM "water_requirement";
DELETE FROM "hardiness_zone";
DELETE FROM "yield";

COMMIT;
