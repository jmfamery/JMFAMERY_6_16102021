const express = require('express');
const routeur = express.Router();

const auth = require('../intergiciel/authentification.js');
const multer = require('../intergiciel/telechargement.js');

const SauceCtrl = require('../controleurs/sauce.js');

// Routeur d'enregistrement de la Sauce
routeur.post('/', auth, multer, SauceCtrl.creationSauce);
routeur.put('/:id', auth, multer, SauceCtrl.modificationSauce);
routeur.delete('/:id', auth, SauceCtrl.supressionSauce);
routeur.get('/:id', auth, SauceCtrl.envoiUneSauce);
routeur.get('/', auth, SauceCtrl.envoiToutesSauces);

module.exports = routeur;