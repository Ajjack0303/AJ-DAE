const jwt = require('jsonwebtoken');
require('dotenv').config();

// Example user payload
const user = {
  user_id: 1,     
  username: 'alice',
  role: 'artist',
};

const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
console.log(token);
