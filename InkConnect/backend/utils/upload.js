const cloudinary = require('../config/cloudinary');

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'inkconnect_portfolios',
    });
    return result.secure_url;
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    throw err;
  }
};

module.exports = { uploadImage };
