const logger = require('../../utils/logger');
const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const cryptoExchanges = await db.getAddedCryptoExchangeNames();
    res.status(200).send(cryptoExchanges);
  } catch (err) {
    logger.error(err);
    res.status(500).send('Ooops something went wrong');
  }
};
