<template>
  <div class="card dashboard">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#cryptoExchangeModal" >Add new crypto exchange</button>

    <div class="">
        <ul class="list-group">
          <li class="list-group-item text-uppercase" v-for="(cryptoExchange, index) in exchangesList" v-bind:key="index">
            {{ cryptoExchange }} <button class="btn btn-secondary btn-sm" id="removeButton" v-on:click="removeExchange(index, cryptoExchange)">remove</button>
          </li>
        </ul>
    </div>
     <ModalForm/>
     
  </div>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex';
import ModalForm  from './ModalForm.vue';

export default {
  name: 'Dashboard',
  components: {
    ModalForm
  },
  computed: {
    ...mapState([
      'exchangesList'
    ])
  },
  methods: {
    ...mapActions([
      'RemoveExchange',
      'GetAddedExchanges'
    ]),
    removeExchange: function(index, cryptoExchange) {
      this.RemoveExchange({index, cryptoExchange})
    }
  },
  beforeMount(){
    this.GetAddedExchanges()
 },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#removeButton{
  float: right;
}
.dashboard{
  margin-top: 20px;
}
</style>
