const express = require('express');
const mongoose = require('mongoose');
const chemin = require('path');

const saucesRouteurs = require('./routeurs/sauces.js');
const utilisateurRouteurs = require('./routeurs/utilisateurs.js');

// Connection à la base de donnée
mongoose.connect('mongodb+srv://piiquante:7acYuuceHJs876Kj@cluster0.fviow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Echange avec seveur
const appliExpress = express();

appliExpress.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

appliExpress.use(express.json());

appliExpress.use('/images', express.static(chemin.join(__dirname, 'images')));

appliExpress.use('/api/sauces', saucesRouteurs);
appliExpress.use('/api/auth', utilisateurRouteurs);

module.exports = appliExpress;