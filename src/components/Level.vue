<template>
    <div class="level-container d-flex flex-wrap align-items-center">
      <div class="level-image me-3">
        <img :src="stationImgUrl" alt="Hydrograph" />
      </div>
      <div class="level-info">
        <h1>Level</h1>
        <div class="text-area">
          <p v-if="!level">Fetching level…</p>
          <p v-else>{{ level }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { useStore } from 'vuex'
  import axios from 'axios'
  
  const store = useStore()
  const baseUrl = computed(() => store.state.apiBaseUrl)
  
  // Compute stationId using the normalized station's usgsId.
  const stationId = computed(() =>
    store.state.station && store.state.station.usgsId ? store.state.station.usgsId : ''
  )
  const levelUrl = computed(() => `${baseUrl.value}/api/v1/level?station=${stationId.value}`)
  const level = ref(null)
  
  // Use nwsId for the hydrograph image URL if available; otherwise use usgsId.
  const stationImgUrl = computed(() => {
    const station = store.state.station
    if (station) {
      return `https://water.weather.gov/resources/hydrographs/${station.nwsId}_hg.png`
    }
    return ''
  })
  
  const loadLevel = async () => {
    try {
      const response = await axios.get(levelUrl.value)
      level.value = response.data.reading
    } catch (error) {
      console.error('Error fetching level data:', error)
    }
  }
  
  onMounted(() => {
    loadLevel()
  })
  
  watch(() => store.state.station, () => {
    loadLevel()
  })
  </script>
  
  <style scoped>
  .level-container {
    display: flex;
    flex-wrap: wrap;
  }
  .level-image {
    max-width: 300px;
  }
  .level-image img {
    width: 100%;
    border: 1px solid #d8d8d8;
    box-shadow: 0px 0.5px 1px #d8d8d8;
  }
  .level-info {
    flex: 1;
  }
  </style>
