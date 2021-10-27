const authentification = require('jsonwebtoken');
require('dotenv').config();
const codeSecurite = process.env.cleSecurite;

// authentification de l'utilisateur
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoderToken = authentification.verify(token, codeSecurite);
    req.utilisateurId = decoderToken.utilisateurId;
    if (!req.utilisateurId) {
      throw 'Utilisateur ID non valable !';
    } 
    next();
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée !'});
  }
};