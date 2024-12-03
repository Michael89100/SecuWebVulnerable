<template>
  <div class="container">
    <Card class="login-form">
      <template #title>
        <h2 class="login-title">Login</h2>
      </template>
      <template #content>
        <div class="form-group">
          <InputText v-model="email" placeholder="Email" class="input-field" />
        </div>
        <div class="form-group">
          <InputText v-model="password" placeholder="Password" class="input-field" type="password" />
        </div>
        <Button label="Login" icon="pi pi-sign-in" @click="login" class="login-button" />
        <router-link :to="{ name: 'register' }" class="register-link">
          Je n'ai pas de compte, m'inscrire
        </router-link>
        <Message v-if="authStore.error" severity="error" class="error-message">
          {{ authStore.error }}
        </Message>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Button from "primevue/button";
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  // Tenter de parser l'email comme JSON
  let parsedMail;
  try {
    parsedMail = JSON.parse(email.value); // Convertit en objet si possible
  } catch (e) {
    parsedMail = email.value; // Sinon, garde la valeur brute
  }

  await authStore.login({ mail: parsedMail, password: password.value });

  if (!authStore.error) {
    router.push('/');
  }
};

// Correction

// const login = async () => {
//   await authStore.login({ mail: email.value, password: password.value });
//   if (!authStore.error) {
//     router.push('/');
//   }
// };
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.login-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: bold;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #4CAF50;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

.register-link {
  display: block;
  margin-top: 1rem;
  color: #888;
  text-decoration: none;
  font-size: 0.875rem;
  text-align: center;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #4CAF50;
}

.error-message {
  margin-top: 1rem;
  text-align: center;
}
</style>
