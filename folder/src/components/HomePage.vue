<template>
  <div class="MainFolder">
    <div class="logo">
      <div class="logoName"><p>{{ $t('company') }}</p></div>
      <div class="text-container">
        <div class="description"><p>{{ $t('description') }}</p></div>
        <div class="Aboutdesigner"><a><p>{{ $t('designer') }}</p></a></div>
      </div>
      <div class="container">
        <RouterLink to="/tarifs" class="Accept">
          {{ $t('acceptButton') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
 @import "../assets/css/HomePage.css";
</style>
