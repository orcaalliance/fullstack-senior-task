const addCryptoExchange = require('./crypto-exchange/add');
const removeCryptoExchange = require('./crypto-exchange/remove');
const getAddedCryptoExchangeNames = require('./crypto-exchange/getNames');
const balances = require('./balances');

module.exports = {
  addCryptoExchange,
  removeCryptoExchange,
  getAddedCryptoExchangeNames,
  balances,
};
