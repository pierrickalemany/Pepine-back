-- Revert pepine:updateFunctions from pg

BEGIN;

DROP FUNCTION IF EXISTS update_user(json);
DROP FUNCTION IF EXISTS update_product(json);

COMMIT;
