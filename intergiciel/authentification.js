const authentification = require('jsonwebtoken');

// authentification de l'utilisateur
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoderToken = authentification.verify(token, 'p1I6i-1q0U-2a0n2T1e');
    const utilisateurId = decoderToken.utilisateurId;
    if (req.body.utilisateurId && req.body.utilisateurId !== utilisateurId) {
      throw 'Utilisateur ID non valable !';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée !'});
  }
};