-- Deploy pepine:updateFunctions to pg

BEGIN;

CREATE OR REPLACE FUNCTION update_user(json) RETURNS "user" AS $$

    UPDATE "user" SET
        "first_name" = $1->>'first_name',
        "last_name" = $1->>'last_name',
        "email" = $1->>'email',
        "password" = $1->>'password',
	    "updated_at" = NOW()
    WHERE "id" = ($1->>'id')::int
    RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;

CREATE OR REPLACE FUNCTION update_product(json) RETURNS "product" AS $$

    UPDATE "product" SET
        "name" = $1->>'name',
        "scientific_name" = $1->>'scientific_name',
        "maturity_height" = $1->>'maturity_height',
	    "maturity_width" = $1->>'maturity_width',
	    "family" = $1->>'family',
	    "origin" = $1->>'origin',
	    "flower_color" = $1->>'flower_color',
	    "leaf_color" = $1->>'leaf_color',
	    "description1" = $1->>'description1',
	    "description2" = $1->>'description2',
	    "stock" = ($1->>'stock')::int, 
	    "price" = ($1->>'price')::numeric,
	    "vat" = ($1->>'vat')::numeric,
	    "status" = ($1->>'status')::boolean,
	    "yield_id" = ($1->>'yield_id')::int,
	    "hardiness_zone_id" = ($1->>'hardiness_zone_id')::int,
	    "water_requirement_id" = ($1->>'water_requirement_id')::int,
	    "exposure_id" = ($1->>'exposure_id')::int,
        "ground_cover_power_id" = ($1->>'ground_cover_power_id')::int,
	    "strate_id" = ($1->>'strate_id')::int,
	    "foliage_id" = ($1->>'foliage_id')::int,
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

