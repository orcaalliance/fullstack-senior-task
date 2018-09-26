const { ws } = require('./server');
const logger = require('../utils/logger');

const transformInput = data => Object.keys(data.aggregatedBalances)
  .map(k => ({ currency: k, amount: data.aggregatedBalances[k] }));

const sendAggregatedBalances = (data) => {
  try {
    if (ws().connected && data && typeof data === 'object') {
      const dataObj = {
        timestamp: data.timestamp,
        balances: transformInput(data),
      };
      ws().emit('balances', JSON.stringify(dataObj));
      logger.info('Aggregated balances sent via websocket');
    }
  } catch (err) {
    logger.error('Websocker client error: ', err);
  }
};

module.exports = {
  sendAggregatedBalances,
};
