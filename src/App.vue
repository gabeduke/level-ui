<template>
  <div id="app">
    <Stations/>
    <Level/>
  </div>
</template>

<script>
import Level from './components/Level.vue'
import Stations from './components/Stations.vue'


export default {
  name: 'app',
  components: {
    Level,
    Stations,
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
