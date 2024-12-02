<template>
    <main class="error-page">
        <div class="error-banner">
            <h1>404</h1>
            <p>Oups! La page que vous recherchez est introuvable.</p>
            <router-link to="/" class="home-button">Retour à l'accueil</router-link>
        </div>
    </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

body {
    font-family: 'Poppins', sans-serif;
    color: #2c3e50;
    background-color: #f4f4f9;
    margin: 0;
    padding: 0;
}

.error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: #ffffff;
}

.error-banner {
    padding: 40px 20px;
    border-radius: 12px;
    background: linear-gradient(135deg, #f5b7b1, #f1948a);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.error-banner h1 {
    font-size: 8em;
    margin: 0;
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.error-banner p {
    font-size: 1.5em;
    margin: 20px 0;
    color: #ffffff;
}

.home-button {
    padding: 10px 20px;
    font-size: 1.2em;
    color: #ffffff;
    background-color: #e74c3c;
    border: none;
    border-radius: 8px;
    text-decoration: none;
    transition: background-color 0.3s;
}

.home-button:hover {
    background-color: #c0392b;
}
</style>
