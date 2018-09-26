const logger = require('../utils/logger');

module.exports = async (req, res, addExchange, name) => {
  try {
    const response = await addExchange(req.body);
    logger.info(response);
    res.status(200).send(response);
  } catch (err) {
    logger.error(`Request to add ${name} exchange wallet failed: ${err}`);
    res.status(202).send(err.message);
  }
};
