const express = require('express');
const mongoose = require('mongoose');
const chemin = require('path');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

// Sécurité : il nettoie les entrées utilisateur provenant du corps de la requête
const xssClean = require('xss-clean');
const clean = require('xss-clean/lib/xss').clean 
const cleaned = clean('<script></script>')

const saucesRouteurs = require('./routeurs/sauces.js');
const utilisateurRouteurs = require('./routeurs/utilisateurs.js');


// Connection à la base de donnée
require('dotenv').config();
const mongoDB = process.env.DB_mongoDB;

mongoose.connect(mongoDB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Echange avec le serveur
const appliExpress = express();

appliExpress.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

appliExpress.use(express.json());

appliExpress.use(helmet()); // Sécurité : il définit des en-têtes de réponse HTTP
appliExpress.use(hpp()); // Sécurité : il évite les attaques de pollution des paramètres HTTP
appliExpress.use(mongoSanitize());  // Sécurité : il remplace les caractères interdits par un autre caractère autorisé


appliExpress.use('/images', express.static(chemin.join(__dirname, 'images')));

appliExpress.use('/api/sauces', saucesRouteurs);
appliExpress.use('/api/auth', utilisateurRouteurs);

module.exports = appliExpress;