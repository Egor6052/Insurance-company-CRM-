import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'


// Для перекладів
const messages = {
  en: {
    password: 'Password',
    username: 'User Gmail',
    login: 'login',
    EnterWithGoogle: 'Enter with Google',
    Submit: 'Next step',
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
    password: 'Ваш пароль',
    username: 'Gmail користувача',
    login: 'Увійти',
    EnterWithGoogle: 'Увійти з Google',
    Submit: 'Наступний крок',
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
