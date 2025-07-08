
const crypto = require('node:crypto');

module.exports = function(secret, opts) {
  return function(req, res, next) {
    req.cookies = {}; // Placeholder for parsed cookies

    // Decryption logic
    if (opts.encrypt) {
      for (const key in req.cookies) {
        const val = req.cookies[key];
        if (val.startsWith('e:')) {
          try {
            const [iv, encrypted] = val.substring(2).split('.');
            const decipher = crypto.createDecipheriv(opts.encryptionOptions.algorithm || 'aes-256-gcm', opts.encryptionOptions.secret, Buffer.from(iv, 'base64'));
            let decrypted = decipher.update(encrypted, 'base64', 'utf8');
            decrypted += decipher.final('utf8');
            req.cookies[key] = decrypted;
          } catch (err) {
            console.error('Error decrypting cookie:', err);
            // Handle decryption error (e.g., set cookie to undefined)
            req.cookies[key] = undefined;
          }
        }
      }
    }

    next();
  };
};