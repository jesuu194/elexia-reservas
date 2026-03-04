const mongoose = require('mongoose');
const { ensureMinimumData } = require('./config/bootstrapData');

const runSeed = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/proyecto';
    await mongoose.connect(mongoUri);
    await ensureMinimumData();
    console.log('Seed completado correctamente');
  } catch (error) {
    console.error('Error ejecutando seed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

runSeed();
