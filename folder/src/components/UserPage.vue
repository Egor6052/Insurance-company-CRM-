<template>
  <div class="user-page">
    <!-- Шапка -->
    <div class="header">
      <div class="battonBack">
        <RouterLink to="/" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
      </div>
    </div>


    <div class="folders">
      <ul>
        <li>
           <!-- Информация о пользователе -->
          <div class="page">
              <div class="user-header">
                <ul>
                  <li>
                    <div class="user-icon">
                      <img src="../assets/icons/user.png" class="icon-img" alt="User">
                    </div>
                  </li>

                  <li>
                    <div class="user-info">
                      <ul>
                        <li><h1>{{ userName }}</h1></li>
                        <li>
                          <div v-if="isAdmin" class="admin-message">
                            <p>Ви адміністратор!</p>
                          </div>
                          <div v-if="isConsultant" class="admin-message">
                            <p>Ви Консультант!</p>
                          </div>
                        </li>
                        
                        <li><strong>{{ $t('Email') }}:</strong><p>{{ userEmail }}</p></li>
                        <li><strong>{{ $t('PhoneNumber') }}:</strong><p>{{ userPhone }}</p></li>
                        <li><strong>{{ $t('Wallet') }}:</strong><p>{{ userWallet }}</p></li>
                        <li><strong>{{ $t('ConsultantID') }}:</strong><p>{{ userConsultantId }}</p></li>
                        
                      </ul>
                    </div>
                  </li>

                  <li>
                    <button class="change" @click="showModal = true">
                      <div class="imgConteiner">
                        <img src="../assets/icons/pencil.png" alt="Edit">
                      </div>
                    </button>
                  </li>
                </ul>
            </div>
          </div>
        </li>

        <li>
          <!-- Тарифи -->
          <div v-if="userTariffInfo" class="tariffs-page">
              <div class="all-tariffs">
                <div class="tariffs-container">
                  <div class="headerTariff"><strong>{{ $t('selectedTariff') }}</strong></div>

                  <div class="class-ul">
                    <ul>

                      <li>
                        <div class="border">
                          <p><strong>{{ userTariffInfo.name }}</strong></p>
                        </div>
                      </li>

                      <li>
                        <div class="details">
                          <ul>
                            <li>
                              <strong>{{ $t('descriptionTariff') }}:</strong><p>{{ userTariffInfo.description }}</p>
                              <p>{{ userTariffInfo.price }} {{ $t('$') }}</p>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
        </li>
        

        <li>
          <!-- Панель налаштувань для адміністратора -->
           <div class="panel">
              <!-- Для Адміністратора -->
              <div v-if="isAdmin" class="admin-panel">
                <div class="settings">
                  
                </div>

                <div class="name">
                    <p>{{ $t('users') }}</p>
                </div>

                <div class="users">
                  <ul>
                    <li v-for="user in users" :key="user.id">
                      <h4>
                        {{ user.name }}
                      </h4>
                      <p>
                        {{ user.email }}
                      </p>

                      <div class="position">
                        {{ user.position }}
                      </div>

                      <!--  -->
                      <div v-if="user.position === 'user'">
                         <!-- Кнопка для створення адміна -->
                       <button @click="AddAdminUser(user.id)" class="admin-button">{{ $t('addAdmin') }}</button>
                      </div> 
                      
                      <!-- Кнопка для видалення -->
                      <button @click="deleteUser(user.id)" class="delete-button">{{ $t('delete') }}</button>
                    </li>
                  </ul>
                </div>

              </div>

              <div v-if="isConsultant" class="consultant-panel">

              </div>

              <!-- Для звичайного користувача -->
              <div v-if="isUser" class="user-panel">
                <p>Your User!</p>
              </div>

           </div>
         

        </li>
      </ul>
    </div>

    <!-- Чат підтримки -->
    <div class="support-chat">
        <button @click="openTelegram">{{ $t('supportChat') }}</button>
        <!-- <div v-if="chatOpen" class="chat-window"> -->
          <!-- <p>{{ $t('chatWindow') }}</p> -->
          <!-- Відкриття чату в новому вікні
          <iframe v-if="chatOpen" :src="telegramUrl" width="400" height="600" frameborder="0"></iframe> -->
        <!-- </div> -->
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
import { doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { deleteUser as deleteAuthUser, onAuthStateChanged } from "firebase/auth"; // Імпорт deleteUser

export default {
  name: 'UserPage',
  data() {
    return {
      users: [],
      userName: '',
      userEmail: '',
      userPhone: '',
      userWallet: '',
      userConsultantId: '',
      userTariff: '',
      userTariffInfo: null,
      showModal: false,
      isAdmin: false,
      isUser: false,
    };
  },
  created() {
    onAuthStateChanged(auth, async (user) => {
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
            this.userTariff = userData.tariff || 'No tariff selected';
            this.userPosition = userData.position || 'Position is not found';
            
            if (this.userTariff !== 'No tariff selected') {
              await this.fetchTariffInfo(this.userTariff);
            }

            this.isAdmin = this.userPosition === "admin";
            this.isUser = this.userPosition === "user";

            if (this.isAdmin) {
              await this.fetchUsers();
            }

          } else {
            console.error('No user data found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.error('No user is signed in');
        this.$router.push('/login');
      }
    });
  },
  methods: {
    async fetchTariffInfo(tariffId) {
      try {
        const docRef = doc(db, 'tariffs', 'beNOUQ1b9ffvpRNDKxS4'); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const tariffsData = docSnap.data();
          const tariffs = [
            { ...tariffsData.Basic, id: 1 },
            { ...tariffsData.Standard, id: 2 },
            { ...tariffsData.Premium, id: 3 },
            { ...tariffsData.Deluxe, id: 4 }
          ];

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
          this.showModal = false; 
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      }
    },

    // Функція для видалення користувача з Firestore та Authentication
    async deleteUser(userId) {
      try {
        // Видаляємо користувача з Firestore
        const userDocRef = doc(db, 'users', userId);
        await deleteDoc(userDocRef);
        this.users = this.users.filter(user => user.id !== userId);

        // Отримуємо користувача Firebase Authentication
        const user = auth.currentUser;

        if (user && user.uid === userId) {
          // Видаляємо користувача з Firebase Authentication
          await deleteAuthUser(user);
          console.log(`User with ID ${userId} has been deleted from Firebase Authentication.`);
        }

        console.log(`User with ID ${userId} has been deleted from Firestore and Authentication.`);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },

    async fetchUsers() {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        this.users = usersList;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  }
};
</script>





<style scoped>
@import "../assets/css/UserPage.css";
</style>
