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
	    "statut" = ($1->>'statut')::boolean,
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

COMMIT;
