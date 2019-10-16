<template>
  <div class="stations">
        <h1>Stations</h1>
        <div>
            <!-- <div>
                <ul>
                    <li v-for="station in $store.state.stations" :key="station.id">
                        {{ station }}
                    </li>
                </ul>
            </div> -->
            <p v-show="!$store.state.stations">Loading ..</p>
            <v-select
                v-show="$store.state.stations"
                label="name"
                @input="setStation"
                :options="$store.state.stations"
                :value="$store.state.station.name"
            ></v-select>
            <pre>Current station: {{ $store.state.station.name || 'null' }}</pre>
        </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Stations',
    computed: {
        store() {
        return this.$store.state
        }
    },
    methods: {
        setStation(val) {
            this.$store.commit('setStation', val)
        },
        setStations(val) {
            this.$store.commit('setStations', val)
        },
        loadStations() {
            const url = 'https://level-6y4rumxsfq-uc.a.run.app/api/v1/stations';

            axios
            .get(url)
            .then(response => (this.setStations(response.data.points)))
        }
    },
    mounted () {
        this.loadStations();
    }
}
</script>

<style scoped>

select {
  max-width: 100%;
  box-sizing: border-box;
  white-space: normal;
  word-wrap: break-word;
}

</style>