<template>
  <div class="profile-container">
    <TabView class="tabview-custom" v-model:activeIndex="active">
      <TabPanel>
        <template #header>
          <div class="flex align-items-center gap-2">
            <Avatar :image="userStore.user.img_url" shape="circle"  />
            <span class="font-bold white-space-nowrap">Profil Utilisateur</span>
          </div>
        </template>
        <div class="profile-header">
          <Button v-if="!isEditing" label="Modifier mon profil" icon="pi pi-pencil" class="edit-button" @click="isEditing = true" />
        </div>
        <div class="p-grid">
          <div class="p-col-12 p-md-6">
            <Panel class="info-card">
              <template v-slot:header>
                <div class="header-content">
                  <span class="info-header">Informations Personnelles</span>
                  <span class="average-note" v-if="!isEditing">
                      <span class="note-label">Note Moyenne:</span>
                      <span v-if="userStore.user.averageNote !== 'Pas de note'">
                        <span class="star">&#9733;</span> {{ truncatedAverageNote }}
                      </span>
                      <span v-else>{{ truncatedAverageNote }}</span>
                    </span>
                </div>
              </template>
              <div class="p-fluid form-grid">
                <div class="p-field">
                  <label for="name"><i class="pi pi-user"></i> Nom</label>
                  <InputText id="name" v-model="userStore.user.name" :disabled="!isEditing"/>
                </div>
                <div class="p-field">
                  <label for="firstName"><i class="pi pi-user"></i> Prénom</label>
                  <InputText id="firstName" v-model="userStore.user.firstname" :disabled="!isEditing"/>
                </div>
                <div class="p-field">
                  <label for="email"><i class="pi pi-envelope"></i> Email</label>
                  <InputText id="email" v-model="userStore.user.mail" :disabled="!isEditing"/>
                </div>
                <div class="p-field">
                  <label for="pseudo"><i class="pi pi-tag"></i> Pseudo</label>
                  <InputText id="pseudo" v-model="userStore.user.pseudo" :disabled="!isEditing"/>
                </div>
                <div v-if="isEditing" class="p-field">
                  <label for="img_url"><i class="pi pi-image"></i> Image URL</label>
                  <InputText id="img_url" v-model="userStore.user.img_url"/>
                </div>
                <div v-if="isEditing">
                  <label for="password"><i class="pi pi-lock"></i> Nouveau mot de passe</label>
                  <div class="flex">
                    <InputText :type="showPassword ? 'text' : 'password'" id="password" v-model="newPassword"/>
                    <Button :icon="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" @click="togglePasswordVisibility"/>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
          <div class="p-col-12 p-md-6">
            <Panel header="Autres Informations" class="info-card">
              <div class="p-fluid form-grid">
                <div class="p-field flex flex-column gap-2">
                  <label for="specialite">Spécialités</label>
                  <div v-for="(specialite, index) in userStore.user.speciality" :key="specialite._id" class="speciality-item">
                    <InputText v-model="specialite.title" placeholder="Titre de la spécialité" :disabled="!isEditing"/>
                    <Dropdown v-model="specialite.level" :options="levels" optionLabel="label" optionValue="value" placeholder="Niveau de la spécialité" :disabled="!isEditing"/>
                    <Button icon="pi pi-trash" class="p-button-danger" style="width: 60px;" @click="removeSpeciality(index)" :disabled="!isEditing"/>
                  </div>
                  <Button label="Ajouter une spécialité" icon="pi pi-plus" class="add-speciality-button" @click="addSpeciality" :disabled="!isEditing"/>
                </div>
                <div class="p-field comment-section">
                  <label class="flex mb-1 label-style" for="notes">Commentaires</label>
                  <div class="comment-container">
                    <div v-for="comment in userStore.user.comments" :key="comment.comment" class="comment-card">
                      <div class="comment-note">
                        <span v-for="star in comment.value" :key="star" class="star">&#9733;</span>
                      </div>
                      <div class="comment-text">{{ comment.comment }}</div>
                    </div>
                    <span v-if="!(userStore.user.comments && userStore.user.comments.length)">
                        Pas de commentaire
                      </span>
                  </div>
                  <div class="legend" v-if="(userStore.user.comments && userStore.user.comments.length)">
                    <p>★ - Note</p>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
          <div class="p-col-12">
            <Button v-if="isEditing" label="Enregistrer" icon="pi pi-check" class="save-button" @click="saveProfile" />
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <template #header>
          <div class="flex align-items-center gap-2">
            <i class="pi pi-calendar large-icon"></i>
            <span class="font-bold white-space-nowrap">Mon Calendrier</span>
          </div>
        </template>
        <Calendar v-if="active === 1" />
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Panel from 'primevue/panel'
import { useAuthStore } from '@/stores/authStore'
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Avatar from "primevue/avatar"
import Calendar from "../components/Calendar.vue"

const authStore = useAuthStore()
const userStore = useUserStore()
const isEditing = ref(false)
const newPassword = ref('')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const user_id = ref(authStore.user._id)
const active = ref(0)

const levels = [
  { label: 'Expert', value: 'expert' },
  { label: 'Intermédiaire', value: 'intermediate' },
  { label: 'Débutant', value: 'beginner' }
]

const fetchUserProfile = async () => {
  try {
    await userStore.fetchUserProfile(user_id.value)
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
  }
}

const truncatedAverageNote = computed(() => {
  const averageNote: any = userStore.user.averageNote
  if (!averageNote || isNaN(parseFloat(averageNote))) {
    return 'Pas de note'
  }
  return parseFloat(averageNote).toFixed(2)
})

const saveProfile = async () => {
  try {
    userStore.user.speciality = userStore.user.speciality.filter(specialite => specialite.title && specialite.level)
    if (newPassword.value) {
      userStore.user.password = newPassword.value;
    }
    await userStore.saveUserProfile(userStore.user)
    isEditing.value = false
  } catch (error) {
    console.error('Failed to save profile:', error)
  }
}

const addSpeciality = () => {
  userStore.user.speciality.push({title: '', level: '' })
}

const removeSpeciality = (index: number) => {
  userStore.user.speciality.splice(index, 1)
}

onMounted(() => {
  fetchUserProfile()
})
</script>

<style scoped>

.large-icon {
  font-size: 2em;
  vertical-align: middle;
}

:deep(.p-tabview .p-tabview-nav) {
  background-color: #f9f9f9;
}

:deep(.p-tabview .p-tabview-panels) {
  padding: 2rem;
  background-color: #f9f9f9;
}
.profile-container {
  margin: 6rem auto 3rem auto;
  max-width: 800px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;
}

.avatar {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  margin-right: 1rem;
}

.title {
  font-size: 2rem;
  color: #34495e;
  flex-grow: 1;
}

.card h2, .info-card h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.p-field label {
  font-weight: bold;
  color: #555;
}

.p-field {
  margin-bottom: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.speciality-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.save-button, .edit-button {
  padding: 0.5rem 1rem;
}

.edit-button, .save-button {
  display: flex;
  background-color: #34495e;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  border: 1px solid #34495e;
}

.edit-button:hover, .save-button:hover {
  background-color: #45a049;
  border: 1px solid #45a049;
}

.save-button {
  display: block;
  margin: 2rem auto 0;
  padding: 1rem 2rem;
  font-size: 1.25rem;
}

.add-speciality-button {
  margin-top: 1rem;
}

.icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
  color: #4CAF50;
}

.comment-card {
  padding: 1rem;
  background-color: #fff9c4;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  text-align: center;
}

.comment-text {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.comment-note {
  color: #888;
}

.comment-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.legend {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

.legend p {
  margin: 0;
}

.star {
  color: gold;
  font-size: 1.5rem;
}

.average-note {
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.note-label {
  font-weight: bold;
  margin-right: 0.5rem;
}

.info-header{
  font-weight: bold;
}
</style>
