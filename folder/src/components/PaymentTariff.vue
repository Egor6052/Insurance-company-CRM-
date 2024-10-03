<template>
  <div class="payment-tariff-page">

    <!-- Шапка -->
    <div class="header">
      <div class="battonBack">
        <RouterLink to="/tariffs" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
      </div>
    </div>

    <div class="page">

      <h1>{{ $t('paymentTariff') }}</h1>

      <div class="package-info">
        <p><strong>{{ $t('selectedPackage') }}:</strong> {{ packageName }}</p>
      </div>

      <!-- Текст інструкції завантажений з Firestore -->
      <div class="title">
        <p><strong>{{ $t('instructions') }}:</strong></p>
        <p>{{ instructionText }}</p> <!-- Відображення інструкції -->
      </div>

      <div class="payment-details">
        <p><strong>{{ $t('paymentAmount') }}:</strong> {{ tariff.price }} {{ $t('$') }}</p>
      </div>

      <button @click="confirmPayment" class="confirm-button">{{ $t('confirm') }}</button>

    </div>

  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default {
  name: 'PaymentTariffPage',
  data() {
    return {
      tariff: {},  // Тариф за замовчуванням
      packageName: '',  // Ім'я тарифу
      instructionText: '',  // Текст інструкції
    };
  },
  async created() {
    try {
      // Отримуємо tariffId з query параметрів
      const tariffId = this.$route.query.tariffId;

      // Отримуємо дані тарифу з Firestore
      const docRef = doc(db, 'tariffs', tariffId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.tariff = docSnap.data();
        this.packageName = this.tariff.name;  // Ім'я тарифу
      } else {
        console.error('Тариф не знайдено');
      }

      // Завантаження інструкції
      this.createdInstruction();

    } catch (error) {
      console.error('Помилка при завантаженні даних:', error);
    }
  },
  methods: {
    async createdInstruction() {
      try {
        const docRef = doc(db, "instruction", "rgBhZDY3xqPq0DTgLmNk");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.instructionText = docSnap.data().text || 'Інструкція відсутня';
        } else {
          console.error("Інструкцію не знайдено");
        }
      } catch (error) {
        console.error("Помилка при отриманні інструкції:", error);
      }
    },

    confirmPayment() {
      this.$router.push({
        name: 'Wallet',
        query: { tariffId: this.tariff.id }
      });
    }
  }
};
</script>

<style scoped>
@import '../assets/css/Payment.css';
</style>
