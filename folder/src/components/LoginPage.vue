<template>
  <div class="login-page">

     <!-- Шапка -->
     <div class="header">
      <div class="battonBack">
        <RouterLink to="/" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
      </div>
      <div class="logo">
        <h1>{{ $t('company') }}</h1>
      </div>
    </div>

      <div class="login">
        <h1>{{ $t('login') }}</h1>
      </div>
    <!-- <h1>{{ $t('company') }}</h1> -->
    

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

    <!-- Читай нище причину  -->

    <!-- <button @click="signInWithGoogle" class="google-login-button">{{ $t('EnterWithGoogle') }}
      <div class="imgConteiner">
        <img src="../assets/icons/google(1).png" alt="">
      </div>
    </button> -->
  </div>
</template>

<script>
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// import { auth, googleProvider } from "../firebase";
// import { signInWithPopup } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";

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
        this.$router.push('/UserPage');
      } catch (error) {
        console.error('Error signing in:', error);
        alert('Authentication failed. Please try again.');
      }
    },


    // Кнопка увійти працює, але є прикол, що якщо користувач не зареєстрований, 
    // воно його реєструє, а далі переходить на момент оберання тарифу. 
    // Далі при реєстрації буде помилка, що користувач вже є в базі даних :)
    // тому поки закоментував даний функціонал




    // async signInWithGoogle() {
    //   try {
    //     const result = await signInWithPopup(auth, googleProvider);
    //     const user = result.user;

    //     if (!user || !user.uid) {
    //       console.error('User information is missing.');
    //       alert('User information is incomplete.');
    //       return;
    //     }

    //     // Используем слушатель состояния аутентификации
    //     auth.onAuthStateChanged(async (currentUser) => {
    //       if (currentUser) {
    //         const userDocRef = doc(db, `users/${currentUser.uid}`);
    //         const userDoc = await getDoc(userDocRef);

    //         if (userDoc.exists()) {
    //           // Пользователь найден в базе данных
    //           console.log("User found in database:", userDoc.data());
    //           this.$router.push('/UserPage');
    //         } else {
    //           // Пользователь не найден, перенаправляем на страницу регистрации
    //           console.log("User not found in database.");
    //           // Удаляем пользователя из Firebase Auth
    //           await auth.signOut();
    //           this.$router.push('/tarifs');
    //         }
    //       } else {
    //         console.error('No user is signed in.');
    //         alert('Authentication failed. Please try again.');
    //       }
    //     });
    //   } catch (error) {
    //     console.error("Error signing in with Google: ", error);
    //     alert("Authentication failed. Please try again.");
    //   }
    // }
  }
}

</script>

<style scoped>
@import "../assets/css/LoginPage.css";
</style>
