<!-- src/components/Home.vue -->
<template>
    <section>
      <NavBar />
      <h5 class="center-align">Home</h5>
      <Stations />
      <Level />
    </section>
  </template>
  
  <script setup>
  import NavBar from '@/components/NavBar.vue'
  import Level from '@/components/Level.vue'
  import Stations from '@/components/Stations.vue'
  </script>
  
  <style scoped>
  /* Your Home.vue styles */
  </style>
