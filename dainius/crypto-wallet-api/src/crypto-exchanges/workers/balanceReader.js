const { mergeWith, add } = require('ramda');
const db = require('../../db');
const ws = require('../../websocket/client');

let readerTimer;
const interval = 5000;
const readerSetup = {};

let aggregatedBalances;

const getTimestamp = () => {
  const date = new Date();
  return date.getTime();
};

const aggregate = (formattedBalances) => {
  aggregatedBalances = mergeWith(add, aggregatedBalances, formattedBalances);
};

class BalanceReader {
  constructor({
    cryptoExchange, apiKey, secret, balanceFetcher, balanceFormatter, timestamp,
  }) {
    this.cryptoExchange = cryptoExchange;
    this.apiKey = apiKey;
    this.secret = secret;
    this.balanceFetcher = balanceFetcher;
    this.balanceFormatter = balanceFormatter;
    this.timestamp = timestamp;
  }

  get start() {
    return this.reader();
  }

  async reader() {
    const balance = await this.balanceFetcher(this.cryptoExchange, this.apiKey, this.secret);
    const formattedBalances = await this.balanceFormatter(balance);
    aggregate(formattedBalances);
    db.saveBalances(this.cryptoExchange, formattedBalances, this.timestamp);
  }
}


const readerFunc = async () => {
  const cryptoExchanges = Object.keys(readerSetup);
  const timestamp = getTimestamp();
  const promises = [];
  cryptoExchanges.forEach((item) => {
    const balanceReader = new BalanceReader({ ...readerSetup[item], timestamp });
    promises.push(balanceReader.start);
  });
  await Promise.all(promises);
  ws.sendAggregatedBalances({ aggregatedBalances, timestamp });
  db.saveAggregatedBalances(aggregatedBalances, timestamp);
};


const startReader = () => {
  if (Object.keys(readerSetup).length) {
    readerFunc();
    readerTimer = setInterval(() => {
      aggregatedBalances = {};
      readerFunc();
    },
    interval);
  }
};


const addExchange = async (cryptoExchange, apiKey, secret, balanceFetcher, balanceFormatter) => {
  readerSetup[cryptoExchange] = {
    cryptoExchange,
    apiKey,
    secret,
    balanceFetcher,
    balanceFormatter,
  };

  clearInterval(readerTimer);
  startReader();
};

const removeExchange = async (cryptoExchange) => {
  clearInterval(readerTimer);
  delete readerSetup[cryptoExchange];
  startReader();
};


module.exports = {
  addExchange,
  removeExchange,
};
