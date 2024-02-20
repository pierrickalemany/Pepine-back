-- Verify pepine:view on pg

BEGIN;

SELECT * FROM getAllProducts WHERE false;
SELECT * FROM findAllOrdersOfUser WHERE false;
SELECT * FROM getAllOrders WHERE false;
SELECT * FROM getProductToUpdate WHERE false;

ROLLBACK;
