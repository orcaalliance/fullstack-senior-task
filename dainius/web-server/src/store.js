import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    exchangesList: [],
    balances: null,

  },

  mutations: {
    ADD_EXCHANGE: (state, cryptoExchange) => {
      state.exchangesList.push(cryptoExchange)
    },
    REMOVE_EXCHANGE: (state, index) => {
      state.exchangesList.splice(index,1)
      if(state.exchangesList.length<1) state.balances = null
    },
    GET_ADDED_EXCHANGES: (state, cryptoExchanges) => {
      state.exchangesList = cryptoExchanges;
    },
    SET_BALANCES: (state, balances) =>{
      state.balances = balances;
    }
  },

  actions: {
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
    },
  }
})
