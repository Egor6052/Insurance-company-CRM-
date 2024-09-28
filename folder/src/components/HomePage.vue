<template>
  <div class="MainFolder">
    <div class="logo">
      <div class="logoName"><p>{{ $t('company') }}</p></div>
      <div class="text-container">
        <div class="description"><p>{{ $t('description') }}</p></div>
        <div class="Aboutdesigner"><a><p>{{ $t('designer') }}</p></a></div>
      </div>
      <div class="container">
        <ul>
          <li>
             <RouterLink to="/tariffs" class="Accept">
              <p>{{ $t('acceptButton') }}</p>
            </RouterLink>
          </li>
          <li>
             <RouterLink to="/login" class="Login">
              <p>{{ $t('loginButton') }}</p>
            </RouterLink>
          </li>
        </ul>
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
