const mongoose = require('mongoose');

// modéle de la base Sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrel: { type: String, required: true},
  heat: { type: Number, required: true},
  likes: { type: Number, required: true},
  dislikes: { type: Number, required: true},
  usersLikded: { type: String, required: true},
  usersDisliked: { type: String, required: true}
});

module.exports = mongoose.model('Thing', sauceSchema);