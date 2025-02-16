<template>
  <b-container fluid>
    <b-row>
      <!-- Left column: Level display -->
      <b-col cols="12" lg="8">
        <Level />
      </b-col>

      <!-- Right column: Stations (filter and list) -->
      <b-col cols="12" lg="4">
        <Stations />
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
import Level from '@/components/Level.vue'
import Stations from '@/components/Stations.vue'
</script>

<style scoped>
/* You can add any additional styling for Home.vue here */
</style>
