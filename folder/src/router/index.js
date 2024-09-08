import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import TarifsPage from '../components/TariffsPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import LoginPage from '../components/LoginPage.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'Home', path: '/', component: HomePage },
    { name: 'Tarifs', path: '/tarifs', component: TarifsPage },
    { name: 'Register', path: '/register/:tariffId', component: RegisterPage },
    { name: 'Login', path: '/login', component: LoginPage },
  
    ]
});

export default router;
