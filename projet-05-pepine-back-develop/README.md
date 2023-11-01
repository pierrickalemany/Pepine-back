# projet-05-pepine-back

## Description

createdb pepine
npm i
.env
.sqitch.conf
sqitch deploy

API backend pour la gestion des produits, utilisateurs et catégories.

## Technologies

- Node.js
- Express
- PostgreSQL
- Sequelize
- Dotenv
- Nodemon
- bcrypt


## Installation

- Clonez ou téléchargez le projet depuis son dépôt GitHub.
- Naviguez vers le répertoire du projet.
- Exécutez 'npm install' pour installer les modules node nécessaires.

## Configuration

- Installez PostgreSQL et créez une base de données.
- Dupliquez le fichier .env.example et renommez-le .env et ajoutez les variables suivantes :
  - DB_USER = votre nom d'utilisateur PostgreSQL
  - DB_PASS = votre mot de passe PostgreSQL
  - DB_NAME = le nom de la base de données
  - DB_HOST = localhost
- Dupliquez le fichier .sqitch.conf à la racine du dossier et ajoutez les variables en suivant le fichier sqitch.example.conf.
- Exécutez 'sqitch deploy' pour créer la base de données et les tables.
- Exécutez 'npm run dev' pour lancer le serveur de développement.
- Le serveur doit fonctionner sur localhost avec le port par défaut 3000. Si le serveur fonctionne sur un autre port pour une raison quelconque, cela est affiché dans la console lors du démarrage du serveur, par exemple : Listening on port 3001.

## Utilisation
