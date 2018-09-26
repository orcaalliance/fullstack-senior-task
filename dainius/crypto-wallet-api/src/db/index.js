const { MongoClient } = require('mongodb');
const logger = require('../utils/logger');
const { MONGO_URL, MONGO_DB_NAME } = require('../env');

let db;

const crytpoExchangeExists = async (collection, cryptoExchange) => {
  const document = await collection.findOne({ cryptoExchange });
  if (document) return true;
  return false;
};

// Use connect method to connect to the server
MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, client) => {
  if (err) { logger.info('Error connecting to mongodb server'); return; }
  logger.info('Connected successfully to mongodb server');
  db = client.db(MONGO_DB_NAME);
});


const saveCryptoExchangeDetails = async (cryptoExchange, apiKey, secret) => {
  const collection = db.collection('cryptoExchanges');
  if (await crytpoExchangeExists(collection, cryptoExchange)) throw new Error('Crypto exchange already axists');
  collection.insertOne({ cryptoExchange, apiKey, secret }, (err) => {
    if (err) throw new Error('Could not persist crypto exchange details');
    logger.info(`Persisted ${cryptoExchange} apiKeys to database`);
  });
};

const deleteCryptoExchangeDetails = (cryptoExchange) => {
  const collection = db.collection('cryptoExchanges');
  collection.deleteMany({ cryptoExchange }, (err) => {
    if (err) throw new Error('Could not delete crypto exchange details');
    logger.info(`Removed ${cryptoExchange} apiKeys from database`);
  });
};

const saveBalances = async (cryptoExchange, balance, timestamp) => {
  const collection = db.collection(`${cryptoExchange}_balances`);
  collection.insertOne({ cryptoExchange, balances: balance, timestamp }, (err) => {
    if (err) throw new Error(`Could not persist ${cryptoExchange} balances`);
    logger.info(`Persisted ${cryptoExchange} balances to database`);
  });
};

const saveAggregatedBalances = async (aggregatedBalance, timestamp) => {
  const collection = db.collection('balances');
  collection.insertOne({ aggregatedBalance, timestamp }, (err) => {
    if (err) throw new Error('Could not persist aggregated balances');
    logger.info('Persisted aggregated balances to database');
  });
};

const getAggregatedBalances = () => new Promise((resolve) => {
  const collection = db.collection('balances');
  collection.find({ }).sort({ _id: -1 }).limit(5).toArray((err, res) => {
    if (err) throw new Error('Could not read aggregated balances');
    logger.info('Successfully read aggregated balances from database');
    resolve(res);
  });
});

const getAddedCryptoExchanges = () => new Promise((resolve) => {
  const collection = db.collection('cryptoExchanges');
  collection.find({ }).toArray((err, res) => {
    if (err) throw new Error('Could not read added crypto exchanges');
    logger.info('Successfully read added crypto exchanges');
    resolve(res);
  });
});

const getAddedCryptoExchangeNames = () => new Promise((resolve) => {
  const collection = db.collection('cryptoExchanges');
  collection.find({ }).project({ cryptoExchange: 1, _id: 0 }).toArray((err, res) => {
    if (err) throw new Error('Could not read added crypto exchanges');
    logger.info('Successfully read added crypto exchanges');
    const resFormatted = res.map(exchangeObj => exchangeObj.cryptoExchange);
    resolve(resFormatted);
  });
});


module.exports = {
  saveCryptoExchangeDetails,
  deleteCryptoExchangeDetails,
  saveBalances,
  saveAggregatedBalances,
  getAggregatedBalances,
  getAddedCryptoExchanges,
  getAddedCryptoExchangeNames,
};
