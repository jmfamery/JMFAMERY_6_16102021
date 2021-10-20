const mongoose = require('mongoose');

// modéle de la base Sauce
const saucesSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true},
  heat: { type: Number },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String], required: true},
  usersDisliked: { type: [String], required: true}
});

module.exports = mongoose.model('Sauces', saucesSchema);