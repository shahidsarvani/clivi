import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './components/Dashboard.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import store from './store'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/register/:username',
    name: 'register.username',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/login',
    name: 'login.login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next('/dashboard')
  }
})
export default router
