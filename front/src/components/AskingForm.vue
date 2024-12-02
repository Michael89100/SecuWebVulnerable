<template>
  <div class="asking-form-container">
    <form @submit.prevent="submitForm">
      <div class="p-field">
        <label for="title">Titre</label>
        <InputText id="title" v-model="form.title" class="input-field" />
      </div>
      <div class="p-field">
        <label for="description">Description</label>
        <InputTextarea id="description" v-model="form.description" class="input-field" rows="3" />
      </div>
      <div class="p-field">
        <label for="state">État</label>
        <Dropdown id="state" v-model="form.state" :options="stateOptions" optionLabel="label" optionValue="value" class="input-field" />
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
import InputTextarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

const props = defineProps({
  asking: Object
});

const emit = defineEmits(['save', 'close']);

const stateOptions = [
  { label: 'En attente', value: 'pending' },
  { label: 'Accepter', value: true },
  { label: 'Refuser', value: false },
];

const form = ref({
  title: '',
  description: '',
  state: 'pending',
  asking_id: ''
});

const initializeForm = (asking: any) => {
  if (asking) {
    form.value = {
      title: asking.title || '',
      description: asking.description || '',
      state: asking.state === null ? 'pending' : asking.state,
      asking_id: asking.id
    };
  }
};

watch(() => props.asking, (newAsking) => {
  initializeForm(newAsking);
}, { immediate: true });

const submitForm = () => {
  const submissionForm = { ...form.value };
  if (submissionForm.state === 'pending') {
    submissionForm.state = null;
  }
  emit('save', submissionForm);
};

onMounted(() => {
  initializeForm(props.asking);
});
</script>

<style scoped>
.asking-form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 600px;
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

.input-field textarea {
  resize: vertical;
}

.input-field .p-dropdown {
  height: 40px;
}

.form-actions {
  display: flex;
  justify-content: end;
  margin-top: 1.5rem;
}

.p-button-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.p-button-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}
</style>
