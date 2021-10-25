const express = require('express');
const routeur = express.Router();

const utilisateurCtrl = require('../controleurs/utilisateurs.js');
const maximum = require('../intergiciel/connection.js');

// Routeur sur la gestion de l'utilisateur
routeur.post('/signup', utilisateurCtrl.signup);
routeur.post('/login', maximum.limiteConnection , utilisateurCtrl.login);

module.exports = routeur;