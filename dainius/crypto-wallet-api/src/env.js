const envalid = require('envalid');
const logger = require('./utils/logger');

const { num, str, bool } = envalid;

const env = envalid.cleanEnv(process.env, {
  NODE_ENV: str({ default: 'dev' }),
  SERVER_PORT: num({ default: 3000 }),
  WEBSOCKET_PORT: num({ default: 3001 }),
  MONGO_URL: str({ default: 'mongodb://localhost:27017' }),
  MONGO_DB_NAME: str({ default: 'cryptoWallet' }),
  USE_MOCKS: bool({ default: false }),
});

logger.info('Required environment variables are present');

module.exports = env;
