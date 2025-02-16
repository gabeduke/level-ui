<template>
  <div class="stations">
    <h2 class="mb-3">Select a Station</h2>
    
    <b-form-group label="Filter Tags" label-for="tag-search" class="mx-auto" style="max-width: 300px;">
      <b-form-input
        id="tag-search"
        v-model="tagSearch"
        placeholder="Type to filter tags..."
      ></b-form-input>
    </b-form-group>
    
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
        <b-button size="sm" variant="outline-secondary" @click="tagsExpanded = !tagsExpanded">
          {{ tagsExpanded ? 'Show Less' : 'Show More' }}
        </b-button>
        <b-button v-if="selectedTag" size="sm" variant="outline-secondary" @click="clearTag" class="ms-1">
          Clear Tag
        </b-button>
      </div>
    </div>

    <!-- Station List (scrollable) -->
    <div class="station-list station-list-scrollable">
      <b-list-group>
        <b-list-group-item
          v-for="station in filteredStations"
          :key="station.usgsId"
          @click="onStationChange(station)"
          :active="isSelected(station)"
          class="station-item"
        >
          {{ station.name }}
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

// Use base URL from the store.
const store = useStore()
const baseUrl = computed(() => store.state.apiBaseUrl)

// Reactive filtering variables.
const tagSearch = ref('')
const selectedTag = ref('')
const tagsExpanded = ref(false)

// Ensure stations is always an array.
const stations = computed(() => store.state.stations || [])

// Normalization function to standardize station data.
const normalizeStation = (station) => {
  return {
    usgsId: station.points && station.points[0] ? station.points[0].lid : '',
    nwsId: station.nwsId || (station.key ? station.key.split('-')[1] : ''),
    name: station.name || (station.points && station.points[0] ? station.points[0].name : 'Unnamed station'),
    original: station
  }
}

// Load stations from API and normalize them.
const loadStations = async () => {
  try {
    const response = await axios.get(`${baseUrl.value}/api/v1/stations`)
    const normalized = response.data.map(normalizeStation)
    store.commit('setStations', normalized)
  } catch (error) {
    console.error('Error loading stations:', error)
  }
}
onMounted(() => {
  loadStations()
})

// Filtering: Filter stations based on tagSearch or selectedTag.
const filteredStations = computed(() =>
  stations.value.filter((station) => {
    const name = station.name.toLowerCase()
    if (selectedTag.value) {
      return name.includes(selectedTag.value)
    }
    return name.includes(tagSearch.value.toLowerCase())
  })
)

// Generate tags from active station names.
const stationWords = computed(() => {
  const words = []
  filteredStations.value.forEach((station) => {
    const name = station.name || ''
    name.split(/\W+/).forEach((token) => {
      if (token && token.length >= 3 && !/^\d+$/.test(token)) {
        words.push(token.toLowerCase())
      }
    })
  })
  return words
})
const wordFrequency = computed(() => {
  const freq = {}
  stationWords.value.forEach((word) => {
    freq[word] = (freq[word] || 0) + 1
  })
  return freq
})
const tags = computed(() => {
  const minFreq = 4
  const allTags = Object.entries(wordFrequency.value)
    .filter(([word, count]) => count >= minFreq)
    .map(([word]) => word)
    .sort((a, b) => a.localeCompare(b))
  if (tagSearch.value) {
    return allTags.filter((tag) => tag.includes(tagSearch.value.toLowerCase()))
  }
  return allTags
})

// Handler for when a station is selected.
const onStationChange = (station) => {
  console.log('Selected station:', station)
  store.commit('setStation', station)
}
const isSelected = (station) => {
  return store.state.station && station.usgsId === store.state.station.usgsId
}

// Tag selection handlers.
const selectTag = (tag) => {
  selectedTag.value = tag
}
const clearTag = () => {
  selectedTag.value = ''
}
</script>

<style scoped>
.stations {
  padding: 1rem;
}
.filters {
  margin-bottom: 1rem;
}
.tags-container {
  transition: max-height 0.3s ease;
  overflow-y: hidden;
}
.tags-container.collapsed {
  max-height: 50px;
}
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
.station-list-scrollable {
  max-height: 300px;
  overflow-y: auto;
}
.station-item {
  cursor: pointer;
}
</style>
