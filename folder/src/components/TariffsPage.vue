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
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default {
  name: 'TariffsPage',
  data() {
    return {
      tariffs: []  // Пустой массив для тарифов, которые будут загружены из Firebase
    };
  },
  async created() {
    try {
      const docRef = doc(db, 'tariffs', 'beNOUQ1b9ffvpRNDKxS4');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const tariffsData = docSnap.data();
        
        // Преобразование данных в массив для отображения
        this.tariffs = [
          { ...tariffsData.Basic, id: 1 },
          { ...tariffsData.Standard, id: 2 },
          { ...tariffsData.Premium, id: 3 },
          { ...tariffsData.Deluxe, id: 4 }
        ];
      } else {
        console.log('Документ не найден');
      }
    } catch (error) {
      console.error('Ошибка при получении тарифов:', error);
    }
  },
  methods: {
    register(tariffId, tariffName) {
      this.$router.push({ name: 'Register', params: { tariffId }, query: { tariffName } });
    }
  }
};
</script>

<style scoped>
  @import "../assets/css/Tariffs.css";
</style>
