<template>
  <nav class="navbar">
    <div class="navbar-left">
      <RouterLink :to="{ name: 'home' }" class="brand-name" style="text-decoration: none">
        AirMentor
      </RouterLink>
    </div>
    <div class="navbar-right">
      <router-link v-if="!isLoggedIn" :to="{'name': 'login'}">
        <Button label="Connexion" icon="pi pi-sign-in" class="p-button-rounded p-button-success" />
      </router-link>
      <div v-if="isLoggedIn" class="logged-in-buttons">
        <router-link :to="{'name': 'myProfil'}">
          <Button label="Profile" icon="pi pi-user" class="p-button-rounded p-button-info" />
        </router-link>
        <Button label="Déconnexion" icon="pi pi-sign-out" class="p-button-rounded p-button-danger" @click="logout" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import Button from 'primevue/button';

const authStore = useAuthStore();
const router = useRouter();

const isLoggedIn = computed(() => {
  return authStore.user != null;
});

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #34495e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.navbar-left .brand-name {
  font-size: 26px;
  font-weight: bold;
  color: #ecf0f1;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}
.navbar-right .p-button {
  margin-left: 15px;
  font-size: 14px;
}
.logged-in-buttons {
  display: flex;
  align-items: center;
}
</style>
