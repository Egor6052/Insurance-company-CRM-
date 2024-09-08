<template>
  <div class="MainFolder">
    <!-- Текст для перекладу у main.js -->
    <div class="logo">
      <div class="logoName"><p>{{ $t('company') }}</p></div>
      <div class="text-container">
        <div class="description"><p>{{ $t('description') }}</p></div>
        <div class="Aboutdesigner"><a><p>{{ $t('designer') }}</p></a></div>
      </div>
      <div class="container">
        <button class="Accept" @click="goToTariffs"><p>{{ $t('acceptButton') }}</p></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    goToTariffs() {
      this.$router.push('/tariffs');
    }
  }
}
</script>

<style scoped>
 @import "../assets/css/HomePage.css";
</style>
