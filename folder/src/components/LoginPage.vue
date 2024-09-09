<template>
    <div class="login-page">
      <div class="battonBack">
        <RouterLink to="/" class="Accept">{{ $t('back') }}</RouterLink>
      </div>
  
      <h1>{{ $t('login') }}</h1>
  
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="username">{{ $t('username') }}:</label>
          <input type="text" id="username" v-model="form.username" required />
        </div>
        <div class="form-group">
          <label for="password">{{ $t('password') }}:</label>
          <input type="password" id="password" v-model="form.password" required />
        </div>
        <button type="submit" class="submit-button">{{ $t('login') }}</button>
      </form>
  
      <button @click="signInWithGoogle" class="google-login-button">
        Войти с Google
      </button>
    </div>
  </template>
  
  <script>
  // import { auth, googleProvider } from "../firebase"; // Підключення Firebase
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      };
    },
    // methods: {
    //   handleSubmit() {
    //     // Обробка звичайного входу через форму
    //     console.log('Form submitted:', this.form);
    //   },
    //   signInWithGoogle() {
    //     // Вхід через Google
    //     auth.signInWithPopup(googleProvider)
    //       .then((result) => {
    //         console.log("User signed in: ", result.user);
    //         // Додайте сюди редірект після успішного входу, якщо необхідно
    //       })
    //       .catch((error) => {
    //         console.error("Error signing in with Google: ", error);
    //       });
    //   }
    // }
  }
  </script>
  
  <style scoped>
  @import "../assets/css/LoginPage.css";
  
  /* Стили для кнопки входу через Google */
  .google-login-button {
    background-color: #4285f4;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .google-login-button:hover {
    background-color: #357ae8;
  }
  </style>
  