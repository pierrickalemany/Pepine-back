-- Revert pepine:view from pg

BEGIN;

    DROP VIEW getAllOrders;
    DROP VIEW getAllProducts;

COMMIT;
