import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stations: [],
    station: {
        lid: "rmdv2",
        name: "James River (VA) at Richmond-Westham"
    }
  },
  mutations: {
    setStation(state, newStation) {
      state.station = newStation
    },
    setStations(state, stationsList) {
      state.stations = stationsList
    }
  },
})