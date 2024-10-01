import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'


// Для перекладів
const messages = {
  en: {
    addAdmin: 'Add admin',
    delete: 'Delete',
    users: 'Users',
    supportChat: 'Support Chat',
    copyAddress: 'Copy address',
    network: 'Network',
    paymentAddress: 'Payment address',
    paymentInReview: 'Your payment in review',
    goToAccount: 'go to Account',
    amount: 'Amount',
    walletPayment: 'Wallet address for payment',
    instructions: 'Instructions',
    ConsultantID: 'ConsultantID',
    Wallet: 'Wallet',
    PhoneNumber: 'Phone number',
    Email: 'Email',
    descriptionTariff: 'Description of the tariff',
    confirm: 'Confirm',
    paymentAmount: 'Payment Amount',
    selectedTariff: 'Selected tariff',
    selectedPackage: 'Selected Package',
    paymentTariff: 'Payment Tariff',
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
    addAdmin: 'Дати адміна',
    delete: 'Видалити',
    users: 'Користувачі',
    supportChat: 'Чат підтримки',
    copyAddress: 'Скопіювати',
    network: 'Мережа',
    paymentAddress: 'Адреса платежу',
    paymentInReview: 'Ваш запит оброблюєьтся',
    goToAccount: 'Перейти до акаунту',
    amount: 'До сплати',
    walletPayment: 'Адреса гаманця для оплати',
    instructions: 'Інструкція',
    ConsultantID: 'ID консультанта',
    Wallet: 'Гаманець',
    PhoneNumber: 'Номер телефону',
    Email: 'Email',
    descriptionTariff: 'Опис тарифу',
    confirm: 'Підтвердити',
    paymentAmount: 'До сплати',
    selectedTariff: 'Обраний тариф',
    selectedPackage: 'Обраний тариф',
    paymentTariff: 'Оплата пакету',
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
