const bcrypt = require('bcrypt');

(async () => {
  try {
    const hash = await bcrypt.hash('123', 10); // replace '123' with your desired password
    console.log('Hashed password:', hash);
  } catch (err) {
    console.error('Error hashing password:', err);
  }
})();
