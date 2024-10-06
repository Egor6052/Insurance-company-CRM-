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
           <div class="panelAdmin">
              <!-- Для Адміністратора -->

              <div v-if="isAdmin" class="listUsers">
                <div class="name">
                    <p>{{ $t('users') }}</p>
                </div>

                <div class="users">
                  <ul>
                    <li v-for="user in users" :key="user.id">
                      <div class="flexClass">
                        <h4>
                          {{ user.name }}
                        </h4>
                        <p class="ppp">
                          {{ user.email }}
                        </p>

                        <div class="position">
                          <p>
                            {{ user.position }}
                          </p>
                          
                        </div>
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
              </div>
                

                <div v-if="isConsultant || isAdmin" class="panelConsultant">
                  <div class="acceptUserToConsultant">
                    <!-- Налагодження тарифів -->
                      <div class="Title">
                        <p>{{ $t('UserToConsultant') }}</p>
                      </div>
                      
                      <div class="users">
                        <ul>
                          <li v-for="application in usersToConsultant" :key="application.id">
                            <div class="flexClass">
                              <h2>{{ application.name }}</h2>
                              <p>{{ application.email }}</p>
                            </div>

                            <div class="parent-container">
                              <button @click="() => { console.log(application); acceptUser(application.IDuser || application.id); }" class="Accept">
                                  {{ $t('AcceptToConsultant') }}
                              </button>


                              <button @click="() => { console.log(application.id); rejectUser(application.id); }" class="Reject">
                                {{ $t('RejectToConsultant') }}
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                  </div>
                </div>

                <!-- Налагодження тарифів -->
                <div v-if="isAdmin" class="tariff-settings">
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

                <!-- Додавання інструкції -->
                <div v-if="isAdmin" class="addInstruction">
                  <div class="Title">
                    <p>{{ $t('titleInstruction') }}</p>
                    <button @click="instructionModal" class="changeInstruction">{{ $t('changeInstruction') }}</button>
                  </div>

                  <div class="instruction">
                    <div class="input">
                       <!-- Виведення інструкції -->
                      <div v-for="(instruction, index) in instructions" :key="index" class="tex">
                        <div class="tex">
                          <p>{{ instruction }}</p>
                        </div>
                        
                      </div>
                     </div>
                  </div>

                  <!-- Модальне вікно для введення нової інструкції -->
                  <div v-if="showModalinstr" class="modal-instruction">
                    <div class="modal-content">
                      <span class="close" @click="instructionModal">&times;</span>
                        <p>{{ $t('changeInstruction') }}</p>

                      <textarea v-model="newInstruction" placeholder="Введіть нову інструкцію..."></textarea>
                      <div class="border">
                        <button @click="updateInstruction" class="changeInstruction">
                          <p>{{ $t('instructionUpdate') }}</p>
                        </button>
                      </div>
                    
                    </div>
                  </div>
                </div>

                <!-- Редагування гаманця для оплати -->
                <div v-if="isAdmin" class="addWallet">
                  <div class="Title">
                    <p>{{ $t('titleWallet') }}</p>
                    <button @click="openWalletModal" class="changeWallet">{{ $t('changeWallet') }}</button>
                  </div>

                    <div class="walletFolder">
                      <div class="input">
                        <!-- Виведення гаманця -->
                        <div class="tex">
                          <p>{{ wallet }}</p>
                        </div>
                      </div>

                  <!-- Модальне вікно -->
                  <div v-if="isWalletModalOpen" class="modal">
                    <div class="modal-content">
                      <span class="close" @click="closeWalletModal">&times;</span>

                      <div>
                        <label for="wallet">Wallet Address:</label>
                        <textarea v-model="wallet" id="wallet"></textarea>

                        <button @click="updateWallet">Зберегти зміни</button>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>


              <!-- Чат технічної підтримки через Telegram -->
              <div v-if="isAdmin" class="supportChatFolder">
                <div class="Title">
                  <p>{{ $t('titleSupportChat') }}</p>
                  <button @click="openChatModal" class="changeSupportChat">{{ $t('changeSupportChat') }}</button>
                </div>

                <div class="chatFolder">
                  <div class="input">
                    <!-- Виведення гаманця -->
                    <div class="tex">
                      <p>{{ chatID }}</p>
                    </div>
                  </div>

                  <!-- Модальне вікно -->
                  <div v-if="isChatModalOpen" class="modal">
                    <div class="modal-content">
                      <span class="close" @click="closeChatModal">&times;</span>

                      <div>
                        <label for="wallet">New Telegram ID:</label>
                        <textarea v-model="newChatID" id="wallet"></textarea>

                        <button @click="updateChatID">Зберегти зміни</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div v-if="isUser" class="panelUser">
              <div class="consultatStatus">
                <div class="Title">
                  <p>{{ $t('consultatStatus') }}</p>
                </div>

                <div class="button">
                  <div class="button">
                    <button @click="becomeConsultant" class="Accept">{{ $t('becomeConsultant') }}</button>
                  </div>
                </div>
              </div>
              </div>
            </div>



        </li>
        
      </ul>
      </div>

      <!-- Чат підтримки -->
      <div class="support-chat">
        <button @click="openTelegram">{{ $t('supportChat') }}</button>
      </div>

      <div v-if="paymentConfirmed" class="overlay">
        <div v-if="paymentConfirmed" class="confirmation-message">
          <p>{{ $t('paymentInReview') }}</p>
          <RouterLink to="/UserPage"><button>{{ $t('goToAccount') }}</button></RouterLink>
        </div>
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

          <div class="border">
            <button @click="saveTariffChanges" class="button-ok">{{ $t('save') }}</button>
            <button @click="closeEditModal" class="batton-exit">{{ $t('back') }}</button>
          </div>
          
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
import { doc, getDoc, updateDoc, deleteDoc, collection, getDocs, addDoc, query, where, getFirestore } from "firebase/firestore";
import { deleteUser as deleteAuthUser, onAuthStateChanged } from "firebase/auth";

export default {
  name: 'UserPage',
  data() {
    return {
      userId: null,
      statusConsultant: false,
      // chatOpen: false,
      isChatModalOpen: false,
      chatID: '',
      newChatID: '',
      isWalletModalOpen: false,
      wallet: '',
      wallets: [],
      user: null,
      users: [],

      usersToConsultant: [],

      tariffs: [],
      instructions: [],
      newInstruction: '',
      isModalOpen: false,
      newTariff: {
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
      firestore: null,
      showModalinstr: false,
    };
  },
  created() {
    
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDocRef = doc(db, `users/${user.uid}`);
        const userDoc = await getDoc(userDocRef);
        
        this.firestore = getFirestore();
        
        // Завантаження користувачів які хочуть бути консультантами
        await this.fetchUsersToConsultant();

        // Завантаження гаманця
        this.createdWallet();

        // Завантаження інструкції
        this.loadInstructions();

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
            console.log("Користувач є адміністратором, завантажую користувачів...");
            const users = await this.fetchUsers();
            await this.fetchUsers();
            console.log("Отримані користувачі для адміністратора:", users);
            this.usersToConsultant = users;
          }
        } else {
          console.error('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }

      // Завантажуємо chatID з Firestore
      try {
        const docRefChat = doc(db, 'supportChat', '1aONeejgoIf15kc3CCxu');  // Шлях до документа підтримки
        const docSnapChat = await getDoc(docRefChat);

        if (docSnapChat.exists()) {
          this.chatID = docSnapChat.data().chatID || '';  // Підставляємо chatID з поля "chatID"
        } else {
          console.error('Документ підтримки не знайдено');
        }
      } catch (error) {
        console.error('Помилка при завантаженні chatID:', error);
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
        
         // Ініціалізація тексту інструкції
         this.newInstruction = docSnap.data().text || '';
      } else {
        console.log("Інструкцію не знайдено");
      }
    } catch (error) {
      console.error("Помилка при отриманні інструкції:", error);
    }},



  async mounted() {
    // Викликаємо функцію для завантаження тарифів
    this.fetchTariffs();

    // Отримуємо користувачів з колекції заявок
    this.fetchApplications();
  },







  
  methods: {

   // Функція для прийняття користувача на роль консультанта
   async acceptUser(userId) {
    console.log(`Спроба прийняти користувача з ID: ${userId}`);
    if (!userId) {
        console.error('userId є undefined!');
        return;
    }

    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
            console.error(`Документ з ID ${userId} не існує.`);
            return;
        }
        
        await updateDoc(userRef, {
            position: 'consultant'
        });
        console.log(`Користувача ${userId} прийнято на позицію consultant.`);

        // Оновлення масиву користувачів
        this.usersToConsultant = this.usersToConsultant.filter(application => application.IDuser !== userId);
        
        // Логування для перевірки
        console.log(this.usersToConsultant); // Перевірте, чи заявка видалена
    } catch (error) {
        console.error('Не вдалося прийняти користувача:', error);
    }
},








    // Функція для відхилення користувача
    async rejectUser(userId) {
      try {
        // Створюємо запит на всі документи в колекції "ApplicationForConsultant"
        const q = query(collection(this.firestore, "ApplicationForConsultant"));
        const querySnapshot = await getDocs(q);

        let docIdToDelete = null; // Змінна для збереження ID документа для видалення

        // Перебираємо документи, щоб знайти той, що містить IDuser
        querySnapshot.forEach((doc) => {
          const applicationData = doc.data();
          if (applicationData.IDuser === userId) {
            docIdToDelete = doc.id; // Зберігаємо ID документа, якщо IDuser співпадає
          }
        });

        if (!docIdToDelete) {
          console.log(`Документ з IDuser ${userId} не знайдено.`);
          return; // Виходимо, якщо документ не знайдено
        }

        // Видаляємо документ
        const userDocRef = doc(this.firestore, `ApplicationForConsultant/${docIdToDelete}`);
        await deleteDoc(userDocRef);
        console.log(`Документ з ID ${docIdToDelete} видалено.`);
        
        // Оновлюємо список документів (опціонально)
        this.fetchUsersToConsultant(); // або будь-який інший метод для оновлення даних
      } catch (error) {
        console.error("Помилка при видаленні документа:", error);
      }
    },











    // Функція для отримання користувачів зі статусом консультанта
  async fetchApplications() {
      try {
          const users = await this.fetchUsers(); // Отримуємо загальних користувачів
          console.log("Отримані користувачі:", users);

          if (!users || users.length === 0) {
              console.error("Не вдалося отримати користувачів.");
              return;
          }

          const q = query(collection(db, "ApplicationForConsultant"));
          const querySnapshot = await getDocs(q);

          const applications = []; // Масив для заявок

          const usersMap = users.reduce((acc, user) => {
              acc[user.id] = user; // Зберігаємо користувачів за їх ID
              return acc;
          }, {});

          // Фільтруємо заявки для консультанта або адміністратора
          querySnapshot.forEach((doc) => {
              const applicationData = { id: doc.id, ...doc.data() }; // Дані заявки
              const user = usersMap[applicationData.IDuser]; // Знаходимо користувача

              // Якщо користувач існує і це адміністратор або консультант
              if (user && (this.isConsultant || this.isAdmin)) {
                  applications.push({ 
                      id: applicationData.id, // ID заявки
                      userId: applicationData.IDuser, // ID користувача
                      name: user.name, // Ім'я
                      email: user.email // Email
                  }); 
              }
          });

          this.usersToConsultant = applications; 
          console.log("Заявки на консультанта:", this.usersToConsultant); 
      } catch (error) {
          console.error("Помилка при отриманні заявок:", error);
      }
  },










    
    // Функція для зміни статусу користувача
    async becomeConsultant() {
      const user = auth.currentUser;

      if (user) {
        try {
          // Посилання на колекцію ApplicationForConsultant
          const applicationRef = collection(db, "ApplicationForConsultant");
          
          // Запит для перевірки, чи вже існує заявка для цього користувача
          const q = query(applicationRef, where("IDuser", "==", user.uid));
          const querySnapshot = await getDocs(q);

          // Перевірка, чи знайдено документи
          if (!querySnapshot.empty) {
            alert('Ви вже подали заявку на консультанта.');
            return; // Зупиняємо виконання, якщо заявка вже існує
          }

          // Якщо заявки ще немає, додаємо нову
          await addDoc(applicationRef, {
            IDuser: user.uid,
          });

          alert('Заявку відправлено!');
        } catch (error) {
          console.error('Помилка при відправленні заявки:', error);
          alert('Сталася помилка при відправленні заявки.');
        }
      } else {
        console.error('Користувач не авторизований');
        alert('Потрібно увійти в систему, щоб стати консультантом.');
      }
    },


    // Логіка для отримання заявок
    async fetchUsersToConsultant() {
  try {
    // Отримуємо заявки на консультанта
    const q = query(collection(this.firestore, "ApplicationForConsultant"));
    const querySnapshot = await getDocs(q);

    // Отримуємо всі ID користувачів з заявок
    const applicationUserIds = querySnapshot.docs.map(docSnapshot => docSnapshot.data().IDuser);
    console.log("ID користувачів з заявок:", applicationUserIds);

    // Обробляємо запит для всіх користувачів
    const usersPromises = applicationUserIds.map(async (userId) => {
      const userDocRef = doc(this.firestore, `users/${userId}`);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return { id: userId, ...userDoc.data() };
      } else {
        console.log(`Користувача з ID ${userId} не знайдено в базі`);
        return null;
      }
    });

    // Отримуємо тільки користувачів, що існують
    const users = (await Promise.all(usersPromises)).filter(Boolean);
    console.log("Відфільтровані користувачі:", users);

    // Присвоюємо отриманих користувачів для подальшого відображення
    this.usersToConsultant = users;
  } catch (error) {
    console.error("Помилка при отриманні користувачів:", error);
  }
},













  //   async created() {
  //   const user = auth.currentUser; // Ваша логіка аутентифікації
  //   if (user) {
  //     this.userId = user.uid;
  //   }
  // },

    openTelegram() {
      // Перевіряємо chatID
      if (this.chatID) {
        // Лог для перевірки значення chatID
        // console.log('chatID:', this.chatID);
        const formattedChatID = this.chatID.replace('@', '');
        // Формуємо URL та відкриваємо
        const telegramUrl = `https://t.me/${formattedChatID}`;
        
        window.open(telegramUrl, '_blank');
      } else {
        alert('Немає доступного chatID для переходу.');
      }
    },

    // Для оновлення гаманцю
    openChatModal() {
      this.isChatModalOpen = true;  // Відкриваємо модальне вікно
    },

    closeChatModal() {
      this.isChatModalOpen = false;  // Закриття модального вікна
    },

    // Для оновлення чату підтримки
    async updateChatID() {
      if (this.newChatID.trim() !== '') {
        try {
          const docRef = doc(db, 'supportChat', '1aONeejgoIf15kc3CCxu');
          await updateDoc(docRef, {
            chatID: this.newChatID.trim()  // Оновлюємо chatID в Firestore
          });
          this.chatID = this.newChatID.trim();  // Оновлюємо локально
          this.newChatID = '';  // Очищаємо поле нового chatID
          this.isChatModalOpen = false;  // Закриваємо модальне вікно
          alert('Chat ID оновлено успішно');
        } catch (error) {
          console.error('Помилка при оновленні chatID:', error);
        }
      } else {
        alert('Введіть новий chat ID');
      }
    },

    // Функція для отримання гаманців з Firestore та оновлення поля "wallet"
    async createdWallet() {
      try {
        // console.log("Завантаження даних з Firestore...");

        const docRef = doc(db, "wallets", "h8kj0fwHOiE07hS01fAh"); // Шлях до документа
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // console.log("Документ знайдено, отримуємо дані...");

          // Отримуємо дані з Firestore і зберігаємо в конкретне поле
          const walletData = docSnap.data();
          // console.log("Дані з Firestore:", walletData);

          // Зберігаємо значення поля "wallet" з Firestore
          this.wallet = walletData.wallet || '';  // Оновлюємо значення гаманця (не масив)
        } else {
          console.error("Документ не знайдено");
        }
      } catch (error) {
        console.error("Помилка при завантаженні даних:", error);
      }
    },

    // Для оновлення гаманцю
    openWalletModal() {
      this.isWalletModalOpen = true;  // Відкриваємо модальне вікно
    },
    closeWalletModal() {
      this.isWalletModalOpen = false;  // Закриваємо модальне вікно
    },
    
    // Для оновлення гаманцю
    async updateWallet() {
      try {
        const docRef = doc(db, "wallets", "h8kj0fwHOiE07hS01fAh"); // Шлях до документа
        await updateDoc(docRef, {
          wallet: this.wallet,  // Оновлюємо поле "wallet" в Firestore
        });

        alert('Зміни збережено!');
      } catch (error) {
        console.error("Помилка при оновленні поля wallet:", error);
      }
    },

    // Відкриваємо або закриваємо модальне вікно
    instructionModal() {
      this.showModalinstr = !this.showModalinstr;
    },

    async updateInstruction() {
      try {
        const docRef = doc(db, "instruction", "rgBhZDY3xqPq0DTgLmNk");

        await updateDoc(docRef, {
          text: this.newInstruction
        });

        // alert('Інструкцію оновлено!');
        this.instructions = [this.newInstruction];  // Оновлюємо локальну інструкцію
        this.instructionModal();

      } catch (error) {
        console.error("Помилка при оновленні інструкції:", error);
      }
    },

    // Вивод інструкції
    async loadInstructions() {
      try {
        const docRef = doc(db, "instruction", "rgBhZDY3xqPq0DTgLmNk");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Якщо є інструкція, додаємо її до масиву instructions
          const instructionText = docSnap.data().text || 'Інструкція відсутня';
          this.instructions.push(instructionText);
        } else {
          console.error("Інструкцію не знайдено");
        }
      } catch (error) {
        console.error("Помилка при отриманні інструкції:", error);
      }
    },
    
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

    // // Метод для переходу на сторінку реєстрації із тарифом
    // register(tariffId, tariffName) {
    //   this.$router.push({ name: 'Register', params: { tariffId }, query: { tariffName } });
    // },


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
          // statusConsultant: false,
          position: 'admin'
        });
        console.log(`User with ID ${userId} is now an admin`);
        
        // Оновлюємо користувача в інтерфейсі після зміни
        this.users = this.users.map(user =>
          user.id === userId ? { ...user,
            // statusConsultant: false,
            position: 'admin' 
          } : user
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
          // statusConsultant: false,
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
          // statusConsultant: false,
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
          // statusConsultant: false,
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
    // Поки нема кнопки, є нюанси в розробці
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
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        this.users = users; // Зберігаємо користувачів у реактивну змінну
        console.log("Отримані користувачі для адміністратора:", this.users); // Лог після присвоєння
        return users; // Можливо, вам не потрібно повертати users
      } catch (error) {
        console.error("Не вдалося отримати користувачів:", error);
        this.users = []; // Очищуємо масив користувачів у разі помилки
        return []; // Повертаємо порожній масив
      }
    },










   
  }
};
</script>





<style scoped>
@import "../assets/css/UserPage.css";
</style>
