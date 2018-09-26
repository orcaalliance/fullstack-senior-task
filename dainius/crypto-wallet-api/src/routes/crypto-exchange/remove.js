const processRemoveRequest = require('../../middleware/processRemoveRequest');
const { binance, kraken } = require('../../crypto-exchanges');

module.exports = (req, res) => {
  const { cryptoExchange } = req.body;

  switch (cryptoExchange) {
    case 'binance': processRemoveRequest(req, res, binance.removeExchange, 'binance'); break;
    case 'kraken': processRemoveRequest(req, res, kraken.removeExchange, 'kraken'); break;
    default: res.status(500).send(`Ooops something went wrong: failed to remove ${cryptoExchange}`);
  }
};
