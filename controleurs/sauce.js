const Sauce = require('../modeles/sauce.js');
const sythemeFichier = require('fs');

// création d'une Sauce
exports.creationSauce = (req, res, next) => {
  const objetSauce = JSON.parse(req.body.thing);
  delete objetSauce._id;
  const sauce = new Sauce({
    ...objetSauce,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// modification d'une Sauce
exports.modificationSauce = (req, res, next) => {
  const objetSauce = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };  
  Sauce.modificationUn({ _id: req.params.id }, { ...objetSauce, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

// Suppression d'une Sauce
exports.supressionSauce = (req, res, next) => {
  Sauce.trouveUn({ _id: req.params.id })
    .then(sauce => {
      const filename = Sauce.imageUrl.split('/images/')[1];
      sythemeFichier.unlink(`images/${filename}`, () => {
        sauce.suppressionUn({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Envoi d'une Sauce
exports.envoiUneSauce = (req, res, next) => {
  Sauce.trouveUn({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

// Envoi de toutes les Sauces
exports.envoiToutesSauces = (req, res, next) => {
  Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};