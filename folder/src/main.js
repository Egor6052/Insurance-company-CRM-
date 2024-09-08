import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

// Налаштування перекладів
const messages = {
  en: {
    company: '[ Insurance company ]',
    description: 'Structure FigJam',
    designer: 'Head Designer: Darina Dzetsyno',
    acceptButton: 'Agree and accept'
  },
  uk: {
    company: '[ Страхова компанія ]',
    description: 'Stracture FigJam',
    designer: 'Головний дизайнер: Дарина Дзециньо',
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
