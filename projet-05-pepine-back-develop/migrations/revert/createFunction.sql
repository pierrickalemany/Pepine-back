-- Revert pepine:createFunction from pg

BEGIN;

DROP FUNCTION create_user_has_product;
DROP FUNCTION create_product_has_category;
DROP FUNCTION create_order_has_product;
DROP FUNCTION create_order;
DROP FUNCTION create_product_has_media;
DROP FUNCTION create_media;
DROP FUNCTION create_user;
DROP FUNCTION create_product;


COMMIT;
