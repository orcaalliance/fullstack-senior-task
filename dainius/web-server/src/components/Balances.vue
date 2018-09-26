<template>
  <div class="balancesDiv" v-if="balances">

  <table class="table table-bordered table-hover">
    
    <tbody>
      <tr v-for="(crypto, index) in balances" v-bind:key="index">
        <td>{{ crypto.currency }}</td>
        <td>{{ crypto.amount }}</td>
      </tr>
    </tbody>
  </table>
  <li  class="list-group-item text-uppercase text-center"><span class="oi oi-timer"></span> {{ timestamp }}</li>

  </div>
</template>


<script>

import io from 'socket.io-client';
const socket = io('http://localhost:3000');
socket.on('connect', function(){console.log('Connected to websocket server')});
socket.on('disconnect', function(){console.log('Disconnected from websocket server')});
socket.on('balances', (data) => {
  console.log(data)
})


import { mapState, mapMutations } from 'vuex';
import moment from 'moment';

  export default {
    data () {
      return {
        timestamp: null
      }
    },
    beforeMount () {
      socket.on('balances', (data) => {
        this.displayData(JSON.parse(data))
      })

    },
    computed: {
      ...mapState([
        'balances'
      ])
    },
    methods: {
      ...mapMutations([
        'SET_BALANCES',
      ]),
      displayData(dataset){
        if(dataset.balances) {
          this.SET_BALANCES(dataset.balances)
          this.timestamp = moment(dataset.timestamp).format("YYYY-MM-DD HH:mm:ss")
        }
      },
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.balancesDiv {
  margin-top: 20px;
}

</style>
