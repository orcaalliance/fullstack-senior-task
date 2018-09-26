const app = require('express')();
const server = require('http').createServer(app);
// const io = require('socket.io')(server);
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const websocket = require('./websocket/server');
const logger = require('./utils/logger');
const { SERVER_PORT } = require('./env');
const routes = require('./routes');
const validateAddRequest = require('./middleware/validateAddRequest');
const validateRemoveRequest = require('./middleware/validateRemoveRequest');

websocket.startServer(server);

// security headers
app.use(helmet());
app.use(cors());

// best practices
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

// custom middleware
app.use('/crypto-exchange/add', validateAddRequest);
app.use('/crypto-exchange/remove', validateRemoveRequest);

// routes
app.post('/crypto-exchange/add', routes.addCryptoExchange);
app.post('/crypto-exchange/remove', routes.removeCryptoExchange);
app.get('/cryptoExchanges', routes.getAddedCryptoExchangeNames);
app.get('/balances', routes.balances);

server.listen(SERVER_PORT, () => {
  logger.info('Server running on port %d', SERVER_PORT);
});

module.exports = {
  test: 'test',
};
