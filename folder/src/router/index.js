import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import TarifsPage from '../components/TariffsPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import LoginPage from '../components/LoginPage.vue'
import UserPage from '../components/UserPage.vue'
import Payment from '../components/PaymentTariff.vue'
import Wallet from '../components/WalletPayment.vue'
import SelectedUser from '../components/SelectedUser.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'Home', path: '/', component: HomePage },
    { name: 'Tarifs', path: '/tariffs', component: TarifsPage },
    { name: 'Register', path: '/register/:tariffId', component: RegisterPage,
      props: route => ({ tariffId: route.params.tariffId, tariffName: route.query.tariffName })
    },
    { name: 'Login', path: '/login', component: LoginPage },
    {name: 'UserPage', path: '/UserPage', component: UserPage },
    {name: 'Payment', path: '/Payment', component: Payment },
    {name: 'Wallet', path: '/Wallet', component: Wallet },
    {name: 'SelectedUser', path: '/SelectedUser', component: SelectedUser },
  ]
});

export default router;
