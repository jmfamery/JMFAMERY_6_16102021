const telechargement = require('multer');

// Telechargement des images
const typeFormat = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const sauvegarde = telechargement.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const nom = file.originalname.split(' ').join('_');
    const extension = typeFormat[file.mimetype];
    callback(null, nom + Date.now() + '.' + extension);
  }
});

module.exports = telechargement({storage: sauvegarde}).single('image');