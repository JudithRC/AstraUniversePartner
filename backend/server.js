if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: require('path').resolve(__dirname, '.env.test') });
  console.log('Cargando .env.test');
} else {
  require('dotenv').config();
  console.log('Cargando .env');
}

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('TEST_MONGO_URI:', process.env.TEST_MONGO_URI);
console.log('MONGO_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('FIREBASE_SERVICE_ACCOUNT_PATH:', process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

const connectDB = require('./api/config/db');
const app = require('./app');

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
});