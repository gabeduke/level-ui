<!-- src/components/Level.vue -->
<template>
    <div class="level-app">
      <div class="level-image">
        <img :src="stationImgUrl" alt="Hydrograph">
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
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import axios from 'axios'
  
  const store = useStore()
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://level-6y4rumxsfq-uc.a.run.app'
  
  // Compute stationId from the station's points array.
  const stationId = computed(() => {
    return (store.state.station &&
            store.state.station.points &&
            store.state.station.points.length > 0)
           ? store.state.station.points[0].lid
           : ''
  })
  
  const levelUrl = computed(() => `${baseUrl}/api/v1/level?station=${stationId.value}`)
  const level = ref(null)
  
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
  </script>
