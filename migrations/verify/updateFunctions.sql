-- Verify pepine:updateFunctions on pg

BEGIN;


SELECT * FROM update_user(null);
SELECT * FROM update_product(null);

ROLLBACK;
