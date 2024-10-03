<template>
  <div class="register-page">

    <!-- Шапка -->
    <div class="header">
      <div class="battonBack">
        <RouterLink to="/tariffs" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
      </div>
    </div>

    <div class="page">
      <p>Register with {{ tariffName }}</p>

      <div class="battonBack">
        <RouterLink to="/tariffs" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
      </div>
      
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="form.password" required />
        </div>
        <div class="form-group">
          <label for="phone">Phone:</label>
          <input type="tel" id="phone" v-model="form.phone" required />
        </div>
        <div class="form-group">
          <label for="wallet">USDT Wallet (TRC20):</label>
          <input type="text" id="wallet" v-model="form.wallet" required />
        </div>
        <div class="form-group">
          <label for="consultantId">Consultant ID:</label>
          <input type="text" id="consultantId" v-model="form.consultantId" required />
        </div>
        <button type="submit" class="submit-button">{{ $t('Submit') }}</button>
      </form>
    </div>
    
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default {
  name: 'RegisterPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        phone: '',
        wallet: '',
        consultantId: '',
        tariffId: this.$route.params.tariffId,  // Передача ID тарифу з URL
      }
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const { email, password, name, phone, wallet, consultantId, tariffId } = this.form;

        // Реєстрація користувача
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;

        // Зберігаємо інформацію в Firestore
        await setDoc(doc(db, 'users', userId), {
          tariff: tariffId,  // Зберігаємо ID тарифу
          name: name,
          email: email,
          phone: phone,
          wallet: wallet,
          consultantId: consultantId,
          position: "user"
        });

        // Очистка форми
        this.form.name = '';
        this.form.email = '';
        this.form.password = '';
        this.form.phone = '';
        this.form.wallet = '';
        this.form.consultantId = '';

        // Перехід на сторінку оплати
        this.$router.push({
          path: '/Payment',
          query: { tariffId: tariffId }
        });
      } catch (error) {
        console.error('Помилка реєстрації:', error);
        alert('Помилка реєстрації: ' + error.message);
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/css/Register.css';
</style>
