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

INSERT INTO "category" ("value", "description")
VALUES ('Aromates et Médicinales', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar, urna nec interdum hendrerit, libero nisi commodo diam, sed laoreet libero elit vel tortor."'),
       ('Fruitiers', 'Cras tristique ligula quis odio fringilla, sit amet venenatis nulla gravida. Pellentesque id diam nec orci eleifend euismod eget et sem.'),
       ('Agrumes', '"Blandit libero mauris, non pulvinar nisi condimentum sed. Integer nec nulla vitae massa ultrices rhoncus. Etiam eu velit nec ex iaculis tincidunt vel nec libero."'),
       ('Plantes équines', '"Bibendum ut bibendum eget, rhoncus quis massa. Quisque tincidunt lacinia augue, ac fringilla diam aliquet sit amet. Nullam ut nisi nec augue convallis malesuada."');

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


INSERT INTO "media" ("url", "name")
VALUES ('https://i.huffpost.com/gen/1951435/images/o-PORTRAIT-SINGE-facebook.jpg', 'coucou'),
       ('https://www.forumdephotos.com/uploads/monthly_2017_08/598486726351d_singe4f2p.JPG.8687a5bdd8650e1bb9c9d3c840435a3b.JPG','ooohh'),
       ('https://media.ooreka.fr/public/image/plant/176/mainImage-full-9744022.jpg','orange'),
       ('https://2.bp.blogspot.com/-dQJUvUxB0ao/VvEprno3qbI/AAAAAAAAMWg/KbplW41ZBPoNVSTeS-hOmcK_DigrRzTlw/s1600/image%2Bde%2Bsinge%2Bdr%25C3%25B4le.jpg','tu dis quoi'),
       ('https://pixnio.com/free-images/2017/03/27/2017-03-27-08-41-56.jpg','fleur'),
       ('https://www.jardinsdefrance.org/wp-content/uploads/2017/06/Dente-2006-FRUIT-02_INRA.jpg','banane'),
       ('https://4.bp.blogspot.com/-PbEvz9-bT8o/VD_UR9cntYI/AAAAAAAADl4/bePhNV1l4kM/s1600/Funny%2BMonkey%2BPics%2B5.jpg','dancing'),
       ('https://laboxfruitee.com/wp-content/uploads/2020/07/Box_Fruitee_Ananas_Christian_BARRET_Box_24-scaled-0x0-c-default.jpg','ananas');


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
  "size",
  "pot",
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
  ('ALLIUM schoenoprasum', 'Ciboulette', 'En été, les tiges creuses, dressées et odorantes de la ciboulette portent jusqu''à 20 fleurs violet clair ou roses disposées en ombelle dense et pouvant atteindre jusqu''à 5 cm d''envergure. Allium schoenoprasum est une plante vivace bulbeuse, comestible (tiges et fleurs), facile à vivre, utilisée comme condiment. Il est toutefois préférable de couper les fleurs avant qu''elles ne montent en graines...', '', '', '', '', '', '', '', '15 cm', '1 L', false, 15, 10, 2.60, 2, 1, 3, 1, 2, 3, 2),
  ('Arbutus unedo', 'Arbousier', 'L’Arbousier Atlantic (Arbutus unedo) est une variété au port compact de croissance relativement lente, il est très ornementale grâce à son beau feuillage persistant et son écorce de couleur brun rougeâtre...', 'Parfois appelé ‘arbre aux fraises’, cet arbuste produit de gros fruits rouges en automne...', 'Hauteur de 1 à 10 m selon la conduite', 'NC largeur adulte', 'NC famille', 'NC origine', 'NC couleu Fleurs', 'NC couleur feuille', '150 cm', '15 L', false, 3, 10, 18.20, 2, 1, 3, 1, 2, 3, 2),
  ('ARTEMISIA dranunculus', 'Estragon', 'Cette vivace condimentaire, odorante, s''utilise fraiche ou sèche pour aromatiser sauces, plats, salades ou conserves au vinaigre. Les feuilles aiguës sont disposées le long de fines tiges dressées. Des panicules de petites fleurs vert jaune apparaissent dans le courant de l''été. Les graines sont stériles...', '', '1 mètre', '30 cm', 'Asteraceae', 'Horticole', '', 'Vert moyen', '15 cm', '1 L', false, 5, 10, 1.64, 2, 1, 3, 1, 2, 3, 2),
  ('Basilic', 'Basilic', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar ligula in felis lacinia, id eleifend neque consectetur.', '', '250 cm', '100cm', 'jedi', 'bamaco', 'noir', 'bleu', '105 cm', '10 L', false, 0, 10, 0.00, 2, 1, 3, 1, 2, 3, 2),
  ('Batavia', 'Batavia', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar ligula in felis lacinia, id eleifend neque consectetur.', '', '50 cm', '500 cm', 'padawan', 'naboo', 'orange', '20 cm', '3 L', false, 100, 100, 0.00, 2, 1, 3, 1, 2, 3, 2),
  ('Betula alba verrucosa', 'Bouleau Blanc', '', '', '', '', '', '', '', '', '15 cm', '1 L', false, 1, 10, 40.30, 2, 1, 3, 1, 2, 3, 2),
  ('Ribes nigrum', 'Cassis', 'Le Cassissier aussi appelé "Groseillier Noir" est originaire du Nord de l''Europe et de l''Asie...', 'Le Cassissier est un arbuste ou arbrisseau touffu et odorant...', '120 cm.', '120 cm.', 'Grossulariaceae', 'Nord, Est et Centre de l''Europe.', 'Rouge foncé', 'Vert foncé', '15 cm', '1 L', false, 2, 10, 0.00, 2, 1, 3, 1, 2, 3, 2),
  ('CITRUS limon Lunario sur P.trifoliata', 'Citronnier 4 saisons', 'Citronnier 4 saisons, Lunari ou Lunario est un magnifique agrume qui doit son nom au fait qu’il porte fleurs et fruits durant les quatre saisons...', '', '', '', '', '', '', '', '105 cm', '10 L', false, 9, 10, 22.85, 2, 1, 3, 1, 2, 3, 2);


INSERT INTO "user" (
  "first_name",
  "last_name",
  "email",
  "password",
  "role"  
)
--password: pepine
VALUES
('admin', 'pepine','pepine@gamil.com', '$2y$10$ULFF1qvgWT4BSMLGoCvbC.r8BZP9uU1OfoV6mY7PwgQiNHoSzruNe', 'admin'),
('Nicolas','Brival','nb@gamil.com', '$2y$10$ULFF1qvgWT4BSMLGoCvbC.r8BZP9uU1OfoV6mY7PwgQiNHoSzruNa', 'user'),
('Pierrick','Alemany','pa@gamil.com', '$2y$10$ULFF1qvgWT4BSMLGoCvbC.r8BZP9uU1OfoV6mY7PwgQiNHoSzruNz', 'user'),
('Vincent','Trahin','vt@gamil.com', '$2y$10$ULFF1qvgWT4BSMLGoCvbC.r8BZP9uU1OfoV6mY7PwgQiNHoSzruNr', 'user'),
('Laurent','Bétoin','lb@gamil.com', '$2y$10$ULFF1qvgWT4BSMLGoCvbC.r8BZP9uU1OfoV6mY7PwgQiNHoSzruNt', 'user'),
('Fernando','Ituarte Springer','fis@gamil.com', '$2y$10$ULFF1qvgWT4BSMLGoCvbC.r8BZP9uU1OfoV6mY7PwgQiNHoSzruNy', 'user');


INSERT INTO "order"(
  "reference",
  "first_name_order",
  "last_name_order",
  "total_price",
  "statut",
  "user_id"
)
VALUES
('000001', 'Nicolas','Brival', 45, 'retirée', 2),
('000002', 'Pierrick','Alemany', 28, 'en cours', 3),
('000003', 'Vincent','Trahin', 19, 'en cours', 4),
('000004', 'Laurent','Bétoin', 71, 'validée', 5),
('000005', 'Fernando','Ituarte Springer', 13, 'finalisée', 6);


INSERT INTO "order_has_product"(
  "product_id",
  "order_id",
  "quantity",
  "price_time_order",
  "subtotal_price"
)
VALUES
(1, 1, 5, 45, 9),
(2, 2, 4, 28, 7),
(3, 3, 5, 19, 3.8),
(4, 4, 4, 71, 17.75),
(5, 5, 1, 13, 13);


INSERT INTO "product_has_media" ("product_id", "media_id", "order")
VALUES (1,1,1),
       (2,2,1),
       (3,3,1),
       (4,4,1),
       (5,5,1),
       (6,6,1),
       (7,7,1),
       (2,1,2),
       (3,4,2),
       (4,5,2),
       (5,6,3),
       (6,4,2),
       (7,7,1),
       (8,8,1);


INSERT INTO "product_has_category" ("product_id", "category_id")
VALUES (1,2),
       (2,1),
       (3,3),
       (1,2),
       (4,2),
       (8,4),
       (7,3),
       (5,2),
       (8,1),
       (6,2);


INSERT INTO "user_has_product" ("product_id", "user_id")
VALUES (1,1),
       (2,1),
       (3,1),
       (4,1),
       (5,1),
       (6,1),
       (7,1),
       (8,1);

COMMIT;
