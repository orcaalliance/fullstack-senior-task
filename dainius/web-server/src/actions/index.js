import axios from 'axios'

module.exports = {
  AddExchange: ({ commit }, {cryptoExchange, apiKey, secret}) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/crypto-exchange/add', {
          cryptoExchange,
          apiKey,
          secret
        })
        .then(function (response) {
          if(response.status==200) commit('ADD_EXCHANGE', cryptoExchange);
          resolve({msg: response.data, status: response.status});
        })
        .catch(function (error) {
          reject(error)
        });
    })
  },
  RemoveExchange: ({ commit }, {index, cryptoExchange}) => {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/crypto-exchange/remove', {
          cryptoExchange: cryptoExchange.toLowerCase()
        })
        .then(function (response) {
          if(response.status==200) commit('REMOVE_EXCHANGE', index)
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        });
    })
  },
  GetAddedExchanges: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/cryptoExchanges')
        .then(function (response) {
          if(response.status==200) commit('GET_ADDED_EXCHANGES', response.data)
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        });
    })
  }
}