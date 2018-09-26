const ccxt = require('ccxt');
const logger = require('../utils/logger');
const db = require('../db');
const { balanceReader } = require('./workers');
const { binanceMock } = require('../../mocks');
const { USE_MOCKS } = require('../env');

const balanceFetcher = async (cryptoExchange, apiKey, secret) => {
  try {
    if (USE_MOCKS) return binanceMock.generate();
    const binance = new ccxt.binance({ apiKey, secret });
    const balance = await binance.fetchBalance();
    return balance;
  } catch (err) {
    throw new Error(err);
  }
};

const balanceFormatter = (balance) => {
  if (balance.balances) {
    const formattedBalances = {};
    balance.balances.forEach((record) => {
      formattedBalances[record.asset] = Number(record.free) + Number(record.locked);
    });
    return formattedBalances;
  }
  return {};
};

/* eslint new-cap: ["error", { "newIsCap": false }] */
const addExchange = ({ cryptoExchange, apiKey, secret }) => new Promise(async (resolve, reject) => {
  try {
    logger.info('Adding binance exchange...');
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
    logger.info('Removing binance exchange...');
    balanceReader.removeExchange(cryptoExchange);
    await db.deleteCryptoExchangeDetails(cryptoExchange);
    resolve('Binance removed successfully');
  } catch (err) {
    reject(err);
  }
});


module.exports = {
  addExchange,
  removeExchange,
};
