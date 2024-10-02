<template>
  <div class="tariffs">

    <!-- Шапка -->
    <div class="header">
      <div class="battonBack">
        <RouterLink to="/" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
      </div>
    </div>

    <h1>{{ $t('tariffs') }}</h1>

    
    <div class="tariffs-container">
      <div v-for="tariff in tariffs" :key="tariff.id" class="tariff">
        <a @click="register(tariff.id, tariff.name)" class="buttonMenu">
          <ul>
            <li>
              <h2>{{ tariff.name }}</h2>
              <p>{{ tariff.description }}</p>
              <p>{{ tariff.price }} {{ $t('$') }}</p>
              <button @click="register(tariff.id, tariff.name)">{{ $t('choose') }}</button>
            </li>
          </ul>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default {
  name: 'TariffsPage',
  data() {
    return {
      tariffs: []  // Пустий масив для тарифів, які будуть завантажені з Firebase
    };
  },
  async created() {
    try {
      // Отримуємо колекцію тарифів з Firestore
      const tariffsCollection = collection(db, 'tariffs');
      const tariffsSnapshot = await getDocs(tariffsCollection);
      
      // Преобразовуємо всі документи в масив тарифів
      this.tariffs = tariffsSnapshot.docs.map(doc => ({
        id: doc.id,            // Ідентифікатор документа
        ...doc.data()          // Дані документа (name, description, price)
      }));
    } catch (error) {
      console.error('Ошибка при получении тарифов:', error);
    }
  },
  methods: {
    register(tariffId, tariffName) {
      // Відправляє користувача на сторінку реєстрації з параметрами тарифу
      this.$router.push({ name: 'Register', params: { tariffId }, query: { tariffName } });
    }
  }
};
</script>


<style scoped>
  @import "../assets/css/Tariffs.css";
</style>
