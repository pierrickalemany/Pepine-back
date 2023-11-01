-- SQLBook: Code
-- Deploy pepine:seeding to pg

BEGIN;

-- SQLBook: Code

INSERT INTO "foliage" ("value")
VALUES ('Persistant'),
       ('Caduc'),
       ('Persistant et caduc');

INSERT INTO "strate" ("value")
VALUES ('Arbre'),
       ('Arbuste'),
       ('Herbacés haute'),
       ('Herbacés basse'),
       ('Couvre-sol'),
       ('Racine'),
       ('Grimpante');

INSERT INTO "category" ("value")
VALUES ('Aromates et Médicinales'),
       ('Fruitiers'),
       ('Agrumes'),
       ('Plantes équines');

INSERT INTO "ground_cover_power" ("value")
VALUES ('Mauvais'),
       ('Correct (désherbage printemps/été)'),
       ('Bon'),
       ('Très bon'),
       ('Non couvrant');
       
INSERT INTO "exposure" ("value")
VALUES ('Plein soleil'),
       ('Ombre légère (50%)'),
       ('Ombre modérée (80%)'),
       ('Pleine ombre'),
       ('Ombre profonde');

INSERT INTO "water_requirement" ("value")
VALUES (1),
       (2),
       (3),
       (4);

INSERT INTO "hardiness_zone" ("value")
VALUES (1),
       (2),
       (3),
       (4),
       (5),
       (6),
       (7),
       (8),
       (9),
       (10);

INSERT INTO "yield" ("value")
VALUES ('Correct'),
       ('Bon'),
       ('Très bon'),
       ('Excellent');


INSERT INTO "product" (
  "scientific_name",
  "name",
  "description1",
  "description2",
  "maturity_height",
  "maturity_width",
  "family",
  "origin",
  "flower_color",
  "leaf_color",
  "statut",
  "stock",
  "vat",
  "price",
  "yield_id",
  "hardiness_zone_id",
  "water_requirement_id", 
  "exposure_id",
  "ground_cover_power_id", 
  "strate_id", 
  "foliage_id" 
)
VALUES
  ('ALLIUM schoenoprasum', 'Ciboulette', 'En été, les tiges creuses, dressées et odorantes de la ciboulette portent jusqu''à 20 fleurs violet clair ou roses disposées en ombelle dense et pouvant atteindre jusqu''à 5 cm d''envergure. Allium schoenoprasum est une plante vivace bulbeuse, comestible (tiges et fleurs), facile à vivre, utilisée comme condiment. Il est toutefois préférable de couper les fleurs avant qu''elles ne montent en graines...', '', '', '', '', '', '', '', false, 15, 10, 2.60, 1, 1, 1, 1, 1, 1, 1),
  ('Arbutus unedo', 'Arbousier', 'L’Arbousier Atlantic (Arbutus unedo) est une variété au port compact de croissance relativement lente, il est très ornementale grâce à son beau feuillage persistant et son écorce de couleur brun rougeâtre...', 'Parfois appelé ‘arbre aux fraises’, cet arbuste produit de gros fruits rouges en automne...', 'Hauteur de 1 à 10 m selon la conduite', 'NC largeur adulte', 'NC famille', 'NC origine', 'NC couleu Fleurs', 'NC couleur feuille', false, 3, 10, 18.20, 1, 1, 1, 1, 1, 1, 1),
  ('ARTEMISIA dranunculus', 'Estragon', 'Cette vivace condimentaire, odorante, s''utilise fraiche ou sèche pour aromatiser sauces, plats, salades ou conserves au vinaigre. Les feuilles aiguës sont disposées le long de fines tiges dressées. Des panicules de petites fleurs vert jaune apparaissent dans le courant de l''été. Les graines sont stériles...', '', '1 mètre', '30 cm', 'Asteraceae', 'Horticole', '', 'Vert moyen', false, 5, 10., 1.64, 1, 1, 1, 1, 1, 1, 1),
  ('Basilic', 'Basilic', '', '', '', '', '', '', '', '', false, 0, 5.00, 0.00, 1, 1, 1, 1, 1, 1, 1),
  ('Batavia', 'Batavia', '', '', '', '', '', '', '', '', false, 100, 5.00, 0.00, 1, 1, 1, 1, 1, 1, 1),
  ('Betula alba verrucosa', 'Bouleau Blanc', '', '', '', '', '', '', '', '', false, 1, 10.00, 40.30, 1, 1, 1, 1, 1, 1, 1),
  ('Ribes nigrum', 'Cassis', 'Le Cassissier aussi appelé "Groseillier Noir" est originaire du Nord de l''Europe et de l''Asie...', 'Le Cassissier est un arbuste ou arbrisseau touffu et odorant...', '120 cm.', '120 cm.', 'Grossulariaceae', 'Nord, Est et Centre de l''Europe.', 'Rouge foncé', 'Vert foncé', false, 2, 10.00, 0.00, 1, 1, 1, 1, 1, 1, 1),
  ('CITRUS limon Lunario sur P.trifoliata', 'Citronnier 4 saisons', 'Citronnier 4 saisons, Lunari ou Lunario est un magnifique agrume qui doit son nom au fait qu’il porte fleurs et fruits durant les quatre saisons...', '', '', '', '', '', '', '', false, 9, 10.00, 22.85, 1, 1, 1, 1, 1, 1, 1);


INSERT INTO "user" (
  "first_name",
  "last_name",
  "email",
  "password",
  "role"  
)
--password: pepine
VALUES
('admin', 'pepine','pepine@gamil.com', '$2y$10$ULFF1qvgWT4BSMLGoCvbC.r8BZP9uU1OfoV6mY7PwgQiNHoSzruNe', 'admin');

COMMIT;
