-- Deploy pepine:createFunction to pg

BEGIN;

CREATE FUNCTION create_product(json) RETURNS product AS $$
	INSERT INTO "product" ("name", "scientific_name", "maturity_height", "maturity_width", "family", "origin",
						   "flower_color", "leaf_color", "description1", "description2", "stock", "price", "vat", "statut",
						  "yield_id", "hardiness_zone_id", "water_requirement_id", "exposure_id", "ground_cover_power_id", "strate_id", "foliage_id")
	VALUES (
	   $1->>'name',
	   $1->>'scientific_name',
	   $1->>'maturity_height',
	   $1->>'maturity_width',
	   $1->>'family',
	   $1->>'origin',
	   $1->>'flower_color',
	   $1->>'leaf_color',
	   $1->>'description1',
	   $1->>'description2',
	   ($1->>'stock')::int,
	   ($1->>'price')::numeric,
	   ($1->>'vat')::numeric,
	   ($1->>'statut')::boolean,
	   ($1->>'yield_id')::int,
	   ($1->>'hardiness_zone_id')::int,
	   ($1->>'water_requirement_id')::int,
	   ($1->>'exposure_id')::int,
	   ($1->>'ground_cover_power_id')::int,
	   ($1->>'strate_id')::int,
	   ($1->>'foliage_id')::int
	)
	RETURNING *;
$$ LANGUAGE sql VOLATILE;


CREATE FUNCTION create_user(json) RETURNS "user" AS $$
	INSERT INTO "user" ("first_name", "last_name", "email", "password", "role")
	VALUES (
	   $1->>'first_name',
	   $1->>'last_name',
	   $1->>'email',
	   $1->>'password',
	   COALESCE($1->>'role', 'user')
	)
	RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;

CREATE FUNCTION create_media(json) RETURNS "media" AS $$
	INSERT INTO "media" ("url", "name")
	VALUES (
	   $1->>'url',
	   $1->>'name'  
	)
	RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;

CREATE FUNCTION create_product_has_media(json) RETURNS "product_has_media" AS $$
	INSERT INTO "product_has_media" ("product_id", "media_id", "order")
	VALUES (
		($1->>'product_id')::int,
	    ($1->>'media_id')::int,
	    ($1->>'order')::int 
	)
	RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;

CREATE FUNCTION create_order(json) RETURNS "order" AS $$
	INSERT INTO "order" ("first_name_order", "last_name_order", "total_price", "statut", "user_id")
	VALUES (
		$1->>'first_name_order',
	    $1->>'last_name_order',
	    ($1->>'total_price')::numeric, 
		$1->>'statut', 
		($1->>'user_id')::int 
	)
	RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;

CREATE FUNCTION create_order_has_product(json) RETURNS "order_has_product" AS $$
	INSERT INTO "order_has_product" ("product_id", "order_id", "quantity", "price_time_order", "subtotal_price")
	VALUES (
		($1->>'product_id')::int,
	    ($1->>'order_id')::int,
	    ($1->>'quantity')::int, 
		($1->>'price_time_order')::numeric, 
		($1->>'subtotal_price')::numeric 
	)
	RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;

CREATE FUNCTION create_product_has_category(json) RETURNS "product_has_category" AS $$
	INSERT INTO "product_has_category" ("product_id", "category_id")
	VALUES (
		($1->>'product_id')::int,
	    ($1->>'category_id')::int    
	)
	RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;


CREATE FUNCTION create_user_has_product(json) RETURNS "user_has_product" AS $$
	INSERT INTO "user_has_product" ("product_id", "user_id")
	VALUES (
		($1->>'product_id')::int,
	    ($1->>'user_id')::int    
	)
	RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;

COMMIT;
