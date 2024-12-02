<template>
  <Card class="event-card">
    <div class="card-content">
      <div class="user-photo">
        <img :src="img_url" alt="Photo de l'utilisateur" />
      </div>
      <div class="user-info">
        <h2>
          <span v-if="pseudonyme">{{ pseudonyme }} - </span>{{ name }}
        </h2>
        <div class="rating">
          <span v-if="averageNote && !isNaN(Number(averageNote))">
            {{ averageNote }} <i class="fas fa-star"></i>
          </span>
          <span v-else>
            Pas de note
          </span>
        </div>
        <div class="speciality">
          <ul v-if="speciality && speciality.length">
            <li v-for="(spec, index) in speciality" :key="index">
              <span class="spec-title">{{ spec.title }}</span>
              <span class="spec-level">{{ spec.level }}</span>
            </li>
          </ul>
          <span v-else>
            Aucune spécialité
          </span>
        </div>
      </div>
      <div class="footer">
        <RouterLink :to="{ name: 'profil', params: { id: userId } }">
          Voir le profil
        </RouterLink>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps({
  pseudonyme: String,
  speciality: Array,
  name: String,
  userId: String,
  averageNote: [String, Number],
  img_url: String,
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.event-card {
  width: 100%;
  max-width: 350px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px;
}

.event-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  border-color: #34495e;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 100%;
}

.user-photo img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #34495e;
  object-fit: cover;
  margin-bottom: 20px;
}

.user-info {
  text-align: center;
  width: 100%;
}

.user-info h2 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #34495e;
  margin-bottom: 10px;
}

.rating {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  color: #ffcc00;
  margin-bottom: 20px;
}

.speciality {
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
  width: 100%;
}

.speciality ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.speciality li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  margin: 5px 0;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.spec-title {
  font-weight: 600;
  color: #34495e;
}

.spec-level {
  font-size: 0.9rem;
  color: #888;
}

.footer {
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.footer a {
  font-size: 1rem;
  padding: 10px 20px;
  background-color: #34495e;
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.footer a:hover {
  background-color: #2c3e50;
}
</style>
