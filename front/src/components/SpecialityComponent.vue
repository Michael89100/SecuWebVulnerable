<template>
    <h3 class="specialities-title">Spécialités</h3>

    <div v-for="(speciality, index) in specialities" :key="index" class="p-fluid speciality-section">
        <div class="p-field">
            <label :for="'speciality-title-' + index">Titre de la spécialité</label>
            <InputText :id="'speciality-title-' + index" v-model="speciality.title" />
        </div>

        <div class="p-field">
            <label :for="'speciality-level-' + index">Niveau de la spécialité</label>
            <Dropdown :id="'speciality-level-' + index" v-model="speciality.level" :options="levels" optionLabel="label" optionValue="value" />
        </div>

        <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-mt-2 remove-button" @click="$emit('removeSpeciality', index)" />

    </div>
    <Button label="Ajouter une specialité" icon="pi pi-plus" @click="$emit('addSpeciality')" class="p-mt-2 p-button-outlined p-button-secondary add-button" />
  </template>

  <script setup lang="ts">
  import Button from "primevue/button";
  import Dropdown from 'primevue/dropdown';
  import InputText from 'primevue/inputtext';

  const props = defineProps(['specialities'])


  const levels = [
      { label: 'Expert', value: 'expert' },
      { label: 'Intermediaire', value: 'intermediate' },
      { label: 'Debutant', value: 'beginner' }
  ];

  </script>

  <style scoped>
  .remove-button {
      position: absolute;
      top: 10px;
      right: 10px;
      width:  18px;
      height: 10px;
  }

  .add-button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
  }

  .speciality-section {
      margin-bottom: 1.5rem;
      padding: 10px;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      position: relative;
  }

  .specialities-title {
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 1.25rem;
      color: #444;
  }

  </style>