<template>
    <div class="SelectedUser">
  
      <!-- Шапка -->
      <div class="header">
        <div class="battonBack">
          <RouterLink to="/UserPage" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
        </div>
      </div>
  
      <div class="page" v-if="user">
        <h1>{{ user.name }}</h1>
        <p>Email: {{ user.email }}</p>
        <p>Position: {{ user.position }}</p>
        <p>ID: {{ user.id }}</p>
        <!-- Тут можна додати інші поля -->
        </div>

        <!-- Якщо користувача не знайдено або йде завантаження -->
        <div v-else>
        <p>Користувач не знайдений або інформація завантажується...</p>
    </div>

  
    </div>
  </template>
  
  <script>
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
    name: 'SelectedUser',
    data() {
      return {
        user: null,
      };
    },
    async mounted() {
        const userId = this.$route.params.userId;
        await this.fetchUser(userId); 
    },
    methods: {
        async fetchUser(userId) {
      try {
        // Скидаємо попередні значення
        this.loading = true;
        this.error = null;

        // Отримуємо користувача з бази даних за його ID
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          this.user = { id: userDoc.id, ...userDoc.data() };
        } else {
          this.error = "Користувача не знайдено";
        }
      } catch (error) {
        this.error = "Помилка при отриманні користувача: " + error.message;
      } finally {
        this.loading = false; // Завантаження завершене
      }
    },

    }
  };
  </script>
  
  <style scoped>
  @import '../assets/css/SelectedUser.css';
  </style>
  