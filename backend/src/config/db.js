const mongoose = require('mongoose');
const { ensureMinimumData } = require('./bootstrapData');

let memoryServer;
let connectionPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    const mongoUri = process.env.MONGO_URI;

    if (mongoUri) {
      try {
        await mongoose.connect(mongoUri);
        await ensureMinimumData();
        console.log('MongoDB connected using MONGO_URI');
        return mongoose.connection;
      } catch (err) {
        console.warn('MONGO_URI unavailable, using fallback database:', err.message);
      }
    }

    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/proyecto');
      await ensureMinimumData();
      console.log('MongoDB connected on localhost');
      return mongoose.connection;
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
      return mongoose.connection;
    }
  })().catch((err) => {
    connectionPromise = undefined;
    throw err;
  });

  return connectionPromise;
};

process.on('SIGINT', async () => {
  if (memoryServer) {
    await memoryServer.stop();
  }
});

module.exports = connectDB;
