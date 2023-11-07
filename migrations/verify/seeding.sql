-- SQLBook: Code
-- Verify pepine:seeding on pg

BEGIN;

SELECT * FROM "order" WHERE false;

SELECT * FROM "user" WHERE false;

SELECT * FROM "strate" WHERE false;

SELECT * FROM "media" WHERE false;

SELECT * FROM "foliage" WHERE false;

SELECT * FROM "ground_cover_power" WHERE false;

SELECT * FROM "exposure" WHERE false;

SELECT * FROM "water_requirement" WHERE false;

SELECT * FROM "yield" WHERE false;

SELECT * FROM "hardiness_zone" WHERE false;

SELECT * FROM "category" WHERE false;

SELECT * FROM "media" WHERE false;

SELECT * FROM "product" WHERE false;

SELECT * FROM "product_has_category" WHERE false;

SELECT * FROM "user_has_product" WHERE false;

SELECT * FROM "product_has_media" WHERE false;

SELECT * FROM "order_has_product" WHERE false;

ROLLBACK;
