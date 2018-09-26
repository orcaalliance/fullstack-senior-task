const processAddRequest = require('../../middleware/processAddRequest');
const { binance, kraken } = require('../../crypto-exchanges');

module.exports = (req, res) => {
  const { cryptoExchange } = req.body;

  switch (cryptoExchange) {
    case 'binance': processAddRequest(req, res, binance.addExchange, 'binance'); break;
    case 'kraken': processAddRequest(req, res, kraken.addExchange, 'kraken'); break;
    default: res.status(500).send(`Ooops something went wrong: failed to add ${cryptoExchange}`);
  }
};
