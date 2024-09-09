<template>
  <div class="register-page">
    <h1>Register with {{ tariffName }}</h1>

    <div class="battonBack">
      <RouterLink to="/tarifs" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
    </div>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" v-model="form.phone" required />
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" v-model="form.message" rows="4" required></textarea>
      </div>
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
    };
  },
  computed: {
    tariffId() {
      // Извлечение параметра tariffId из URL
      return this.$route.params.tariffId;
    },
    tariffName(){
      // Извлечение параметра tariffName из URL
      return this.$route.params.tariffName;
    }

  },
  methods: {
    handleSubmit() {
      // Обработка отправки формы
      console.log('Form submitted:', this.form);
    }
  }
}
</script>

<style scoped >
  @import '../assets/css/Register.css';
</style>
