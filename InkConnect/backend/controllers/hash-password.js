const bcrypt = require('bcrypt');

(async () => {
  const hash = await bcrypt.hash('123', 10); // '123' is your test password
  console.log('Hashed password:', hash);
})();
