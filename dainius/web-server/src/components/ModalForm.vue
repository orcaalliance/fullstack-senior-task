<template>
  <div class="modal fade" id="cryptoExchangeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">Add crypto exchange</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="modalFormInput">
            <div class="form-group">
              <label for="cryptoExchangeSelect">Select crypto exchange</label>
              <select class="form-control" id="cryptoExchangeSelect" v-model="cryptoExchange">
                <option disabled selected="selected">-</option>
                <option value="kraken">Kraken</option>
                <option value="binance">Binance</option>
              </select>
            </div>
            <div class="form-group">
              <label for="apiKey">API key</label>
              <input type="text" class="form-control" id="apiKey" placeholder="Enter API key" v-model="apiKey">
            </div>
            <div class="form-group">
              <label for="apiSecret">Secret</label>
              <input type="text" class="form-control" id="apiSecret" placeholder="Enter secret" v-model="secret">
            </div>
          </form>
          <p>{{msg}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click="addExchange()">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: 'ModalForm',
  data(){
    return {
      cryptoExchange: '',
      apiKey: '',
      secret: '',
      msg: ''
    }
  },
  methods: {
    ...mapActions([
      'AddExchange'
    ]),
    addExchange: async function() {
      this.msg = 'ADDING NEW EXCHANGE...';
      this.AddExchange({
        cryptoExchange: this.cryptoExchange,
        apiKey: this.apiKey, 
        secret: this.secret
      }).then(res => {
        if (res.status==200) {
          $('#cryptoExchangeModal').modal('hide');
          return this.msg = '';
        }
        this.msg = res.msg
      }).catch(err => {
        this.msg = err
      })
    }
  },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
