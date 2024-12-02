<script setup lang="ts">

import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import Toast from 'primevue/toast';

import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import eventBus from './eventBus';

const toast = useToast();
onMounted(() => {
  eventBus.on('show-toast', (toastMessage: any) => {
    toast.add(toastMessage);
  });
});

const route = useRoute();

const showHeader = computed(() => {
  return route.name !== 'login' && route.name !== 'register';
});

const showFooter = computed(() => {
  return route.name !== 'login' && route.name !== 'register';
});
</script>

<template>
  <div id="app">
    <Toast />
    <header v-if="showHeader">
      <NavBar/>
    </header>
    <main>
      <router-view />
    </main>
    <footer v-if="showFooter">
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
</style>
