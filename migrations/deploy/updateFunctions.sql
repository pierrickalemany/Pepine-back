-- Deploy pepine:updateFunctions to pg

BEGIN;

CREATE OR REPLACE FUNCTION update_user(json) RETURNS "user" AS $$

    UPDATE "user" SET
        "first_name" = $1->>'first_name',
        "last_name" = $1->>'last_name',
        "phone" = $1->>'phone',
        "email" = $1->>'email',
	    "updated_at" = NOW()
    WHERE "id" = ($1->>'id')::int
    RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;

CREATE OR REPLACE FUNCTION update_product(json) RETURNS "product" AS $$

    UPDATE "product" SET
        "name" = COALESCE($1->>'name', "name"),
        "scientific_name" = COALESCE($1->>'scientific_name', "scientific_name"),
        "maturity_height" = COALESCE($1->>'maturity_height', "maturity_height"),
        "maturity_width" = COALESCE($1->>'maturity_width', "maturity_width"),
        "family" = COALESCE($1->>'family', "family"),
        "origin" = COALESCE($1->>'origin', "origin"),
        "flower_color" = COALESCE($1->>'flower_color', "flower_color"),
        "leaf_color" = COALESCE($1->>'leaf_color', "leaf_color"),
        "description1" = COALESCE($1->>'description1', "description1"),
        "description2" = COALESCE($1->>'description2', "description2"),
        "size" = COALESCE($1->>'size', "size"),
        "pot" = COALESCE($1->>'pot', "pot"),
        "stock" = COALESCE(($1->>'stock')::int, "stock"),
        "price" = COALESCE(($1->>'price')::numeric, "price"),
        "vat" = COALESCE(($1->>'vat')::numeric, "vat"),
        "status" = COALESCE(($1->>'status')::boolean, "status"),
        "yield_id" = COALESCE(($1->>'yield_id')::int, "yield_id"),
        "hardiness_zone_id" = COALESCE(($1->>'hardiness_zone_id')::int, "hardiness_zone_id"),
        "water_requirement_id" = COALESCE(($1->>'water_requirement_id')::int, "water_requirement_id"),
        "exposure_id" = COALESCE(($1->>'exposure_id')::int, "exposure_id"),
        "ground_cover_power_id" = COALESCE(($1->>'ground_cover_power_id')::int, "ground_cover_power_id"),
        "strate_id" = COALESCE(($1->>'strate_id')::int, "strate_id"),
        "foliage_id" = COALESCE(($1->>'foliage_id')::int, "foliage_id"),
        "updated_at" = NOW()
    WHERE "id" = ($1->>'id')::int
    RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;

CREATE OR REPLACE FUNCTION update_order_status(order_id INT, new_status TEXT)
RETURNS VOID AS $$
    UPDATE "order"
    SET status = new_status
    WHERE id = order_id;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION update_product_categories(p_product_id INT, category_ids INT[])
RETURNS VOID AS $$
DECLARE
    category_id INT; -- Déclarer la variable category_id
BEGIN
    -- Supprimer toutes les associations existantes pour ce produit
    DELETE FROM product_has_category WHERE product_id = p_product_id;

    -- Créer de nouvelles associations pour chaque catégorie fournie
    FOREACH category_id IN ARRAY category_ids LOOP
        INSERT INTO product_has_category (product_id, category_id) VALUES (p_product_id, category_id);
    END LOOP;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION update_product_media(p_product_id INT, new_media JSONB)
RETURNS VOID AS $$
DECLARE 
    media_record JSONB;
    new_media_url TEXT;
    new_media_name TEXT;
    new_media_id INT;
    media_order INT;
BEGIN
    -- Supprimer tous les médias existants pour ce produit
    DELETE FROM product_has_media WHERE product_id = p_product_id;

    -- Initialiser le compteur pour l'ordre des médias
    media_order := 1;

    -- Ajouter les nouveaux médias
    FOR media_record IN SELECT * FROM jsonb_array_elements(new_media) LOOP
        new_media_url := media_record->>'url';
        new_media_name := media_record->>'name';

        -- Trouver l'ID du média correspondant à l'URL
        SELECT id INTO new_media_id FROM media WHERE url = new_media_url;

        -- Si l'URL n'existe pas dans la table media, l'insérer avec le nom
        IF new_media_id IS NULL THEN
            INSERT INTO media (url, "name") VALUES (new_media_url, new_media_name) RETURNING id INTO new_media_id;
        END IF;

        -- Insérer la nouvelle association en préservant l'ordre
        INSERT INTO product_has_media (product_id, media_id, "order") 
        VALUES (p_product_id, new_media_id, media_order);
        
        -- Incrémenter le compteur pour l'ordre des médias
        media_order := media_order + 1;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

COMMIT;

