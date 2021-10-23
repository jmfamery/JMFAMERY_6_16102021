const express = require('express');
const routeur = express.Router();

const utilisateurCtrl = require('../controleurs/utilisateurs.js');

// Routeur sur la gestion de l'utilisateur
routeur.post('/signup', utilisateurCtrl.signup);
routeur.post('/login', utilisateurCtrl.login);

module.exports = routeur;