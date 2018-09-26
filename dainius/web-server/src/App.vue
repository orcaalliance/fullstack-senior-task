<template>
  <div id="app" class="container">

    <Dashboard />
    <Balances />

  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue'
import Balances from './components/Balances.vue'

export default {
  name: 'app',
  components: {
    Dashboard,
    Balances,
  }
}
</script>

<style>

#app {
  max-width: 400px;
}
</style>

