<template>
    <div>
      <h1>Register for Tariff {{ tariffId }}</h1>
      <!-- Форма реєстрації тут -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterPage',
    computed: {
      tariffId() {
        return this.$route.params.tariffId;
      }
    }
  }
  </script>
  
  <style scoped>
  /* Ваш CSS для сторінки реєстрації */
  </style>
  