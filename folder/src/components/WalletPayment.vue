<template>
    <div class="wallet-payment-page">

        <!-- Шапка -->
        <div class="header">
            <div class="battonBack">
                <RouterLink to="/tariffs" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
            </div>
        </div>


        <div class="walletPage">
             <h1>{{ $t('walletPayment') }}</h1>
  
            <div v-if="tariff" class="payment-info">
                <p><strong>{{ $t('selectedPackage') }}:</strong> {{ tariff.name }}</p>
                <p><strong>{{ $t('description') }}:</strong> {{ tariff.description }}</p>
                <p><strong>{{ $t('amount') }}:</strong> {{ tariff.price }} {{ $t('$') }}</p>
            </div>
        
            <div v-else>
                <p>{{ $t('loading') }}</p>
            </div>
        
            <button @click="confirmTransaction" class="confirm-button">{{ $t('confirmPayment') }}</button>
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
        tariffId: this.$route.query.tariffId || null, // Получаем tariffId из параметров
        tariff: null // Данные выбранного тарифа
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
                console.log('Tariff found:', this.tariff);
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
      confirmTransaction() {
        // Логика подтверждения транзакции
        alert(this.$t('paymentConfirmed'));
      }
    }
  };
  </script>
  
  <style scoped>
  @import '../assets/css/Wallet.css';
  </style>
  