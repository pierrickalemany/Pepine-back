-- Verify pepine:view on pg

BEGIN;

SELECT * FROM getAllProducts WHERE false;

ROLLBACK;
