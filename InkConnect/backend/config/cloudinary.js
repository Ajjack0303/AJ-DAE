const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'douzk1cyx',
  api_key: process.env.CLOUDINARY_API_KEY || '521374962772523',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'emtSs8Wv6EklRqGoXnzSpdLKUUo',
});

module.exports = cloudinary;
