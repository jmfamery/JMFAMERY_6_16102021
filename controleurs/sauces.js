const Sauces = require('../modeles/sauces.js');
const sythemeFichier = require('fs');
const { json } = require('body-parser');

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
  // suppression ancienne image
  Sauces.findOne({ _id: req.params.id })  
  .then(Sauces => {
    const filename = Sauces.imageUrl.split('/images/')[1];
    sythemeFichier.unlink(`images/${filename}`, function (erreur) {
        if (erreur) {
          console.log('Ancienne image non supprimée')
        } {
          console.log('Ancienne image supprimée')}
    })
  });

  // modification
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

// Notation de la Sauce (like & Dislike)
exports.noteSauce = (req, res, next) => {
  if (req.body.like === 1) {
    Sauces.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
      .then((sauce) => res.status(200).json({ message: 'Ajout Like' }))
      .catch(error => res.status(400).json({ message: error }))
  } if (req.body.like === -1) {
    Sauces.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
      .then((sauce) => res.status(200).json({ message: 'Ajout Dislike' }))
      .catch(error => res.status(400).json({ message: error }))
    } {
      Sauces.findOne({ _id: req.params.id })
        .then(sauce => {
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauces.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
              .then((sauce) => { res.status(200).json({ message: 'Suppression Like' }) })
              .catch(error => res.status(400).json({ message: error }))
          } if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauces.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
              .then((sauce) => { res.status(200).json({ message: 'Suppression Dislike' }) })
              .catch(error => res.status(400).json({ message: error }))
            }
        })
        .catch(error => res.status(400).json({ message: error }))
    }
};