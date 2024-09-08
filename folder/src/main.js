import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'


// Налаштування перекладів
const messages = {
  en: {
    loginButton: 'Login',
    choose: 'Choose',
    back: 'Back',
    tariffs: 'Available rates',
    company: '[ Insurance company ]',
    description: 'Structure FigJam',
    designer: 'Head Designer: Darina Dzetsyno',
    acceptButton: 'Agree and accept'
  },
  uk: {
    loginButton: 'Увійти',
    choose: 'Обрати',
    back: 'Назад',
    tariffs: 'Доступні тарифи',
    company: '[ Страхова компанія ]',
    description: 'Stracture FigJam',
    designer: 'Head Designer: Darina Dzetsyno',
    acceptButton: 'Погодитися та прийняти'
  }
};

// Ініціалізація i18n
const i18n = createI18n({
  locale: 'uk',
  fallbackLocale: 'en', 
  messages,
});

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');
