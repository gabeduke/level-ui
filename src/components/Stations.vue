<template>
  <div class="stations">
    <h1 class="mb-3 text-center">Stations</h1>
    <b-container fluid>
      <b-row>
        <!-- Main station display column -->
        <b-col cols="12" lg="8">
          <div class="main-display p-3 border">
            <h4>Main Station Display</h4>
            <pre>
Current station: 
{{ selectedStation 
  ? (selectedStation.name || (selectedStation.points && selectedStation.points[0].name))
  : 'null' }}
            </pre>
            <!-- Additional details (e.g., a map) can go here -->
          </div>
        </b-col>
        
        <!-- Filters and Station List column -->
        <b-col cols="12" lg="4">
          <div class="filters mb-3">
            <b-form-group label="Filter Tags" label-for="tag-search" class="mx-auto" style="max-width: 300px;">
              <b-form-input
                id="tag-search"
                v-model="tagSearch"
                placeholder="Type to filter tags..."
              ></b-form-input>
            </b-form-group>
            
            <!-- Tags container with toggle -->
            <div class="tags mb-3">
              <div class="tags-container" :class="{ collapsed: !tagsExpanded }">
                <span
                  v-for="tag in tags"
                  :key="tag"
                  class="tag"
                  :class="{ selected: selectedTag === tag }"
                  @click="selectTag(tag)"
                >
                  {{ tag }}
                </span>
              </div>
              <div class="tag-toggle text-center">
                <b-button
                  size="sm"
                  variant="outline-secondary"
                  @click="tagsExpanded = !tagsExpanded"
                >
                  {{ tagsExpanded ? 'Show Less' : 'Show More' }}
                </b-button>
              </div>
            </div>
          </div>
          
          <!-- Station List for small screens (collapsible) -->
          <b-button variant="primary" @click="toggleStations" class="mb-2 d-lg-none">
            {{ showStations ? 'Hide' : 'Show' }} Station List
          </b-button>
          <b-collapse v-model="showStations" class="d-lg-none station-list station-list-scrollable mb-3">
            <b-list-group>
              <b-list-group-item
                v-for="station in filteredStations"
                :key="station.key"
                @click="onStationChange(station)"
                :active="isSelected(station)"
                class="station-item"
              >
                {{ station.name || (station.points && station.points[0].name) || 'Unnamed station' }}
              </b-list-group-item>
            </b-list-group>
          </b-collapse>
          
          <!-- Station List for large screens (always visible) -->
          <div class="d-none d-lg-block station-list station-list-scrollable">
            <b-list-group>
              <b-list-group-item
                v-for="station in filteredStations"
                :key="station.key"
                @click="onStationChange(station)"
                :active="isSelected(station)"
                class="station-item"
              >
                {{ station.name || (station.points && station.points[0].name) || 'Unnamed station' }}
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

// Use base URL from env variable.
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://level-6y4rumxsfq-uc.a.run.app'
const store = useStore()

// Reactive variables.
const tagSearch = ref('')
const selectedTag = ref('')
const selectedStation = ref(store.state.station)
const tagsExpanded = ref(false)
const showStations = ref(false)

// Ensure stations is always defined.
const stations = computed(() => store.state.stations || [])

// Filtered stations based on tagSearch or selectedTag.
const filteredStations = computed(() =>
  stations.value.filter(station => {
    const name = (station.name || (station.points && station.points[0].name) || '').toLowerCase()
    if (selectedTag.value) {
      return name.includes(selectedTag.value)
    }
    return name.includes(tagSearch.value.toLowerCase())
  })
)

// Compute active stations (the ones currently visible)
const activeStations = computed(() => filteredStations.value)

// Extract words from active stations.
const stationWords = computed(() => {
  const words = []
  activeStations.value.forEach(station => {
    const name = station.name || (station.points && station.points[0].name) || ''
    name.split(/\W+/).forEach(token => {
      // Exclude tokens that are empty, less than 3 characters, or purely numeric.
      if (token && token.length >= 3 && !/^\d+$/.test(token)) {
        words.push(token.toLowerCase())
      }
    })
  })
  return words
})

// Count word frequencies.
const wordFrequency = computed(() => {
  const freq = {}
  stationWords.value.forEach(word => {
    freq[word] = (freq[word] || 0) + 1
  })
  return freq
})

// Generate tags from words that appear at least minFreq times, sorted alphabetically.
// minFreq is configurable here.
const tags = computed(() => {
  const minFreq = 4
  const allTags = Object.entries(wordFrequency.value)
    .filter(([word, count]) => count >= minFreq)
    .map(([word]) => word)
    .sort((a, b) => a.localeCompare(b))
  
  if (tagSearch.value) {
    return allTags.filter(tag => tag.includes(tagSearch.value.toLowerCase()))
  }
  return allTags
})

// Handlers.
const onStationChange = (station) => {
  selectedStation.value = station
  store.commit('setStation', station)
}
const isSelected = (station) => {
  return selectedStation.value && station.key === selectedStation.value.key
}
const selectTag = (tag) => {
  selectedTag.value = tag
}
const clearTag = () => {
  selectedTag.value = ''
}
const toggleStations = () => {
  showStations.value = !showStations.value
}

const loadStations = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/stations`)
    store.commit('setStations', response.data)
  } catch (error) {
    console.error('Error loading stations:', error)
  }
}

onMounted(() => {
  loadStations()
})
</script>

<style scoped>
/* Constrain the tags container and make it scrollable if needed */
.tags-container {
  transition: max-height 0.3s ease;
  overflow-y: hidden;
}
.tags-container.collapsed {
  max-height: 50px; /* adjust as needed */
}

/* Constrain the station list container and make it scrollable */
.station-list-scrollable {
  max-height: 300px; /* adjust as needed */
  overflow-y: auto;
}

/* Filter area styling */
.filters {
  margin-bottom: 1rem;
}

/* Tag styles */
.tags {
  margin-bottom: 1rem;
}
.tag {
  display: inline-block;
  padding: 0.3rem 0.5rem;
  margin: 0.2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
.tag.selected {
  background-color: #1E95EA;
  color: white;
  border-color: #1E95EA;
}

/* Station list item style */
.station-item {
  cursor: pointer;
}
</style>
