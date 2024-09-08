<template>
    <div class="tariffs">
      <h1>{{ $t('tariffs') }}</h1>
      <div v-for="tariff in tariffs" :key="tariff.id" class="tariff">
        <h2>{{ tariff.name }}</h2>
        <p>{{ tariff.description }}</p>
        <button @click="register(tariff.id)">{{ $t('register') }}</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TariffsPage',
    data() {
      return {
        tariffs: [
          { id: 1, name: 'Basic', description: 'Basic package description' },
          { id: 2, name: 'Standard', description: 'Standard package description' },
          { id: 3, name: 'Premium', description: 'Premium package description' },
          { id: 4, name: 'Deluxe', description: 'Deluxe package description' }
        ]
      }
    },
    methods: {
      register(tariffId) {
        this.$router.push({ path: `/register/${tariffId}` });
      }
    }
  }
  </script>
  
  <style scoped>
    @import "../assets/css/Tariffs.css";
  </style>
  