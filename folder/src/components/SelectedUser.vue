<template>
    <div class="SelectedUser">
        <!-- Шапка -->
        <div class="header">
            <div class="battonBack">
                <RouterLink to="/UserPage" class="Accept"><p>{{ $t('back') }}</p></RouterLink>
            </div>
        </div>

        <div class="page" v-if="loading">
            <p>Завантаження користувача...</p>
        </div>
        <div class="page" v-else-if="user">
            <h1>{{ user.name }}</h1>
            <p>Email: {{ user.email }}</p>
            <p>Position: {{ user.position }}</p>
            <p>ID: {{ user.id }}</p>
        </div>
        <div class="page" v-else>
            <p>Користувача не знайдено або інформація завантажується...</p>
        </div>
    </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default {
    name: 'SelectedUser',
    data() {
        return {
            user: null,
            loading: false,
            error: null,
        };
    },

    mounted() {
        const userId = this.$route.params.userId;
        console.log("User ID from route:", userId); // Додайте цей рядок для налагодження
        this.fetchUser(userId); 
    },

    methods: {
        async fetchUser(userId) {
            try {
                this.loading = true;
                this.error = null;

                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    this.user = { id: userDoc.id, ...userDoc.data() };
                } else {
                    this.error = "Користувача не знайдено";
                }
            } catch (error) {
                this.error = "Помилка при отриманні користувача: " + error.message;
            } finally {
                this.loading = false;
            }
        },
    }
};
</script>

<style scoped>
@import '../assets/css/SelectedUser.css';
</style>
