const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.NODE_ENV === 'test'
      ? process.env.TEST_MONGO_URI
      : process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('No se encontró la URI de MongoDB');
    }

    await mongoose.connect(uri);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;