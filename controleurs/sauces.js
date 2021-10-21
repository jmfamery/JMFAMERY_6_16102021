const Sauces = require('../modeles/sauces.js');
const sythemeFichier = require('fs');
const sauces = require('../modeles/sauces.js');

// création d'une Sauce
exports.creationSauce = (req, res, next) => {
  const objetSauce = JSON.parse(req.body.sauce);
  delete objetSauce._id;
  const sauce = new Sauces({
    ...objetSauce,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => {
      res.status(400).json({ message: error });
    });
};

// modification d'une Sauce
exports.modificationSauce = (req, res, next) => {
  const objetSauce = req.file ?
  { 
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauces.updateOne({ _id: req.params.id }, { ...objetSauce, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ message: error }));
};

// Suppression d'une Sauce
exports.supressionSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })  
    .then(Sauces => {
      const filename = Sauces.imageUrl.split('/images/')[1];
      sythemeFichier.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ message: error }));
      });
    })
    .catch(error => res.status(500).json({ message: error })); 
};

// Envoi d'une Sauce
exports.envoiUneSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ message: error }));
};

// Envoi de toutes les Sauces
exports.envoiToutesSauces = (req, res, next) => {
  Sauces.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ message: error }));
};