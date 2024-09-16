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

    <div class="payment-details">
      <p><strong>{{ $t('paymentAmount') }}:</strong> {{ tariff.price }} {{ $t('$') }}</p>
    </div>

    <button @click="confirmPayment" class="confirm-button">{{ $t('confirm') }}</button>
    </div>

    <!-- 
    <div class="battonBack">
      <RouterLink to="/tariffs" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
    </div> -->

  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default {
  name: 'PaymentTariffPage',
  data() {
    return {
      tariff: {},  // Тариф по умолчанию
      tariffs: [],  // Массив всех тарифов
      packageName: this.$route.query.tariffName || 'Unknown Package',
      minAmount: 0,
      maxAmount: 0,
      paymentAmount: 0
    };
  },
  async created() {
    try {
      // Получаем данные тарифов из Firebase
      const docRef = doc(db, 'tariffs', 'beNOUQ1b9ffvpRNDKxS4');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const tariffsData = docSnap.data();
        
        // Преобразование данных в массив для удобного поиска
        this.tariffs = [
          { name: 'Basic', ...tariffsData.Basic },
          { name: 'Standard', ...tariffsData.Standard },
          { name: 'Premium', ...tariffsData.Premium },
          { name: 'Deluxe', ...tariffsData.Deluxe }
        ];

        // Поиск тарифа по имени
        const foundTariff = this.tariffs.find(tariff => tariff.name === this.packageName);
        
        if (foundTariff) {
          this.tariff = foundTariff;  // Сохраняем найденный тариф
          this.minAmount = foundTariff.minAmount || 0;
          this.maxAmount = foundTariff.maxAmount || 0;
          this.paymentAmount = this.minAmount;
        } else {
          console.error('Тариф не найден');
        }
      } else {
        console.log('Документ не найден');
      }
    } catch (error) {
      console.error('Ошибка при загрузке тарифа:', error);
    }
  },
  methods: {
    confirmPayment() {
      if (this.paymentAmount < this.minAmount || this.paymentAmount > this.maxAmount) {
        alert(this.$t('invalidAmount'));
        return;
      }
      
      // Логика подтверждения данных
      alert(this.$t('paymentConfirmed'));
    }
  }
};
</script>

<style scoped>
@import '../assets/css/Payment.css';
</style>
