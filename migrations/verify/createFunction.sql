-- Verify pepine:createFunction on pg

BEGIN;

SELECT * FROM create_user_has_product(null);
SELECT * FROM create_product_has_category(null);
SELECT * FROM create_order_has_product(null);
SELECT * FROM create_order(null);
SELECT * FROM create_product_has_media(null);
SELECT * FROM create_media(null);
SELECT * FROM create_user(null);
SELECT * FROM create_product(null);

ROLLBACK;
