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
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

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
  methods: {
    async handleSubmit() {
      try {
        const { username, password } = this.form;
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        console.log('User successfully signed in:', userCredential.user);
        this.$router.push('/'); // Редирект на главную страницу после успешного входа
      } catch (error) {
        console.error('Error signing in:', error);
        alert('Authentication failed. Please try again.');
      }
    },
    signInWithGoogle() {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          console.log("User signed in: ", result.user);
          this.$router.push('/'); // Редирект на главную страницу после успешного входа
        })
        .catch((error) => {
          console.error("Error signing in with Google: ", error);
          alert("Authentication failed. Please try again.");
        });
    }
  }
}
</script>

<style scoped>
@import "../assets/css/LoginPage.css";

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
