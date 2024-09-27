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
        <!-- <div v-if="chatOpen" class="chat-window"> -->
          <!-- <p>{{ $t('chatWindow') }}</p> -->
          <!-- Відкриття чату в новому вікні
          <iframe v-if="chatOpen" :src="telegramUrl" width="400" height="600" frameborder="0"></iframe> -->
        <!-- </div> -->
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
      chatOpen: false, // Один раз оголошено chatOpen
      tariffId: this.$route.query.tariffId || null,
      tariff: null,
      paymentAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      network: 'Bitcoin',
      amount: 0,
      paymentConfirmed: false
    };
  },
  async created() {
    if (this.tariffId) {
      try {
        const docRef = doc(db, 'tariffs', 'beNOUQ1b9ffvpRNDKxS4');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const tariffsData = docSnap.data();
          const tariffs = [
            { ...tariffsData.Basic, id: 1 },
            { ...tariffsData.Standard, id: 2 },
            { ...tariffsData.Premium, id: 3 },
            { ...tariffsData.Deluxe, id: 4 }
          ];

          const foundTariff = tariffs.find(tariff => tariff.id == this.tariffId);

          if (foundTariff) {
            this.tariff = foundTariff;
          } else {
            console.error('Тариф с таким id не найден');
          }
        } else {
          console.error('Документ с тарифами не найден');
        }
      } catch (error) {
        console.error('Ошибка при загрузке тарифа:', error);
      }
    } else {
      console.error('tariffId не передан');
    }
  },
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
