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
      chatID: '',
      newChatID: '',
      chatOpen: false,
      tariffId: this.$route.query.tariffId || null,  // Зчитуємо тариф за допомогою параметра в URL
      tariff: null,
      paymentAddress: '',   // Початкове значення для адреси гаманця
      network: 'Bitcoin',   // Мережа для гаманця
      amount: 0,
      paymentConfirmed: false
    };
  },
  async created() {
    console.log("Received tariffId:", this.tariffId);  // Логування tariffId для перевірки

    // Завантажуємо тариф, якщо є tariffId
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
        console.error('Помилка при завантаженні тарифу:', error);
      }
    } else {
      console.error('tariffId не передано');
    }

    // Завантажуємо гаманець для цього користувача
    try {
      const docRefWallet = doc(db, 'wallets', 'h8kj0fwHOiE07hS01fAh');  // Шлях до документа гаманця
      const docSnapWallet = await getDoc(docRefWallet);

      if (docSnapWallet.exists()) {
        // Підставляємо адресу гаманця зі значенням із Firestore
        this.paymentAddress = docSnapWallet.data().wallet || '';  // Підставляємо гаманець з поля "wallet"
      } else {
        console.error('Документ гаманця не знайдено');
      }
    } catch (error) {
      console.error('Помилка при завантаженні гаманця:', error);
    }

    // Завантажуємо chatID з Firestore
    try {
        const docRefChat = doc(db, 'supportChat', '1aONeejgoIf15kc3CCxu');  // Шлях до документа підтримки
        const docSnapChat = await getDoc(docRefChat);

        if (docSnapChat.exists()) {
          this.chatID = docSnapChat.data().chatID || '';  // Підставляємо chatID з поля "chatID"
        } else {
          console.error('Документ підтримки не знайдено');
        }
      } catch (error) {
        console.error('Помилка при завантаженні chatID:', error);
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
      // Перевіряємо chatID
      if (this.chatID) {
        // Лог для перевірки значення chatID
        // console.log('chatID:', this.chatID);
        const formattedChatID = this.chatID.replace('@', '');
        // Формуємо URL та відкриваємо
        const telegramUrl = `https://t.me/${formattedChatID}`;
        
        window.open(telegramUrl, '_blank');
      } else {
        alert('Немає доступного chatID для переходу.');
      }
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
