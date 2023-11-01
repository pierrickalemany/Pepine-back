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
    p.stock,
    p.price,
    p.vat,
    p.statut,
    p.created_at,
    p.updated_at,
    y.value AS yield_value,
    hz.value AS hardiness_zone_value,
    wr.value AS water_requirement_value,
    e.value AS exposure_value,
    gcp.value AS ground_cover_power_value,
    f.value AS foliage_value,
    s.value AS strate_value,
    pm.order AS product_has_media_order,
    m.url AS media_url,
    m.name AS media_name
FROM product p
JOIN yield y ON p.yield_id = y.id
JOIN hardiness_zone hz ON p.hardiness_zone_id = hz.id
JOIN water_requirement wr ON p.water_requirement_id = wr.id
JOIN exposure e ON p.exposure_id = e.id
JOIN ground_cover_power gcp ON p.ground_cover_power_id = gcp.id
JOIN foliage f ON p.foliage_id = f.id
JOIN strate s ON p.strate_id = s.id
LEFT JOIN product_has_media pm ON p.id = pm.product_id
LEFT JOIN media m ON pm.media_id = m.id;

COMMIT;
