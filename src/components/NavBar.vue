<!-- src/components/NavBar.vue -->
<template>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">Home</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ms-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item v-if="!user" href="/login">Login</b-dropdown-item>
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item v-if="user" @click="signOutUser">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
  import { useRouter } from 'vue-router'
  
  const auth = getAuth()
  const user = ref(null)
  const router = useRouter()
  
  onMounted(() => {
    onAuthStateChanged(auth, (u) => {
      user.value = u
    })
  })
  
  const signOutUser = async () => {
    try {
      await signOut(auth)
      router.push({ name: 'Login' })
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  </script>
  
  <style scoped>
  /* Your NavBar styles */
  </style>
