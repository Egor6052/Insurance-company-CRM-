import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import TariffsPage from '../components/TariffsPage.vue'
import RegisterPage from '../components/RegisterPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/tariffs', component: TariffsPage },
  { path: '/register/:tariffId', component: RegisterPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
