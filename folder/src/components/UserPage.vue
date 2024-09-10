<template>
    <div class="user-page">
      <div class="header">
        <div class="battonBack">
          <RouterLink to="/" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
        </div>
      </div>
  
      <div class="user-header">
        <div class="user-icon">
          <img src="../assets/icons/user.png" class="icon-img" />
        </div>
        <div class="user-info">
          <ul>
            <li><h1>{{ userName }}</h1></li>
            <li><h2>Email: </h2><p>{{ userEmail }}</p></li>
            <li><h2>Phone number: </h2><p>{{ userPhone }}</p></li>
            <li><h2>Wallet: </h2><p>{{ userWallet }}</p></li>
            <li><h2>ConsultantID: </h2><p>{{ userConsultantId }}</p></li>
          </ul>
        </div>
      </div>
  
      <div class="tariffs-page">
        <div class="all-tariffs">
          <div class="tariffs-container">
            <ul>
              <li><h2>Tariff: </h2></li>
  
              <!-- Перевіряємо наявність тарифу -->
              <li v-if="userTariff !== 'No tariff selected'">
                <div class="border">
                  <p>{{ userTariff }}</p>
                </div>
              </li>
  
              <!-- Якщо тариф відсутній, відображаємо кнопку для вибору тарифу -->
              <li v-else>
                <RouterLink to="/tariffs" class="buttonMenu">{{ $t('chooseTariff') }}</RouterLink>
              </li>
  
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default {
  name: 'UserPage',
  data() {
    return {
      userName: '',
      userEmail: '',
      userPhone: '',
      userWallet: '',
      userConsultantId: '',
      userTariff: '',  // Це поле з тарифом
    };
  },
  async created() {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDocRef = doc(db, `users/${user.uid}`);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          this.userName = userData.name || 'Error';
          this.userEmail = userData.email || 'We can`t find it';
          this.userPhone = userData.phone || 'We can`t find it';
          this.userWallet = userData.wallet || 'TRC20 Wallet Address';
          this.userConsultantId = userData.consultantId || 'We can`t find it';

          this.userTariff = userData.tariff ? userData.tariff : 'No tariff selected';

        } else {
          console.error('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      console.error('No user is signed in');
    }
  }
};
</script>

  
  <style scoped>
  @import "../assets/css/UserPage.css";
  </style>
  