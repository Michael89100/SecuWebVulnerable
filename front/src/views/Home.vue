<template>
  <main>
    <div class="banner">
      <h1>Bienvenue sur notre plateforme!</h1>
      <p>Notre plateforme de mentorat vous connecte avec des experts pour vous guider et vous inspirer dans votre parcours professionnel et personnel.</p>
    </div>

    <div class="about-us">
      <div class="content">
        <h2>À propos de nous</h2>
        <p>Nous sommes une plateforme dédiée au mentorat, connectant des professionnels et des experts avec ceux qui cherchent à développer leurs compétences et à progresser dans leur carrière. Notre mission est de fournir un environnement de soutien et d'inspiration pour aider chacun à atteindre ses objectifs.</p>
      </div>
      <div class="stats">
        <div class="stat">
          <h3>500+</h3>
          <p>Mentors qualifiés</p>
        </div>
        <div class="stat">
          <h3>1000+</h3>
          <p>Mentorés satisfaits</p>
        </div>
        <div class="stat">
          <h3>2000+</h3>
          <p>Sessions de mentorat</p>
        </div>
      </div>
    </div>

    <div class="mentors">
      <div class="content">
        <h2>Nos meilleurs mentors</h2>
        <div class="mentor-card" v-for="(mentor, index) in userStore.topUsers" :key="index">
          <img :src="mentor.img_url" :alt="mentor.name" class="mentor-image" />
          <div class="mentor-info">
            <h3>{{ mentor.firstname  }} {{ mentor.name }}</h3>
            <p class="mentor-rating">Note moyenne : {{ formatAverageNote(mentor.averageNote) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="home">
      <div class="search-bar">
        <div class="search-query">
          <InputText v-model="searchQuery" placeholder="Recherche par pseudonyme, nom ou prénom" />
        </div>
        <div class="speciality-query">
          <InputText v-model="specialityQuery" placeholder="Recherche par spécialité" />
        </div>
        <Button label="Effacer les filtres" @click="clearFilters" />
      </div>
      <div class="events">
        <EventCard
          v-for="(event, index) in userStore.filteredUsers"
          :key="index"
          :pseudonyme="event.pseudo"
          :name="`${event.name} ${event.firstname}`"
          :speciality="event.speciality"
          :userId="event._id"
          :averageNote="event.averageNote"
          :img_url="event.img_url"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';
import EventCard from '../components/EventCard.vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const userStore = useUserStore();

const searchQuery = ref('');
const specialityQuery = ref('');

const fetchUsers = async () => {
  await userStore.fetchUsers();
  filterEvents();
}

const formatAverageNote = (note: number) => {
    return note.toFixed(1);
};

const fetchTopUsers = async () => {
  await userStore.fetchTopUsers();
  filterEvents();
}

const fetchUsersBySpeciality = async (title: string) => {
  await userStore.fetchUsersBySpeciality(title);
  filterEvents();
};

const filterEvents = () => {
  userStore.filterUsers(searchQuery.value);
};

const clearFilters = () => {
  searchQuery.value = '';
  specialityQuery.value = '';
  userStore.clearFilters();
};

watch(searchQuery, () => {
  filterEvents();
});

watch(specialityQuery, () => {
  if (specialityQuery.value) {
    fetchUsersBySpeciality(specialityQuery.value);
  } else {
    fetchUsers();
  }
});

onMounted(() => {
  fetchUsers();
  fetchTopUsers();
});
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

.banner {
  background: linear-gradient(135deg, #3a6186, #89253e);
  color: white;
  text-align: center;
  padding: 60px 20px;
  margin-bottom: 30px;
  margin-top: 100px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.banner::before {
  content: '';
  position: absolute;
  top: -50px;
  left: -50px;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: bannerAnimation 20s infinite linear;
}

@keyframes bannerAnimation {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(800px, 800px) rotate(360deg); }
}

.banner h1 {
  margin: 0;
  font-size: 3.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeIn 2s;
}

.banner p {
  margin: 20px 0 0;
  font-size: 1.5em;
  animation: fadeIn 3s;
}

.about-us {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  margin: 40px 0;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.about-us .content {
  max-width: 800px;
}

.about-us h2 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #3a6186;
}

.about-us p {
  font-size: 1.2em;
  line-height: 1.8;
  color: #555;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
}

.stat {
  text-align: center;
}

.stat h3 {
  font-size: 2.2em;
  color: #89253e;
}

.stat p {
  font-size: 1.1em;
  color: #2c3e50;
}

.mentors {
  padding: 50px 20px;
  margin: 40px 0;
  border-radius: 12px;
  background: #f7f7f7;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.mentors .content {
  max-width: 800px;
  margin: 0 auto;
}

.mentors h2 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #3a6186;
}

.mentor-card {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.mentor-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
  border: 3px solid #3a6186;
}

.mentor-info {
  text-align: left;
}

.mentor-info h3 {
  margin: 0;
  font-size: 1.5em;
  color: #3a6186;
}

.mentor-info p {
  margin: 5px 0;
  font-size: 1.1em;
  color: #555;
}

.mentor-rating {
  font-size: 1em;
  color: #89253e;
}

.home {
  text-align: center;
  padding: 20px;
}

.search-bar {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.search-query, .speciality-query {
  width: 30%;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.events {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}
</style>
