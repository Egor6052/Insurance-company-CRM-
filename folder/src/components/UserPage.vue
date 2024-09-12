<template>
  <div class="user-page">
    <div class="header">
      <div class="battonBack">
        <RouterLink to="/" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
      </div>
      
      <button class="change" @click="showModal = true">
        <div class="imgConteiner">
          <img src="../assets/icons/pencil.png" alt="Edit">
        </div>
      </button>
    </div>

    <!-- Информация о пользователе -->
    <div class="user-header">
      <div class="user-icon">
        <img src="../assets/icons/user.png" class="icon-img" alt="User">
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

    <!-- Тарифы -->
    <div class="tariffs-page">
      <div class="all-tariffs">
        <div class="tariffs-container">
          <div class="headerTariff"><p>Обраний тариф</p></div>
          <ul>
            <li v-if="userTariffInfo">
              <div class="border">
                <p><strong>{{ userTariffInfo.name }}</strong></p>
                <li>
                  <p>{{ userTariffInfo.description }}</p>
                  <p>{{ userTariffInfo.price }} {{ $t('$') }}</p>
                </li>
              </div>
            </li>
            <li v-else>
              <RouterLink to="/tariffs" class="buttonMenu">{{ $t('chooseTariff') }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Модальное окно для редактирования данных -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Edit User Data</h2>

        <form @submit.prevent="saveUserData">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="userName" />
          </div>
          <div class="form-group">
            <label for="phone">Phone number</label>
            <input type="text" v-model="userPhone" />
          </div>
          <div class="form-group">
            <label for="wallet">Wallet</label>
            <input type="text" v-model="userWallet" />
          </div>
          <div class="form-group">
            <label for="consultantId">Consultant ID</label>
            <input type="text" v-model="userConsultantId" />
          </div>
          <button type="submit" class="submit-button">Save</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default {
  name: 'UserPage',
  data() {
    return {
      userName: '',
      userEmail: '',
      userPhone: '',
      userWallet: '',
      userConsultantId: '',
      userTariff: '',
      userTariffInfo: null,
      showModal: false
    };
  },
  async created() {
    const user = auth.currentUser;
    if (user) {
      try {
        // Получаем данные пользователя
        const userDocRef = doc(db, `users/${user.uid}`);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          this.userName = userData.name || 'Error';
          this.userEmail = userData.email || 'We can`t find it';
          this.userPhone = userData.phone || 'We can`t find it';
          this.userWallet = userData.wallet || 'TRC20 Wallet Address';
          this.userConsultantId = userData.consultantId || 'We can`t find it';
          this.userTariff = userData.tariff || 'No tariff selected';

          // Получаем информацию о тарифе, если он выбран
          if (this.userTariff !== 'No tariff selected') {
            await this.fetchTariffInfo(this.userTariff);
          }

        } else {
          console.error('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      console.error('No user is signed in');
    }
  },
  methods: {
    async fetchTariffInfo(tariffId) {
    try {
      // Доступ к документу с тарифами
      const docRef = doc(db, 'tariffs', 'beNOUQ1b9ffvpRNDKxS4'); // Замените 'tariffsDocumentId' на фактический ID документа
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const tariffsData = docSnap.data();
        
        // Преобразование данных в массив тарифов
        const tariffs = [
          { ...tariffsData.Basic, id: 1 },
          { ...tariffsData.Standard, id: 2 },
          { ...tariffsData.Premium, id: 3 },
          { ...tariffsData.Deluxe, id: 4 }
        ];

        // Поиск нужного тарифа по ID
        const selectedTariff = tariffs.find(tariff => tariff.id === parseInt(tariffId));

        if (selectedTariff) {
          this.userTariffInfo = selectedTariff;
        } else {
          console.error('Tariff not found');
        }
      } else {
        console.error('Tariffs document not found');
      }
    } catch (error) {
      console.error('Error fetching tariff data:', error);
    }
  },
    async saveUserData() {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, `users/${user.uid}`);
          await updateDoc(userDocRef, {
            name: this.userName,
            email: this.userEmail,
            phone: this.userPhone,
            wallet: this.userWallet,
            consultantId: this.userConsultantId
          });
          this.showModal = false; // Закрываем модальное окно
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
@import "../assets/css/UserPage.css";
</style>