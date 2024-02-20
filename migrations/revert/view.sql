-- Revert pepine:view from pg

BEGIN;

    DROP VIEW IF EXISTS getProductToUpdate;
    DROP VIEW IF EXISTS getAllOrders;
    DROP VIEW IF EXISTS getAllProducts;

COMMIT;
