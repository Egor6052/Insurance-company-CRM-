<template>
  <div class="register-page">
    <h1>Register with {{ tariffName }}</h1>

    <div class="battonBack">
      <RouterLink to="/tarifs" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
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
        tariff: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        wallet: '',
        consultantId: ''
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
      console.log('Form submitted:', this.form);
      try {
        const { email, password, name, phone, wallet, consultantId } = this.form;

        // Создаем пользователя
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User successfully registered:', userCredential);

        // Получаем ID пользователя
        const userId = userCredential.user.uid;

        // Записываем данные в Cloud Firestore
        await setDoc(doc(db, 'users', userId), {
          tariff: this.tariffName,
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

        // Перенаправление на страницу оплаты с параметрами тарифа
        this.$router.push({
          path: '/Payment',
          query: {
          tariffName: this.tariffName,
          minAmount: this.minAmount,
          maxAmount: this.maxAmount
        }
        });
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('This email is already registered. Please use a different email.');
        } else {
          console.error('Registration error:', error);
          alert('Registration error: ' + error.message);
        }
      }
    },
    getMinAmount(tariffName) {
      // Логика для получения минимальной суммы в зависимости от тарифа
      // Например:
      const tariffs = {
        'Basic': 10,
        'Premium': 50,
        'Gold': 100
      };
      return tariffs[tariffName] || 0;
    },
    getMaxAmount(tariffName) {
      // Логика для получения максимальной суммы в зависимости от тарифа
      // Например:
      const tariffs = {
        'Basic': 50,
        'Premium': 150,
        'Gold': 500
      };
      return tariffs[tariffName] || 0;
    }
  }
}
</script>

<style scoped>
@import '../assets/css/Register.css';
</style>
