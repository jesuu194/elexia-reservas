const mongoose = require('mongoose');
const { ensureMinimumData } = require('./bootstrapData');

let memoryServer;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (mongoUri) {
      await mongoose.connect(mongoUri);
      await ensureMinimumData();
      console.log('MongoDB connected using MONGO_URI');
      return;
    }

    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/proyecto');
      await ensureMinimumData();
      console.log('MongoDB connected on localhost');
      return;
    } catch {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }

      const { MongoMemoryServer } = require('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      const inMemoryUri = memoryServer.getUri('proyecto');
      await mongoose.connect(inMemoryUri);
      await ensureMinimumData();
      console.log('MongoDB connected using in-memory fallback');
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  if (memoryServer) {
    await memoryServer.stop();
  }
});

module.exports = connectDB;
