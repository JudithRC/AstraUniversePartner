const admin = require('firebase-admin');
const fs = require('fs');
const path = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.test.json';

if (fs.existsSync(path)) {
  const serviceAccount = JSON.parse(fs.readFileSync(path, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;