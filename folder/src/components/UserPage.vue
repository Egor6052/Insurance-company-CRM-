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
           <div v-if="isAdmin" class="panel">
              <!-- Для Адміністратора -->

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

                      <div class="parent-container">
                        <!-- Кнопка для створення консультанта -->
                        <button v-if="user.position === 'user'" @click="AddConsultant(user.id)" class="consultant-button">{{ $t('addConsultant') }}</button>
                        
                        <!-- Кнопка для забирання прав консультанта -->
                        <button v-if="user.position === 'consultant'" @click="RemoveConsultant(user.id)" class="removeConsultant-button">{{ $t('removeConsultant') }}</button>
                        
                        <!-- Кнопка для створення адміна -->
                        <button v-if="user.position === 'user' || user.position === 'consultant'" @click="AddAdminUser(user.id)" class="admin-button">{{ $t('addAdmin') }}</button>
                        
                        <!-- Кнопка для забирання прав адміністратора -->
                        <button v-if="user.position === 'admin'" @click="RemoveAdmin(user.id)" class="user-button">{{ $t('removeAdmin') }}</button>

                        <!-- Кнопка для видалення -->
                        <!-- <button @click="deleteUser(user.id)" class="delete-button">{{ $t('delete') }}</button> -->
                      </div>
                    </li>
                  </ul>
                </div>

                <!-- Налагодження тарифів -->
                <div class="tariff-settings">
                  <div class="Title">
                    <p>{{ $t('tariffTitle') }}</p>
                    
                    <!-- Кнопка для додавання нового тарифу -->
                     <div class="parent-container">
                        <button @click="openAddTariffModal" class="add-tariff-button">{{ $t('addTariff') }}</button>
                     </div>

                  </div>
                  
                  <div class="tariffs">
                    <ul>
                      <li v-for="tariff in tariffs" :key="tariff.id">

                        <div class="flexClass">
                          <h2>{{ tariff.name }}</h2>
                          <p>{{ tariff.description }}</p>
                        </div>
                        
                        <div class="price">
                          <p>{{ tariff.price }} {{ $t('$') }}</p>
                        </div>



                        <div class="parent-container">
                        <button @click="changeTariff(tariff.id)" class="changeTariff">
                          <div class="imgConteiner">
                            <img src="../assets/icons/pencil.png" alt="Edit">
                          </div>
                        </button>

                        <button @click="deleteTariff(tariff.id)" class="deleteTariff">
                          <div class="imgConteiner">
                            <img src="../assets/icons/free-icon-bin-839571.png" alt="Delete">
                          </div>
                        </button>
                        </div>

                      </li>
                    </ul>
                  </div>
                </div>

                <div class="addInstruction">
                  <div class="Title">
                    <p>{{ $t('titleInstruction') }}</p>
                  </div>


                  <div class="instruction">
                    <div class="input">
                      <!-- Поле для введення тексту інструкції -->
                      <textarea v-model="instructionText" rows="5" cols="30" placeholder="Редагуйте інструкцію тут..."></textarea>
                    </div>
                    <button @click="changeInstruction" class="changeInstruction">
                      <div class="imgContainer">
                        <img src="../assets/icons/pencil.png" alt="Edit">
                      </div>
                    </button>
                  </div>

                </div>


              <!-- <div v-if="isConsultant" class="consultant-panel">

              </div> -->

              <!-- Для звичайного користувача -->
              <!-- <div v-if="isUser" class="user-panel">
                <p>Your User!</p>
              </div> -->

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
   

      <!-- Модальне вікно для редагування тарифу -->
      <div v-if="isEditModalOpen" class="modal-tariff">
        <div class="modal-content">
          <h3>Редагувати тариф</h3>

          <label for="tariffName">{{ $t('nameTariff') }}:</label>
          <input v-model="newTariff.name" id="tariffName" type="text" placeholder="Назва" />

          <label for="tariffDescription">{{ $t('descriptionTariff') }}:</label>
          <input v-model="newTariff.description" id="tariffDescription" type="text" placeholder="Опис" />

          <label for="tariffPrice">{{ $t('costTariff') }}:</label>
          <input v-model="newTariff.price" id="tariffPrice" type="number" placeholder="Ціна" />

          <button @click="saveTariffChanges" class="button-ok">{{ $t('save') }}</button>
          <button @click="closeEditModal" class="batton-exit">{{ $t('back') }}</button>
        </div>
      </div>


      <!-- Модальне вікно для додавання тарифу -->
      <div v-if="isModalOpen" class="modal-tariff">
        <div class="modal-content">
          <h3>{{ $t('addNewTariff') }}</h3>

          <label for="tariffName">{{ $t('nameTariff') }}:</label>
          <input v-model="newTariff.name" id="tariffName" type="text" placeholder="Назва" />

          <label for="tariffDescription">{{ $t('descriptionTariff') }}:</label>
          <input v-model="newTariff.description" id="tariffDescription" type="text" placeholder="Опис" />

          <label for="tariffPrice">{{ $t('costTariff') }}:</label>
          <input v-model="newTariff.price" id="tariffPrice" type="number" placeholder="Ціна" />

          <div class="buttons">
            <button @click="addTariff" class="button-add">{{ $t('addNewTariffButton') }}</button>
            <button @click="closeModal" class="batton-exit">{{ $t('back') }}</button>
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
import { doc, getDoc, updateDoc, deleteDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { deleteUser as deleteAuthUser, onAuthStateChanged } from "firebase/auth";

export default {
  name: 'UserPage',
  data() {
    return {
      users: [],
      tariffs: [],        // Масив для тарифів
      isModalOpen: false, // Контроль модального вікна
      newTariff: {        // Дані нового тарифу
        name: '',
        description: '',
        price: 0,
      },
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
      isConsultant: false,

      isEditModalOpen: false,
      selectedTariffId: null,

      instructionText: '',
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
            this.isConsultant = this.userPosition === "consultant";

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


  async createdInstruction() {
    try {
      // Отримуємо поточну інструкцію з Firestore
      const docRef = doc(db, "instruction", "rgBhZDY3xqPq0DTgLmNk");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Записуємо отриманий текст у поле
        this.instructionText = docSnap.data().text;
      } else {
        console.log("Інструкцію не знайдено");
      }
    } catch (error) {
      console.error("Помилка при отриманні інструкції:", error);
    }},


  async mounted() {
    // Викликаємо функцію для завантаження тарифів
    this.fetchTariffs();
  },
  methods: {
    
    // Редагування інструкції
    async changeInstruction() {
      try {
        const docRef = doc(db, "instruction", "rgBhZDY3xqPq0DTgLmNk");

        await updateDoc(docRef, {
          text: this.instructionText
        });

        alert('Інструкцію оновлено!');
      } catch (error) {
        console.error("Помилка при оновленні інструкції:", error);
      }
    },
    
    // Відкрити модальне вікно з даними тарифу для редагування
    changeTariff(tariffId) {
      const tariff = this.tariffs.find(t => t.id === tariffId); // Знайти тариф за ID
      if (tariff) {
        this.selectedTariffId = tariffId;
        this.newTariff = { ...tariff }; // Копіювати дані тарифу у форму
        this.isEditModalOpen = true; // Відкрити модальне вікно
      }
    },

    // Закрити модальне вікно без збереження
    closeEditModal() {
      this.isEditModalOpen = false;
      this.newTariff = { name: '', description: '', price: 0 };
    },

    // Функція для зміни тарифу
    async saveTariffChanges() {
      try {
        const docRef = doc(db, 'tariffs', this.selectedTariffId);
        await updateDoc(docRef, {
          name: this.newTariff.name,
          description: this.newTariff.description,
          price: parseFloat(this.newTariff.price),
        });

        // Оновити список тарифів після редагування
        this.fetchTariffs();

        // Закрити модальне вікно після збереження
        this.closeEditModal();
      } catch (error) {
        console.error('Error updating tariff:', error);
      }
    },

     // Функція для видалення тарифу
     async deleteTariff(tariffId) {
      if (confirm('Ви впевнені, що хочете видалити цей тариф?')) {
        try {
          const docRef = doc(db, 'tariffs', tariffId);
          await deleteDoc(docRef);

          this.fetchTariffs();
        } catch (error) {
          console.error('Error deleting tariff:', error);
        }
      }
    },


    // Відкрити модальне вікно для додавання нового тарифу
    openAddTariffModal() {
      this.isModalOpen = true;
    },

    // Закрити модальне вікно
    closeModal() {
      this.isModalOpen = false;
    },

    // Додати новий тариф у Firestore
    async addTariff() {
      try {
        if (!this.newTariff.name) {
          alert('Будь ласка, введіть назву тарифу');
          return;
        }
        if (!this.newTariff.description) {
          alert('Будь ласка, введіть опис тарифу');
          return;
        }
        if (!this.newTariff.price || this.newTariff.price <= 0) {
          alert('Будь ласка, введіть коректну ціну тарифу');
          return;
        }

        // Створюємо новий документ в колекції tariffs
        await addDoc(collection(db, 'tariffs'), {
          name: this.newTariff.name,
          description: this.newTariff.description,
          price: parseFloat(this.newTariff.price),
        });

        // Очищуємо форму після додавання
        this.newTariff = { name: '', description: '', price: 0 };

        // Закриваємо модальне вікно
        this.closeModal();

        // Оновлюємо список тарифів
        this.fetchTariffs();
      } catch (error) {
        console.error('Error adding tariff: ', error);
      }
    },


      // Функція для отримання тарифів з колекції "tariffs"
      async fetchTariffs() {
        try {
          // Отримуємо колекцію тарифів з Firestore
          const tariffsCollection = collection(db, 'tariffs');
          const tariffsSnapshot = await getDocs(tariffsCollection);
          
          // Преобразовуємо всі документи в масив тарифів
          this.tariffs = tariffsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
        } catch (error) {
          console.error('Error fetching tariffs:', error);
        }
      },
    // Метод для переходу на сторінку реєстрації із тарифом
    register(tariffId, tariffName) {
      this.$router.push({ name: 'Register', params: { tariffId }, query: { tariffName } });
    },


    // Перевірка тарифу який обрав юзер
      async fetchTariffInfo(tariffId) {
        try {
          // Отримуємо колекцію "tariffs"
          const tariffsCollection = collection(db, 'tariffs');
          
          // Отримуємо всі документи з колекції
          const tariffsSnapshot = await getDocs(tariffsCollection);
          
          // Перетворюємо документи на масив об'єктів
          const tariffsList = tariffsSnapshot.docs.map(doc => ({
            id: doc.id,        // Унікальний id документа
            ...doc.data()      // Дані документа (назва, ціна, опис тощо)
          }));

          // Знаходимо тариф за doc.id
          const selectedTariff = tariffsList.find(tariff => tariff.id === tariffId);

          if (selectedTariff) {
            this.userTariffInfo = selectedTariff;  // Встановлюємо обраний тариф
          } else {
            console.error('Tariff not found');  // Якщо тариф не знайдений
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


    // Функція для надання прав адміністратора
    async AddAdminUser(userId) {
      try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
          position: 'admin'
        });
        console.log(`User with ID ${userId} is now an admin`);
        
        // Оновлюємо користувача в інтерфейсі після зміни
        this.users = this.users.map(user =>
          user.id === userId ? { ...user, position: 'admin' } : user
        );
      } catch (error) {
        console.error('Error updating user to admin:', error);
      }
    },
    
     // Функція для забирання прав адміністратора
     async RemoveAdmin(userId) {
      try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
          position: 'user'
        });
        console.log(`User with ID ${userId} is now an user`);
        
        // Оновлюємо користувача в інтерфейсі після зміни
        this.users = this.users.map(user =>
          user.id === userId ? { ...user, position: 'user' } : user
        );
      } catch (error) {
        console.error('Error updating user to user:', error);
      }
    },
    
    // Функція для надання прав консультанта
    async AddConsultant(userId) {
      try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
          position: 'consultant'
        });
        console.log(`User with ID ${userId} is now an consultant`);
        
        // Оновлюємо користувача в інтерфейсі після зміни
        this.users = this.users.map(user =>
          user.id === userId ? { ...user, position: 'consultant' } : user
        );
      } catch (error) {
        console.error('Error updating user to consultant:', error);
      }
    },

    // Функція для забирання прав консультанта
    async RemoveConsultant(userId) {
      try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
          position: 'user'
        });
        console.log(`User with ID ${userId} is now an user`);
        
        // Оновлюємо користувача в інтерфейсі після зміни
        this.users = this.users.map(user =>
          user.id === userId ? { ...user, position: 'user' } : user
        );
      } catch (error) {
        console.error('Error updating user to user:', error);
      }
    },
  

    // Функція для видалення користувача з Firestore та Authentication
    async deleteUser(userId) {
      try {
        // Видаляємо користувача з Firestore
        const userDocRef = doc(db, 'users', userId);
        await deleteDoc(userDocRef);
        this.users = this.users.filter(user => user.id !== userId);

        // Отримуємо залогіненого користувача
        const user = auth.currentUser;

        if (user && user.uid === userId) {
          // Видаляємо користувача з Firebase Authentication
          await deleteAuthUser(user);
          console.log(`User with ID ${userId} has been deleted from Firebase Authentication.`);
        } else {
          console.log("You can only delete the currently signed-in user from Firebase Authentication.");
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

    openTelegram() {
      window.open('https://t.me/CEO_BigCat', '_blank');
    },
  }
};
</script>





<style scoped>
@import "../assets/css/UserPage.css";
</style>
