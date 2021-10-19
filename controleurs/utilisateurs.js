const cryptage = require('bcrypt');
const authentification = require('jsonwebtoken');

const Utilisateur = require('../modeles/utilisateurs.js');

// Création d'un utilisateur
exports.signup = (req, res, next) => {
    cryptage.hash(req.body.password, 10)
      .then(hash => {
        const utilisateur = new Utilisateur({
          email: req.body.email,
          password: hash
        });
        utilisateur.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// contrôle d'accès d'un utilisateur
exports.login = (req, res, next) => {
  Utilisateur.findOne({ email: req.body.email })
    .then(utilisateur => {
      if (!utilisateur) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      cryptage.compare(req.body.password, utilisateur.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            utilisateurId: utilisateur._id,
            token: authentification.sign(
              { utilisateurId: utilisateur._id },
              'p1I6i-1q0U-2a0n2T1e',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};