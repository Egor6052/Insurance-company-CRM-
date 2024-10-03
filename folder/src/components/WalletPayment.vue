<template>
  <div class="wallet-payment-page">
    <!-- Шапка -->
    <div class="header">
      <div class="battonBack">
        <RouterLink to="/tariffs" class="Accept">
          <p>{{ $t('back') }}</p>
        </RouterLink>
      </div>
    </div>

    <div class="walletPage">
      <h1>{{ $t('walletPayment') }}</h1>

      <!-- Показ тарифу -->
      <div v-if="tariff" class="payment-info">
        <p><strong>{{ $t('selectedPackage') }}:</strong> {{ tariff.name }}</p>
        <p>{{ tariff.description }}</p>
        <p><strong>{{ $t('amount') }}:</strong> {{ tariff.price }} {{ $t('$') }}</p>
      </div>

      <div class="address-info">
        <p><strong>{{ $t('paymentAddress') }}:</strong><strong>{{ paymentAddress }}<button class="button-copy" @click="copyAddress">
          <div class="imgConteiner">
            <img src="../assets/icons/copy.png">
          </div>
         </button></strong></p>
        <p><strong>{{ $t('network') }}:</strong> {{ network }}</p>
        
      </div>

      <div class="amount-info">
        <p><strong>{{ $t('amountToDeposit') }}:</strong></p>
        <input v-model="amount" type="number" @input="checkAmount" placeholder="0.00" />
      </div>

      <button @click="confirmTransaction" class="confirm-button">{{ $t('confirmPayment') }}</button>

      <!-- Чат технічної підтримки через Telegram -->
      <div class="support-chat">
        <button @click="openTelegram">{{ $t('supportChat') }}</button>
      </div>

      <div v-if="paymentConfirmed" class="overlay">
        <div v-if="paymentConfirmed" class="confirmation-message">
          <p>{{ $t('paymentInReview') }}</p>
          <RouterLink to="/UserPage"><button>{{ $t('goToAccount') }}</button></RouterLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default {
  name: 'WalletPayment',
  data() {
    return {
      chatOpen: false,
      tariffId: this.$route.query.tariffId || null,  // Зчитуємо тариф за допомогою параметра в URL
      tariff: null,
      paymentAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      network: 'Bitcoin',
      amount: 0,
      paymentConfirmed: false
    };
  },
  async created() {
  console.log("Received tariffId:", this.tariffId);  // Логування tariffId для перевірки
  if (this.tariffId) {
    try {
      const docRef = doc(db, 'tariffs', this.tariffId);  // Використовуємо tariffId
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.tariff = docSnap.data();
      } else {
        console.error('Тариф не знайдено');
      }
    } catch (error) {
      console.error('Помилка при завантаженні даних:', error);
    }
  } else {
    console.error('tariffId не передано');
  }
}
,
  methods: {
    copyAddress() {
      navigator.clipboard.writeText(this.paymentAddress).then(() => {
        alert(this.$t('addressCopied'));
      });
    },
    toggleChat() {
      this.chatOpen = !this.chatOpen;
    },
    confirmTransaction() {
      this.paymentConfirmed = true;
    },
    openTelegram() {
      window.open('https://t.me/CEO_BigCat', '_blank');
    },
    checkAmount() {
      if (this.amount < 0) {
        this.amount = 0;
      }
    }
  }
};
</script>

<style scoped>
@import '../assets/css/Wallet.css';
</style>
