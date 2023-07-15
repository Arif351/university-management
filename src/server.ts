import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, infoLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    infoLogger.info(`Database is connected successfully.`);

    server = app.listen(config.port, () => {
      infoLogger.info(`University app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('Fail to connect database.', error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
boostrap();

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM is received.');
  if (server) {
    server.close();
  }
});
