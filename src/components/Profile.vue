<!-- src/components/Profile.vue -->
<template>
    <section>
      <NavBar />
      <b-card-group deck :columns="true">
        <b-card v-if="user" style="max-width: 30rem;" align="center">
          <h5>{{ user.displayName }}</h5>
          <b-img thumbnail fluid rounded="circle" :src="user.photoURL" alt="Profile image"></b-img>
          <p>
            <br>Email: <strong>{{ user.email }}</strong>
            <br>UID: <strong>{{ user.uid }}</strong>
            <br>Provider: <strong>{{ user.providerData[0].providerId }}</strong>
          </p>
        </b-card>
      </b-card-group>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import NavBar from '@/components/NavBar.vue'
  
  const user = ref(null)
  const auth = getAuth()
  
  onMounted(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        user.value = u
      }
    })
  })
  </script>
  
  <style scoped>
  /* Your Profile styles */
  </style>
