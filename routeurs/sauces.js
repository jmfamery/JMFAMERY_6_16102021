const express = require('express');
const routeur = express.Router();

const authentification = require('../intergiciel/authentification.js');
const telechargement = require('../intergiciel/telechargement.js');

const SaucesCtrl = require('../controleurs/sauces.js');

// Routeur d'enregistrement de la Sauce
routeur.post('/', authentification, telechargement, SaucesCtrl.creationSauce);
routeur.put('/:id', authentification, telechargement, SaucesCtrl.modificationSauce);
routeur.delete('/:id', authentification, SaucesCtrl.supressionSauce);
routeur.get('/:id', authentification, SaucesCtrl.envoiUneSauce);
routeur.get('/', authentification, SaucesCtrl.envoiToutesSauces);

module.exports = routeur;