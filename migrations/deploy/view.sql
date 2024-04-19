-- SQLBook: Code
-- Deploy pepine:view to pg

BEGIN;

CREATE VIEW getAllProducts AS
    SELECT 
        p.id,
        p.name,
        p.scientific_name,
        p.maturity_height,
        p.maturity_width,
        p.family,
        p.origin,
        p.flower_color,
        p.leaf_color,
        p.description1,
        p.description2,
        p.size,
        p.pot,
        p.stock,
        p.price,
        p.vat,
        p.status,
        p.created_at,
        p.updated_at,
        (p.price + (p.price * p.vat / 100)) AS price_incl_VAT,
        y.value AS yield_value,
        hz.value AS hardiness_zone_value,
        wr.value AS water_requirement_value,
        e.value AS exposure_value,
        gcp.value AS ground_cover_power_value,
        f.value AS foliage_value,
        ARRAY_AGG(DISTINCT pm.order) AS media_order,
        s.value AS strate_value,
        ARRAY_AGG(DISTINCT c.value) AS category,
        ARRAY_AGG(DISTINCT m.url) AS media_urls,
        ARRAY_AGG(DISTINCT m.id) AS media_id
    FROM product p
    JOIN yield y ON p.yield_id = y.id
    JOIN hardiness_zone hz ON p.hardiness_zone_id = hz.id
    JOIN water_requirement wr ON p.water_requirement_id = wr.id
    JOIN exposure e ON p.exposure_id = e.id
    JOIN ground_cover_power gcp ON p.ground_cover_power_id = gcp.id
    JOIN foliage f ON p.foliage_id = f.id
    JOIN strate s ON p.strate_id = s.id
    LEFT JOIN product_has_category pc ON p.id = pc.product_id
    LEFT JOIN category c ON pc.category_id = c.id
    LEFT JOIN product_has_media pm ON p.id = pm.product_id
    LEFT JOIN media m ON pm.media_id = m.id
    GROUP BY p.id,
            p.name,
            p.scientific_name,
            p.maturity_height,
            p.maturity_width,
            p.family,
            p.origin,
            p.flower_color,
            p.leaf_color,
            p.description1,
            p.description2,
            p.size,
            p.pot,
            p.stock,
            p.price,
            p.vat,
            p.status,
            p.created_at,
            p.updated_at,
            y.value, 
            hz.value, 
            wr.value,
            e.value, 
            gcp.value, 
            f.value, 
            s.value 
    ORDER BY p.id;

CREATE VIEW getAllOrders AS
    SELECT
        o.id AS id,
        o.reference AS reference,
        o.status AS status,
        o.user_id,
        o.first_name_order AS first_name,
        o.last_name_order AS last_name,
        o.total_price AS total_price,
        o.created_at AS created_at,
        o.updated_at AS updated_at,
		ARRAY_AGG(
        JSON_BUILD_OBJECT(
            'product_id', p.id,
            'product_name', p.name,
            'product_price', p.price,
            'quantity_ordered', ohp.quantity,
            'vat', p.vat
        )
    ) AS products
    FROM "order" o
    JOIN order_has_product ohp ON o.id = ohp.order_id
    JOIN product p ON ohp.product_id = p.id 
	GROUP BY o.id,
			o.reference,
       		o.status,
        	o.user_id,
        	o.first_name_order,
        	o.last_name_order,
        	o.total_price,
        	o.created_at,
        	o.updated_at
    ORDER BY o.created_at DESC;

CREATE VIEW getProductToUpdate AS
SELECT
 "product"."id" AS "id",
 "product"."name" AS "name",
 "scientific_name",
 "maturity_height",
 "maturity_width",
 "family",
 "origin",
 "flower_color",
 "leaf_color",
 "description1",
 "description2",
 "size",
 "pot",
 "stock",
 "price",
 "vat",
 "status",
 ("price" + ("price" * "vat" / 100)) AS price_incl_VAT,
 "yield_id",
 "hardiness_zone_id",
 "water_requirement_id",
 "exposure_id",
 "ground_cover_power_id",
 "foliage_id",
ARRAY_AGG(DISTINCT media_id) AS media_id,
ARRAY_AGG(DISTINCT category_id) AS category_id,
ARRAY_AGG(DISTINCT "order") AS "order",
ARRAY_AGG(DISTINCT "url") AS media_urls
FROM "product"
LEFT JOIN "product_has_category" ON "product"."id"="product_has_category"."product_id"
LEFT JOIN "product_has_media" ON "product"."id"="product_has_media"."product_id"
LEFT JOIN "media" ON "product_has_media"."media_id"="media"."id"
GROUP BY
 "product"."id",
 "product"."name",
 "scientific_name",
 "maturity_height",
 "maturity_width",
 "family",
 "origin",
 "flower_color",
 "leaf_color",
 "description1",
 "description2",
 "size",
 "pot",
 "stock",
 "price",
 "vat",
 "status",
 "yield_id",
 "hardiness_zone_id",
 "water_requirement_id",
 "exposure_id",
 "ground_cover_power_id",
 "foliage_id";


COMMIT;
