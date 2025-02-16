// src/store/index.js
import { createStore } from 'vuex'

// store/index.js
export default createStore({
  state: {
    stations: [],
    station: {}
  },
  mutations: {
    setStation(state, newStation) {
      state.station = newStation
    },
    setStations(state, stationsList) {
      state.stations = stationsList
    }
  }
})
