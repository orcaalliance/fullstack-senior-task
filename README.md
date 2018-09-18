Senior Developer Task
=====================

Goal: you need to create an app, that fetches cryptocurrency balances from an exchange, converts it to USD, and outputs them to a line chart, where X axis is time, and Y axis is the balance of a specified currency. You can see the example.

Conditions:

* User should be able to add API keys in the app, for at least three of the biggest exchanges (kraken, huobi, binance, etc.).
* Balances should be fetched all the time, the application is running on the users browser, and update the chart in real-time. If you were unable to fetch, the error message should be thrown and the app should stop requesting it.
* After fetching balances from several different exchanges, you should aggregate received data.
* App should be dockerized (anyone should be able to run it with a single command).

Bonuses:

* Using vuex.
* Using any of the coding standards (should be mentioned somewhere in the README which one is used).

Technologies that are sufficient for this task:

* Node.js / Express.js.
* Redis.
* Docker.
* Vue.js.
