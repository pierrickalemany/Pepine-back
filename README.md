# projet-05-pepine-back

## Description

API backend pour la gestion des produits, utilisateurs et catégories d'une pépinière.

## Technologies

- Node.js
- Express
- PostgreSQL
- Dotenv
- Nodemon
- bcrypt
- cors

## Installation
- Cloner ou télécharger le projet depuis son dépôt GitHub
- Naviguez vers le répertoire du projet.
- Créer de la BDD : createdb pepine
- Installer des package : `npm i`
- Créer du fichier ".env" sur la base de ".env.example"
- Créer du fichier ".sqitch.conf" sur la base de "..sqitch.example.conf"
- Déployer les migrations : sqitch deploy / re-déploiyer les migrations : `resetdb` (script)
- Lancer l'app. : `npm run dev` (script)

## Configuration

- Installez **PostgreSQL** et créez une base de données nommé **pepine** .
- Dupliquez le fichier **.env.example** et renommez-le **.env** et modifiez les variables suivantes suivant votre configuration :
  
  - `PGHOST=localhost`
  - `PGPORT=5432`
  - `PGDATABASE=pepine`
  - `PGUSER=username`
  - `PGPASSWORD=password`

- Dupliquez le fichier **.sqitch.conf** à la racine du dossier et ajoutez les variables en suivant le fichier **sqitch.example.conf**.
- Exécutez `sqitch deploy` pour créer la base de données et les tables.
- Exécutez `npm run dev` pour lancer le serveur de développement.
- Le serveur doit fonctionner sur localhost avec le port par défaut 3000. Si le serveur fonctionne sur un autre port pour une raison quelconque, cela est affiché dans la console lors du démarrage du serveur, par exemple : Listening on port 3001.

## Utilisation

**Route disponible:**

**/products/** = create ok + get ok (table product)

**/products/:id** = get ok + patch ok (table product)

**/products/media** = create ok (table media)

**/products/:id/media** = patch ok (table media)

**/products/media/order** = create ok (table product_has_media)

**/products/category** = create ok (table product_has_category)

**/products/:id/categories** = patch ok (table product_has_category)

**/users/** = create ok (table user)

**/users/:id** = patch ok (table user)

**/orders/** = create ok (table order)

**/orders/details** = create ok (table order_has_product)

**/orders/:id/update-status** = patch ok (table order)
