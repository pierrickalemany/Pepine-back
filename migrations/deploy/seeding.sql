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
VALUES ('Aromates et Médicinales', 'Découvrez notre collection exquise d''aromates et de plantes médicinales, cultivées avec soin pour éveiller vos sens. Chaque brin, chaque feuille est une invitation à explorer un monde de saveurs pures et de vertus thérapeutiques ancestrales. De la vivifiante menthe au thym robuste, enrichissez votre palette culinaire et votre pharmacopée naturelle avec nos trésors botaniques.'),
       ('Fruitiers', 'Nos arbres fruitiers sont les gardiens d''un paradis perdu, offrant à chaque saison une abondance de délices juteux et sucrés. Ils sont l''incarnation de la générosité de la nature, avec des branches chargées de promesses et des fruits qui captent l''essence même du soleil. Plongez dans la splendeur de la nature et cueillez le fruit de la vie dans notre verger d''abondance.'),
       ('Agrumes', 'Parcourez notre enceinte parfumée où les agrumes règnent en maîtres, composant une symphonie de parfums et de saveurs. Chaque agrume, du citron pétillant à l''orange douce, est une note vibrante dans ce concert de fraîcheur. Laissez la fragrance enivrante des zestes et la pulpe gorgée de soleil éveiller vos papilles et raviver votre esprit.'),
       ('Plantes équines', 'Bienvenue dans un sanctuaire dédié à la santé et au bien-être de vos compagnons équins. Notre collection spéciale de plantes équines est conçue pour offrir non seulement une nutrition optimale, mais aussi pour répondre aux besoins thérapeutiques de ces nobles créatures. Chaque plante est sélectionnée pour ses propriétés bénéfiques, assurant force et vitalité pour les chevaux qui parcourent ces prairies verdoyantes.'),
       ('Fleuries/Ornementales', 'Explorez notre sélection enchanteresse de plantes fleuries et ornementales, conçues pour égayer vos jardins et vos espaces extérieurs. Chaque fleur est une œuvre d''art vivante, offrant une symphonie de couleurs et de parfums qui réveillent les sens et apportent une touche de beauté éternelle à votre environnement. Laissez-vous envoûter par la magie florale et créez des paysages enchanteurs.'),
       ('Plants Potagers', 'Plongez dans l''univers fertile de nos plants potagers, où chaque pouce de terre est une promesse de récolte abondante et savoureuse. Nos plants potagers sont le point de départ de votre propre jardin d''abondance, offrant une gamme diversifiée de légumes et d''herbes fraîches pour nourrir votre famille et enrichir votre cuisine. Cultivez votre propre nourriture et découvrez le plaisir de manger de la terre à la table.');
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
VALUES ('Faible'),
       ('Moyen'),
       ('Fort');
       

INSERT INTO "hardiness_zone" ("value")
VALUES ('Zone 1a : -51,1 à -48,3°C'),
       ('Zone 1b : -48,3 à -45,6°C'),
       ('Zone 2a : -45,6 à -42,8°C'),
       ('Zone 2b : -42,8 à -40°C'),
       ('Zone 3a : -40 à -37,2°C'),
       ('Zone 3b : -37,2 à -34,4°C'),
       ('Zone 4a : -34,4 à -31,7°C'),
       ('Zone 4b : -31,7 à -28,9°C'),
       ('Zone 5a : -28,9 à -26,1°C'),
       ('Zone 5b : -26,1 à -23,3°C'),
       ('Zone 6a : -23,3 à -20,6°C'),
       ('Zone 6b : -20,6 à -17,8°C'),
       ('Zone 7a : -17,8 à -15°C'),
       ('Zone 7b : -15 à -12,2°C'),
       ('Zone 8a : -12,2 à -9,4°C'),
       ('Zone 8b : -9,4 à -6,7°C'),
       ('Zone 9a : -6,7 à -3,9°C'),
       ('Zone 9b : -3,9 à -1,1°C'),
       ('Zone 10a : -1,1 à 1,7°C'),
       ('Zone 10b : 1,7 à 4,4°C'),
       ('Zone 11a : 4,4 à 7,2°C'),
       ('Zone 11b : 7,2 à 10°C'),
       ('Zone 12a : 10 à 12,8°C'),
       ('Zone 12b : 12,8 à 15,6°C'),
       ('Zone 13a : 15,6 à 18,3°C'),
       ('Zone 13b : 18,3 à 21,1°C');
       

INSERT INTO "yield" ("value")
VALUES ('Correct'),
       ('Bon'),
       ('Très bon'),
       ('Excellent');


INSERT INTO "media" ("url", "name")

VALUES  ('https://i.postimg.cc/9MNdbXwM/Ciboulette.jpg', 'Ciboulette_1'),
    ('https://i.postimg.cc/QC9pyLcq/Ciboulette-2.jpg', 'Ciboulette_2'),
    ('https://i.postimg.cc/Vvxjy7RP/Ciboulette-3.jpg', 'Ciboulette_3'),
    ('https://i.postimg.cc/nrBk0j8k/Arboursier.jpg', 'Abrousier_1'),
    ('https://i.postimg.cc/rmvj1GHs/Arboursier-2.jpg', 'Abrousier_2'),
    ('https://i.postimg.cc/vB1Xx23C/Arboursier-3.jpg', 'Abrousier_3'),
    ('https://i.postimg.cc/QN1JLTPg/Estragon.jpg', 'Estragon_1'),
    ('https://i.postimg.cc/Rh77wkfp/Estragon-2.jpg', 'Estragon_2'),
    ('https://i.postimg.cc/nrbKjFsQ/Estragon-3.jpg', 'Estragon_3'),
    ('https://i.postimg.cc/fTMX6gYZ/Basilic.jpg', 'Basilic_1'),
    ('https://i.postimg.cc/HWwXvCcB/Basilic-2.jpg', 'Basilic_2'),
    ('https://i.postimg.cc/Hng5W6Kw/Basilic-3.jpg', 'Basilic_3'),
    ('https://i.postimg.cc/vB3MDB20/Batavia.jpg', 'Batavia_1'),
    ('https://i.postimg.cc/1t9s96Bg/Batavia-2.jpg', 'Batavia_2'),
    ('https://i.postimg.cc/PqbdsKWs/Batavia-3.jpg', 'Batavia_3'),
    ('https://i.postimg.cc/zX9Ny4pY/Bouleau-blanc.jpg', 'Bouleau_blanc_1'),
    ('https://i.postimg.cc/YCYHY8yG/Bouleau-blanc-2.jpg', 'Bouleau_blanc_2'),
    ('https://i.postimg.cc/026x29YC/Bouleau-blanc-3.jpg', 'Bouleau_blanc_3'),
    ('https://i.postimg.cc/FHjM7z70/Cassis.jpg', 'Cassis_1'),
    ('https://i.postimg.cc/g2F9z8kY/Cassis-2.jpg', 'Cassis_2'),
    ('https://i.postimg.cc/kXt3PfC1/Cassis-3.jpg', 'Cassis_3'),
    ('https://i.postimg.cc/G363DBhf/Citronnier.jpg', 'Citronnier_1'),
    ('https://i.postimg.cc/fTXzfwVR/Citronnier-2.jpg', 'Citronnier_2'),
    ('https://i.postimg.cc/FFYs1bmc/Citronnier-3.jpg', 'Citronnier_3');


INSERT INTO "user" (
  "first_name",
  "last_name",
  "phone",
  "email",
  "password",
  "role"  
)
--password: Pepine12345*
VALUES
('super', 'pepine', '0645856548', 'pepine@gmail.com', '$2b$10$4lYsmzO8xXfUYtNkawBBBOViLqQUldkXoFAoZkFDlss8yYDJZTCmK', 'admin'),
('Nicolas','Brival', '0645856548', 'nb@gmail.com', '$2y$10$ULFF1qvgWT4BSMLGoCvbC.r8BZP9uU1OfoV6mY7PwgQiNHoSzruNa', 'user'),
('Pierrick','Alemany', '0645856548', 'pa@gmail.com', '$2y$10$ULFF1qvgWT4BSMLGoCvbC.r8BZP9uU1OfoV6mY7PwgQiNHoSzruNz', 'user'),
('Vincent','Trahin', '0645856548', 'vt@gmail.com', '$2y$10$ULFF1qvgWT4BSMLGoCvbC.r8BZP9uU1OfoV6mY7PwgQiNHoSzruNr', 'user'),
('Laurent','Bétoin', '0645856548', 'lb@gmail.com', '$2y$10$ULFF1qvgWT4BSMLGoCvbC.r8BZP9uU1OfoV6mY7PwgQiNHoSzruNt', 'user'),
('Fernando','Ituarte Springer', '0645856548', 'fis@gmail.com', '$2y$10$ULFF1qvgWT4BSMLGoCvbC.r8BZP9uU1OfoV6mY7PwgQiNHoSzruNy', 'user');

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
  "status",
  "stock",
  "vat",
  "price",
  "user_id",
  "yield_id",
  "hardiness_zone_id",
  "water_requirement_id", 
  "exposure_id",
  "ground_cover_power_id", 
  "strate_id", 
  "foliage_id" 
)
VALUES
  ('Allium schoenoprasum', 'Ciboulette', 'En été, les tiges creuses, dressées et odorantes de la ciboulette portent jusqu''à 20 fleurs violet clair ou roses disposées en ombelle dense et pouvant atteindre jusqu''à 5 cm d''envergure. Allium schoenoprasum est une plante vivace bulbeuse, comestible (tiges et fleurs), facile à vivre, utilisée comme condiment. Il est toutefois préférable de couper les fleurs avant qu''elles ne montent en graines...', 'Vivace culinaire, rustique, offrant des tiges fines et aromatiques. Hauteur de 30 cm, préfère les sols riches et bien drainés, exposition ensoleillée ou mi-ombre.', '30-50 cm', '30 cm', 'Amaryllidaceae', 'Europe, Asie', 'Mauve pâle', 'Vert', '15 cm', '1 L', false, 15, 10, 2.60, 1, 2, 1, 3, 1, 2, 3, 2),
  ('Arbutus unedo', 'Arbousier', 'L''arbousier est un spectacle à lui seul, arborant fièrement ses fruits ressemblants à des baies et son écorce rougeâtre peinte par le temps. Ses fruits comestibles, semblables à des fraises, mûrissent à l''automne et offrent une saveur subtilement acidulée qui ravira les amateurs de douceurs forestières.', 'Arbre ornemental persistant, résistant jusqu''à -10°C. Produit des fleurs blanches et des fruits rouges comestibles. Hauteur jusqu''à 8 m, nécessite un sol acide et une exposition ensoleillée.', '5-10 m', '4-8 m', 'Ericaceae', 'Méditerranée, Europe occidentale', 'Blanc', 'Vert foncé', '150 cm', '15 L', false, 3, 10, 18.20, 1, 2, 1, 3, 1, 2, 3, 2),
  ('Artemisia dracunculus', 'Estragon', 'Cette vivace condimentaire, odorante, s''utilise fraiche ou sèche pour aromatiser sauces, plats, salades ou conserves au vinaigre. Les feuilles aiguës sont disposées le long de fines tiges dressées. Des panicules de petites fleurs vert jaune apparaissent dans le courant de l''été. Les graines sont stériles...', 'Herbe vivace aromatique, essentielle pour la cuisine française. Hauteur de 60 cm, prospère en plein soleil, dans un sol léger et bien drainé. Saveur anisée distinctive.', '60-120 cm', '30-60 cm', 'Asteraceae', 'Asie du nord-ouest, Amérique du Nord', 'Vert jaunâtre', 'Vert foncé', '15 cm', '1 L', false, 5, 10, 1.64, 1, 2, 1, 3, 1, 2, 3, 2),
  ('Ocimum basilicum', 'Basilic', 'Le basilic est le joyau de la couronne méditerranéenne. Ses feuilles vert tendre libèrent un arôme chaud et poivré qui se mêle parfaitement aux tomates juteuses et au fromage mozzarella fondant. Emblématique du pesto, il évoque les douces soirées d''été et les repas conviviaux en terrasse.', 'Annuelle aromatique prisée pour ses feuilles parfumées. Hauteur de 30-45 cm, exige une exposition chaude et ensoleillée et un arrosage régulier. Sensible au froid.', '30-60 cm', '30-45 cm', 'Lamiaceae', 'Asie tropicale, Afrique', 'Blanc', 'Vert vif', '105 cm', '10 L', false, 0, 10, 0.00, 1, 2, 1, 3, 1, 2, 3, 2),
  ('Lactuca sativa var. capitata', 'Batavia', 'La laitue Batavia, avec ses feuilles frisées et gorgées d''eau, est une explosion de croquant. Sa texture beurrée et son goût légèrement sucré en font la base idéale pour des salades créatives, pleines de vitalité et de fraîcheur.', 'Laitue croquante avec des feuilles ondulées. Tolère mieux la chaleur que d''autres variétés. Préfère une exposition ensoleillée à mi-ombre et un sol riche en matière organique.', '15-30 cm', '25-30 cm', 'Asteraceae', 'Europe, Asie', 'Jaune', 'Vert clair à vert foncé', '20 cm', '3 L', false, 100, 100, 0.00, 1, 2, 1, 3, 1, 2, 3, 2),
  ('Betula pendula', 'Bouleau Blanc', 'Le bouleau blanc est un poème vivant, avec son écorce blanche qui se détache en bandes comme des parchemins de la forêt. Il est non seulement un ajout esthétique à tout paysage, mais ses feuilles d''un vert lumineux filtrent le soleil pour créer un havre de paix sous sa canopée.', 'Arbre caduc au port élancé et à l''écorce blanche distinctive. Résiste jusqu''à -30°C. Atteint 15-20 m en hauteur, nécessite un sol bien drainé et une exposition ensoleillée à mi-ombre.', '15-25 m', '5-10 m', 'Betulaceae', 'Europe, Asie', 'Jaune', 'Vert vif', '15 cm', '1 L', false, 1, 10, 40.30, 1, 2, 1, 3, 1, 2, 3, 2),
  ('Ribes nigrum', 'Cassis', 'Les grappes de cassis, denses et sombres, sont des capsules de saveurs intenses. Leur goût riche et leur acidité équilibrée font des confitures, des gelées et des sirops des créations divines. Cultivez-les pour découvrir le vrai goût des fruits chargés d''histoire et de bienfaits.', 'Arbuste fruitier rustique, autofertile, produisant des baies noires riches en vitamine C. Hauteur de 1.5 m, préfère un sol humide et une exposition partielle à l''ombre.', '1-1.5 m', '1-1.5 m', 'Grossulariaceae', 'Europe tempérée, Asie du nord', 'Rose, parfois blanc', 'Vert foncé', '15 cm', '1 L', false, 2, 10, 0.00, 1, 2, 1, 3, 1, 2, 3, 2),
	('Citrus limon', 'Citronnier 4 saisons', 'Le citronnier 4 saisons est un trésor d''agrumiculture, offrant des citrons toute l''année. Chaque fruit est une boule de soleil capturée, prête à libérer son jus vibrant pour relever vos plats, vos boissons ou simplement pour une touche de vitamine C quotidienne. Son feuillage persistant et parfumé ajoute une touche de verdure permanente à votre jardin.', 'Agrume à fructification continue produisant des citrons toute l''année. Hauteur de 3-5 m. Nécessite une protection contre le gel, un sol bien drainé et une exposition ensoleillée.', '3-5 m', '3-4 m', 'Rutaceae', 'Asie du Sud', 'Blanc', 'Vert foncé', '105 cm', '10 L', false, 9, 10, 22.85, 1, 2, 1, 3, 1, 2, 3, 2);

INSERT INTO "order"(
  "reference",
  "first_name_order",
  "last_name_order",
  "total_price",
  "status",
  "user_id"
)
VALUES
  ('000001', 'Nicolas','Brival', 45, 'retirée', 2),
  ('000002', 'Pierrick','Alemany', 28, 'en cours', 3),
  ('000003', 'Vincent','Trahin', 19, 'en cours', 4),
  ('000004', 'Laurent','Bétoin', 71, 'validée', 5),
  ('000005', 'Fernando','Ituarte Springer', 13, 'finalisée', 6),
	('000006', 'Vincent', 'Trahin', 36, 'retirée', 4),
	('000007', 'Vincent', 'Trahin', 150, 'validée', 4),
	('000008', 'Nicolas', 'Brival', 125, 'validée', 2),
	('000009', 'Nicolas', 'Brival', 38, 'finalisée', 2),
	('000010', 'Pierrick', 'Alemany', 250, 'finalisée', 3),
	('000011', 'Pierrick', 'Alemany', 8, 'finalisée', 3),
	('000012', 'Laurent', 'Bétoin', 150, 'en cours', 5),
	('000013', 'Laurent', 'Bétoin', 150, 'en cours', 5),
	('000014', 'Fernando', 'Ituarte Springer', 120, 'finalisée', 6),
	('000015', 'Fernando', 'Ituarte Springer', 654, 'en cours', 6),
	('000016', 'Fernando', 'Ituarte Springer', 487, 'en cours', 6),
	('000017', 'Fernando', 'Ituarte Springer', 2, 'finalisée', 6),
	('000018', 'Fernando', 'Ituarte Springer', 1, 'finalisée', 6),
	('000019', 'Fernando', 'Ituarte Springer', 456, 'finalisée', 6);


INSERT INTO "order_has_product"(
  "product_id",
  "order_id",
  "quantity",
  "price_time_order",
  "vat"
)
VALUES
  (1, 1, 5, 45, 5),
	(2, 2, 4, 28, 5),
	(3, 3, 5, 19, 5),
	(4, 4, 4, 71, 10),
	(5, 5, 1, 13, 10),
	(1, 6, 5, 45, 5),
	(2, 7, 4, 28, 5),
	(3, 8, 5, 19, 5),
	(4, 9, 4, 71, 10),
	(5, 10, 1, 13, 10),
	(1, 11, 5, 45, 5),
	(2, 12, 4, 28, 5),
	(3, 13, 5, 19, 5),
	(4, 14, 4, 71, 10),
	(5, 15, 1, 13, 10),
	(1, 16, 5, 45, 5),
	(2, 17, 4, 28, 5),
	(3, 18, 5, 19, 5),
	(4, 19, 4, 71, 10);

INSERT INTO "product_has_media" ("product_id", "media_id", "order")
VALUES (1, 1, 1),
	(1, 2, 2),
	(1, 3, 3),
	(2, 4, 1),
	(2, 5, 2),
	(2, 6, 3),
	(3, 7, 1),
	(3, 8, 2),
	(3, 9, 3),
	(4, 10, 1),
	(4, 11, 2),
	(4, 12, 3),
	(5, 13, 1),
	(5, 14, 2),
	(5, 15, 3),
	(6, 16, 1),
	(6, 17, 2),
	(6, 18, 3),
	(7, 19, 1),
	(7, 20, 2),
	(7, 21, 3),
	(8, 22, 1),
	(8, 23, 2),
	(8, 24, 3);


INSERT INTO "product_has_category" ("product_id", "category_id")
VALUES (1,2),
       (2,1),
       (3,3),
       (1,4),
       (4,2),
       (8,4),
       (7,3),
       (5,2),
       (8,1),
       (6,2);

COMMIT;