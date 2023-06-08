const jwt = require('jsonwebtoken');
function generateToken(userId, secretKey) {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    return token;
  }
  module.exports = { generateToken };
  