const logger = require('../utils/logger');
const db = require('../db');

module.exports = async (req, res) => {
  try {
    const balances = await db.getAggregatedBalances();
    res.status(200).send(balances);
  } catch (err) {
    logger.error(err);
    res.status(500).send('Ooops something went wrong');
  }
};
