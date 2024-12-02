<template>
  <div class="container">
    <Card class="register-form">
      <template #title>
        <h2 class="register-title">S'inscrire</h2>
      </template>
      <template #content>
        <div class="p-float-label mb-4">
          <label for="te">Prénom <span style="color: red;">*</span></label>
          <InputText v-model="user.firstname" class="input-field" />
        </div>
        <div class="p-float-label mb-4">
          <label for="te">Nom <span style="color: red;">*</span></label>
          <InputText v-model="user.name" class="input-field" />
        </div>
        <div class="p-float-label mb-4">
          <label for="te">Email <span style="color: red;">*</span></label>
          <InputText v-model="user.mail" class="input-field" />
        </div>
        <div class="p-float-label mb-4">
          <label for="te">Mot de passe <span style="color: red;">*</span></label>
          <InputText v-model="user.password" type="password" class="input-field" />
        </div>
        <div class="p-float-label mb-4">
          <label for="te">Pseudo <span style="color: red;">*</span></label>
          <InputText v-model="user.pseudo" placeholder="Pseudo" class="input-field" />
        </div>
        <SpecialityComponent :specialities="user.speciality" @removeSpeciality="removeSpeciality" @addSpeciality="addSpeciality" class="mb-3" />
        <Button :disabled="!isValid" label="M'inscrire" icon="pi pi-user-plus" @click="register" class="register-button" />
        <router-link :to="{ name: 'login' }" class="login-link">
          J'ai un compte, me connecter
        </router-link>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import User from '../models/User';
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useRouter } from 'vue-router';
import SpecialityComponent from "../components/SpecialityComponent.vue";

const authStore = useAuthStore();
const user = ref(new User());
const router = useRouter();

const addSpeciality = () => {
  user.value.speciality.push({ title: '', level: null });
};

const removeSpeciality = (index) => {
  user.value.speciality.splice(index, 1);
};

const isValid = computed(() => {
  return user.value.name && user.value.firstname && user.value.mail && user.value.password && user.value.pseudo;
});

const register = async () => {
  await authStore.register(user.value);
  if (!authStore.error) {
    await router.push('/login');
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}

.register-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.register-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: bold;
  text-align: center;
}

.p-float-label mb-3 {
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

.register-button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem; 
}

.register-button:hover {
  background-color: #0056b3;
}

.login-link {
  display: block;
  margin-top: 1rem;
  color: #888;
  text-decoration: none;
  font-size: 0.875rem;
  text-align: center;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: #4CAF50;
}
</style>
