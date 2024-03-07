-- SQLBook: Code
-- Deploy pepine:createFunction to pg

BEGIN;

CREATE FUNCTION create_product(json) RETURNS product AS $$
	INSERT INTO "product" ("name", "scientific_name", "maturity_height", "maturity_width", "family", "origin",
						   "flower_color", "leaf_color", "description1", "description2", "size", "pot", "stock", "price", "vat", "status", "user_id",
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
	   $1->>'size',
	   $1->>'pot',
	   ($1->>'stock')::int,
	   ($1->>'price')::numeric,
	   ($1->>'vat')::numeric,
	   ($1->>'status')::boolean,
	   ($1->>'user_id')::int,
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
	INSERT INTO "user" ("first_name", "last_name", "phone", "email", "password", "role")
	VALUES (
	   $1->>'first_name',
	   $1->>'last_name',
	   $1->>'phone',
	   $1->>'email',
	   $1->>'password',
	   COALESCE($1->>'role', 'user')
	)
	RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;

/*creating a loop to insert multiple values into the same query for media*/
CREATE FUNCTION create_media(input_json jsonb) RETURNS SETOF "media" AS $$
DECLARE
    media_object JSONB;
	url_value TEXT;
	name_value TEXT;
    inserted_row media%ROWTYPE;
BEGIN
    -- Loop through JSON array for each element
    FOR media_object IN SELECT * FROM jsonb_array_elements(input_json) LOOP
        -- Extract values from JSON object
        url_value := media_object->>'url';
        name_value := media_object->>'name';
        

        -- Insert values into product_has_media table
        INSERT INTO "media" ("url", "name")
        VALUES (url_value, name_value)
        RETURNING * INTO inserted_row; -- Return inserted row

    -- End of loop, no value returned here because we already used RETURNING in INSERT statement
    RETURN NEXT inserted_row;
    END LOOP;
	RETURN;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT;

/*creating a loop to insert multiple values into the same query for product_has_media*/
CREATE FUNCTION create_product_has_media(input_json jsonb)
RETURNS SETOF product_has_media AS $$
DECLARE
    media_object JSONB;
    product_id INT;
    media_id INT;
    order_value INT;
	inserted_row product_has_media%ROWTYPE;
BEGIN
    -- Loop through JSON array for each element
    FOR media_object IN SELECT * FROM jsonb_array_elements(input_json) LOOP
        -- Extract values from JSON object
        product_id := (media_object->>'product_id')::INT;
        media_id := (media_object->>'media_id')::INT;
        order_value := (media_object->>'order')::INT;

        -- Insert values into product_has_media table
        INSERT INTO "product_has_media" ("product_id", "media_id", "order")
        VALUES (product_id, media_id, order_value)
        RETURNING * INTO inserted_row; -- Return inserted row

    -- End of loop, no value returned here because we already used RETURNING in INSERT statement
    RETURN NEXT inserted_row;
    END LOOP;
	RETURN;
END;
$$ LANGUAGE plpgsql STRICT VOLATILE;

CREATE FUNCTION create_order(json) RETURNS "order" AS $$
	INSERT INTO "order" ("first_name_order", "last_name_order", "total_price", "status", "user_id")
	VALUES (
		$1->>'first_name_order',
	    $1->>'last_name_order',
	    ($1->>'total_price')::numeric, 
		$1->>'status', 
		($1->>'user_id')::int 
	)
	RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;

CREATE FUNCTION create_order_has_product(input_json jsonb)
RETURNS SETOF "order_has_product" AS $$
DECLARE
    order_product_object JSONB;
    product_id INT;
    order_id INT;
    quantity INT;
    price_time_order NUMERIC;
    vat NUMERIC;
    inserted_row "order_has_product"%ROWTYPE;
BEGIN
    -- Loop through JSON array for each element
    FOR order_product_object IN SELECT * FROM jsonb_array_elements(input_json) LOOP
        -- Extract values from JSON object
        product_id := (order_product_object->>'product_id')::int;
        order_id := (order_product_object->>'order_id')::int;
        quantity := (order_product_object->>'quantity')::int;
        price_time_order := (order_product_object->>'price_time_order')::numeric;
        vat := (order_product_object->>'vat')::numeric;

        -- Insert values into order_has_product table
        INSERT INTO "order_has_product" ("product_id", "order_id", "quantity", "price_time_order", "vat")
        VALUES (product_id, order_id, quantity, price_time_order, vat)
        RETURNING * INTO inserted_row; -- Return inserted row

        -- End of loop, no value returned here because we already used RETURNING in INSERT statement
        RETURN NEXT inserted_row;
    END LOOP;

    RETURN;
END;
$$ LANGUAGE plpgsql VOLATILE STRICT;


CREATE FUNCTION create_product_has_category(json) RETURNS "product_has_category" AS $$
	INSERT INTO "product_has_category" ("product_id", "category_id")
	VALUES (
		($1->>'product_id')::int,
	    ($1->>'category_id')::int    
	)
	RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;

COMMIT;
