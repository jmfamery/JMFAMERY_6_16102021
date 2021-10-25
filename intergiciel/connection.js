const connectionLimite = require("express-rate-limit");

// Limiter le temps et le nombre de connection
const limiteConnection = connectionLimite({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 3, // 3 fois
});

module.exports = {limiteConnection}