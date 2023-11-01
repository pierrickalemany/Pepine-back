-- Revert pepine:view from pg

BEGIN;

    DROP VIEW getAllProducts;

COMMIT;
