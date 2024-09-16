<template>
  <div class="register-page">

    <!-- Шапка -->
    <div class="header">
      <div class="battonBack">
        <RouterLink to="/tariffs" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
      </div>
    </div>

    <div class="page">
      <h1>Register with {{ tariffName }}</h1>

      <div class="battonBack">
        <RouterLink to="/tariffs" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
      </div>
      
      <form @submit.prevent="handleSubmit">
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
        tariff: this.$route.params.tariffId,
        tariffName: this.$route.query.tariffName
      }
    };
  },
  computed: {
    tariffId() {
      return this.$route.params.tariffId;
    },
    tariffName() {
      return this.$route.query.tariffName;
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const { email, password, name, phone, wallet, consultantId, tariff, tariffName } = this.form;

        // Создаем пользователя
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User successfully registered:', userCredential);

        // Получаем ID пользователя
        const userId = userCredential.user.uid;

        // Записываем данные в Cloud Firestore
        await setDoc(doc(db, 'users', userId), {
          tariff: tariff, // Сохраняем ID тарифа
          tariffName: tariffName,
          name: name,
          email: email,
          phone: phone,
          wallet: wallet,
          consultantId: consultantId
        });

        // Очистка формы
        this.form.name = '';
        this.form.email = '';
        this.form.password = '';
        this.form.phone = '';
        this.form.wallet = '';
        this.form.consultantId = '';

        // Перенаправление на страницу оплаты с параметрами
        this.$router.push({ 
          path: '/Payment', 
          query: { tariffId: tariff, tariffName: tariffName }
        });
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('This email is already registered. Please use a different email.');
        } else {
          console.error('Registration error:', error);
          alert('Registration error: ' + error.message);
        }
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/css/Register.css';
</style>
