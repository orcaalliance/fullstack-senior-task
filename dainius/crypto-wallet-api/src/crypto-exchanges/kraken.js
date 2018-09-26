const ccxt = require('ccxt');
const logger = require('../utils/logger');
const db = require('../db');
const { balanceReader } = require('./workers');
const { krakenMock } = require('../../mocks');
const { USE_MOCKS } = require('../env');

const balanceFetcher = async (cryptoExchange, apiKey, secret) => {
  try {
    if (USE_MOCKS) return krakenMock.generate();
    const kraken = new ccxt.kraken({ apiKey, secret });
    const balance = await kraken.fetchBalance();
    return balance;
  } catch (err) {
    throw new Error(err);
  }
};

const balanceFormatter = (balance) => {
  if (balance.result) {
    return balance.result;
  }
  return {};
};

/* eslint new-cap: ["error", { "newIsCap": false }] */
const addExchange = ({ cryptoExchange, apiKey, secret }) => new Promise(async (resolve, reject) => {
  try {
    logger.info('Adding kraken exchange...');
    await balanceFetcher(cryptoExchange, apiKey, secret);
    await db.saveCryptoExchangeDetails(cryptoExchange, apiKey, secret);
    balanceReader.addExchange(cryptoExchange, apiKey, secret, balanceFetcher, balanceFormatter);
    resolve('Exchange api keys verified and added successfully');
  } catch (err) {
    reject(err);
  }
});

const removeExchange = ({ cryptoExchange }) => new Promise(async (resolve, reject) => {
  try {
    logger.info('Removing kraken exchange...');
    balanceReader.removeExchange(cryptoExchange);
    await db.deleteCryptoExchangeDetails(cryptoExchange);
    resolve();
  } catch (err) {
    reject(err);
  }
});


module.exports = {
  addExchange,
  removeExchange,
};
