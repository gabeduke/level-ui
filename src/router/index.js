// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Profile from '@/components/Profile.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { auth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// A simple global navigation guard checking authentication
router.beforeEach((to, from, next) => {
  const auth = getAuth()
  if (to.meta.auth) {
    onAuthStateChanged(auth, user => {
      if (user) next()
      else next({ path: '/login' })
    })
  } else if (to.meta.guest) {
    onAuthStateChanged(auth, user => {
      if (user) next({ path: '/profile' })
      else next()
    })
  } else {
    next()
  }
})

export default router
