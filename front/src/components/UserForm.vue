<template>
  <div class="user-form-container">
    <form @submit.prevent="submitForm">
      <div class="p-field">
        <label for="name">Nom <span v-if="!user" style="color: red;">*</span></label>
        <InputText id="name" v-model="form.name" class="input-field" required />
      </div>
      <div class="p-field">
        <label for="firstname">Prénom <span v-if="!user" style="color: red;">*</span></label>
        <InputText id="firstname" v-model="form.firstname" class="input-field" required />
      </div>
      <div class="p-field">
        <label for="mail">Email <span v-if="!user" style="color: red;">*</span></label>
        <InputText id="mail" type="email" v-model="form.mail" class="input-field" required />
      </div>
      <div class="p-field">
        <label for="pseudo">Pseudo <span v-if="!user" style="color: red;">*</span></label>
        <InputText id="pseudo" v-model="form.pseudo" class="input-field" required />
      </div>
      <div class="p-field">
        <label for="role">Rôle <span v-if="!user" style="color: red;">*</span></label>
        <Dropdown id="role" v-model="form.role" :options="roleOptions" placeholder="Choisir un rôle" optionLabel="label" optionValue="value" class="input-field" required />
      </div>
      <div class="form-actions">
        <Button label="Enregistrez" type="submit" class="p-button-primary" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

const props = defineProps({
  user: Object
});

const emit = defineEmits(['save', 'close']);

const roleOptions = [
  { label: 'User', value: 'ROLE_USER' },
  { label: 'Admin', value: 'ROLE_ADMIN' }
];

const form = ref({
  name: '',
  firstname: '',
  mail: '',
  pseudo: '',
  user_id: '',
  role: ''
});

const initializeForm = (user: any) => {
  if (user) {
    form.value = {
      name: user.name || '',
      firstname: user.firstname || '',
      mail: user.mail || '',
      pseudo: user.pseudo || '',
      user_id: user._id,
      role: user.role
    };
  }
};

watch(() => props.user, (newUser) => {
  initializeForm(newUser);
}, { immediate: true });

const submitForm = () => {
  emit('save', form.value);
};

onMounted(() => {
  initializeForm(props.user);
});
</script>

<style scoped>
.user-form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 600px; /* Augmenté la largeur maximale */
  margin: 0 auto;
}

.p-field {
  margin-bottom: 1.5rem;
}

.p-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #444;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  justify-content: end;
  margin-top: 1.5rem;
}

</style>
