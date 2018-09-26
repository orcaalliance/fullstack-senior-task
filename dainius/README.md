## Setup

Application is made of three parts:  
1. Database  
2. Crypto exchanges API  
3. Web server  


![Architecture](/images/architecture.png)

#### -Database
Mongodb

#### -API
Collects use balance data from various crypto exchanges and stores it to the Redis database.  
Balances are fetched on a set interval and are recorded to db.  
Stack: node.js, express.js  

#### -Web server
Web server is responsible for hosting and exposing a website url to the end user.   
It is also responsible for some interactions with the back-end api.  
The main purpose of the website is to display user data and add an interaction layer to the user between his data and what is displayed.  
Aggregated crypto data is displayed and updated in real time (e.g via web sockets).  
Stack: vue.js, HTML, websockets  

## Running application

Run application using docker-compose:
`docker-compose up`

To use mocked crypto exchanges add `USE_MOCKS=true` env variable to docker-compose.yaml 'crypto-wallet-api' service.  

For example:
```
environment:  
      - MONGO_URL=mongodb://mongo:27017
      - USE_MOCKS=true

```
## TO-DO:
- Add tests to test api endpoints
- Add unit tests
- Further app logic improvements (e.g auto start balanceReader )
- Add live chart to show timestamped balances
- Pre load balances on web-page launch
- Add cryto currenty conversion rates to return values in USD
- Add security (i.e SSL/TSL layer, hashing api keys when storing to db, secure websockets etc)
- Add user context and sessions
- Add status bar to show if API end is working as supposed to (i.e returning status if balanceReader is active)
- Add endpoint to update api keys (crypto exchange details)
- Other...

