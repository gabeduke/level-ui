<!-- src/components/Login.vue -->
<template>
    <section>
      <NavBar />
      <h5 class="center-align">Login</h5>
      <section id="firebaseui-auth-container"></section>
    </section>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import NavBar from '@/components/NavBar.vue'
  import { getAuth } from 'firebase/auth'
  import * as firebaseui from 'firebaseui'
  import 'firebaseui/dist/firebaseui.css'
  
  const auth = getAuth()
  
  onMounted(() => {
    let ui = firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(auth)
    }
    const uiConfig = {
      signInSuccessUrl: '/profile',
      signInFlow: 'popup',
      signInOptions: [
        // FirebaseUI for v9: use provider IDs (these remain strings)
        'google.com',
        'password'
      ]
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  })
  </script>
  
  <style scoped>
  /* Your styles */
  </style>
