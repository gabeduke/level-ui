<template>
  <div class="level-app">
      <div class="level-image">
          <img v-bind:src="station">
      </div>

      <div class="level-info">
          <h1>Level</h1>
          <div class="text-area">
              <p v-show="!level">Fetching level..</p>
              <p v-show="level">{{ level }}</p>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Level',
    computed: {
        station () {
            var url = 'https://water.weather.gov/resources/hydrographs/' + this.$store.state.station.lid + '_hg.png'
            return url
        },
        level_url () {
            var url = 'https://level-6y4rumxsfq-uc.a.run.app/api/v1/level?station=' + this.$store.state.station.lid
            return url
        },
        store() {
            return this.$store.state
        }
    },
    data () {
        return {
            level: null,
        }
    },
    created() {
        this.loadData()
        this.$store.subscribe( (mutation) => {
        if (mutation.type === 'setStation') {
            this.loadData()
        }
        })
    },
    methods: {
        loadData() {

            this.level = null,

            axios
            .get(this.level_url)
            .then(response => (this.level = response.data.reading))
        },
    },
}
</script>

<style scoped>

.level-app {
    display: flex;
    flex-flow: wrap-reverse;
    padding: 1rem;
}

img {
    border: 1px solid #d8d8d8;
    width: 90%;
    margin: 5px;
    box-shadow: 0px .5px 1px #d8d8d8;
}

.level-image {
    width: 600px;
}

.level-info {
margin-top: 10px;
width: 160px;
}

button {
margin-top: 30px;
border: none;
background-color: #1E95EA;
color: white;
height: 40px;
width: 100px;
font-size: 14px;
}

.button-loading {
background-color: grey;
}

</style>