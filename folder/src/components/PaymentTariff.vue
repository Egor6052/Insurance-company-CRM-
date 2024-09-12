<template>
  <div class="payment-tariff-page">
    <div class="battonBack">
      <RouterLink to="/tariffs" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
    </div>

    <h1>{{ $t('paymentTariff') }}</h1>

    <div class="package-info">
      <p><strong>{{ $t('selectedPackage') }}:</strong> {{ packageName }}</p>
    </div>

    <div class="payment-details">
      <p><strong>{{ $t('paymentAmount') }}:</strong> {{ tariffPrice }} {{ $t('currency') }}</p>
    </div>

    <button @click="confirmPayment" class="confirm-button">{{ $t('confirm') }}</button>
  </div>
</template>


<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default {
  name: 'PaymentTariffPage',
  data() {
    return {
      packageName: this.$route.query.tariffName || 'Unknown Package',
      minAmount: 0,
      maxAmount: 0,
      paymentAmount: 0
    };
  },
  async created() {
    try {
      // Получаем ID тарифа из запроса
      const tariffId = this.$route.query.tariffId || '';

      // Если есть ID тарифа, загружаем соответствующие данные
      if (tariffId) {
        const tariffDoc = doc(db, 'tariffs', tariffId);
        const tariffSnapshot = await getDoc(tariffDoc);

        if (tariffSnapshot.exists()) {
          const tariffData = tariffSnapshot.data();
          this.minAmount = tariffData.minAmount || 0;
          this.maxAmount = tariffData.maxAmount || 0;
          this.paymentAmount = this.minAmount; // Устанавливаем начальное значение
        } else {
          console.error('No such document!');
          this.minAmount = 0;
          this.maxAmount = 0;
        }
      }
    } catch (error) {
      console.error('Error fetching tariff:', error);
    }
  },
  methods: {
    confirmPayment() {
      if (this.paymentAmount < this.minAmount || this.paymentAmount > this.maxAmount) {
        alert(this.$t('invalidAmount'));
        return;
      }
      
      // Логика подтверждения данных (например, отправка на сервер)
      alert(this.$t('paymentConfirmed'));
    }
    
  }
}
</script>

<style scoped>
@import '../assets/css/Payment.css';
</style>
