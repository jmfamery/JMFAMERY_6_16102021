const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://piiquante:7acYuuceHJs876Kj@cluster0.fviow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const appliExpress = express();

appliExpress.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

appliExpress.use((req, res, next) => {
  res.status(201);
  next();
});

appliExpress.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

appliExpress.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = appliExpress;