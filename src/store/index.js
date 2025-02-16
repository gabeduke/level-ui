import { createStore } from 'vuex'

export default createStore({
  state: {
    station: {
      usgsId: "01646500",
      nwsId: "RMDV2",
      name: "James River (VA) at Richmond-Westham",
      points: [{ lid: "01646500" }]  // default points array for compatibility
    },
    stations: [],
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://level-6y4rumxsfq-uc.a.run.app'
  },
  mutations: {
    setStation(state, newStation) {
      state.station = newStation
    },
    setStations(state, stationsList) {
      state.stations = stationsList
    },
    setApiBaseUrl(state, url) {
      state.apiBaseUrl = url
    }
  }
})
