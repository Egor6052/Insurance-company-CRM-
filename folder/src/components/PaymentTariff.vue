<template>
    <div class="payment-tariff-page">

        <div class="battonBack">
            <RouterLink to="/tarifs" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
        </div>
                    

      <h1>{{ $t('paymentInstruction') }}</h1>
  
      <div class="package-info">
        <p><strong>{{ $t('selectedPackage') }}:</strong> {{ packageName }}</p>
      </div>
  
      <div class="payment-details">
        <label for="amount">{{ $t('paymentAmount') }}:</label>
        <input
          type="number"
          id="amount"
          v-model.number="paymentAmount"
          :min="minAmount"
          :max="maxAmount"
          required
        />
        <p>{{ $t('minAmount') }}: {{ minAmount }} {{ $t('currency') }}</p>
        <p>{{ $t('maxAmount') }}: {{ maxAmount }} {{ $t('currency') }}</p>
      </div>
  
      <button @click="confirmPayment" class="confirm-button">{{ $t('confirm') }}</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PaymentTariffPage',
    data() {
      return {
        packageName: '',
        minAmount: 0,
        maxAmount: 0,
        paymentAmount: 0
      };
    },
    created() {
      // Инициализируем данные из параметров запроса при создании компонента
      this.packageName = this.$route.query.tariffName || 'Unknown Package';
      this.minAmount = Number(this.$route.query.minAmount) || 0;
      this.maxAmount = Number(this.$route.query.maxAmount) || 0;
      this.paymentAmount = this.minAmount; // Устанавливаем начальное значение
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
  