<template>
  <div class="admin-container" style="margin-top: 3rem;">
    <h2>Gestion des utilisateurs</h2>
    <Button label="Ajouter un utilisateur" @click="openAddUserDialog" class="p-button-primary add-user-button" />

    <div class="user-table">
      <div class="user-table-header">
        <div class="user-table-row">
          <div class="user-table-cell name-cell">Nom</div>
          <div class="user-table-cell firstname-cell">Prénom</div>
          <div class="user-table-cell email-cell">Email</div>
          <div class="user-table-cell pseudo-cell">Pseudo</div>
          <div class="user-table-cell actions-cell">Actions</div>
        </div>
      </div>
      <div class="user-table-body">
        <div v-for="user in users" :key="user._id" class="user-table-row">
          <div class="user-table-cell name-cell">{{ user.name }}</div>
          <div class="user-table-cell firstname-cell">{{ user.firstname }}</div>
          <div class="user-table-cell email-cell">{{ user.mail }}</div>
          <div class="user-table-cell pseudo-cell">{{ user.pseudo }}</div>
          <div class="user-table-cell actions-cell">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-primary" @click="editUser(user)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="confirmDeleteUser(user._id)" />
          </div>
        </div>
      </div>
    </div>

    <Dialog style="width: 50%;" header="Ajouter un utilisateur" v-model:visible="isAddUserDialogVisible" modal>
      <UserForm @save="addUser" @close="isAddUserDialogVisible = false" />
    </Dialog>

    <Dialog style="width: 50%;" header="Modifier l'utilisateur" v-model:visible="isEditUserDialogVisible" modal>
      <UserForm :user="selectedUser" @save="updateUser" @close="isEditUserDialogVisible = false" />
    </Dialog>

    <Dialog header="Confirmation de suppression" v-model:visible="isConfirmDialogVisible" modal>
      <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
      <div class="confirmation-buttons">
        <Button label="Oui" class="p-button-danger" @click="deleteUser(confirmedUserId)" />
        <Button label="Non" class="p-button-secondary" @click="isConfirmDialogVisible = false" />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import UserForm from '@/components/UserForm.vue';
import { useAuthStore } from '@/stores/authStore';

const userStore = useUserStore();
const authStore = useAuthStore();
const users = ref([{}]);
const isAddUserDialogVisible = ref(false);
const isEditUserDialogVisible = ref(false);
const isConfirmDialogVisible = ref(false);
const selectedUser = ref({});
const confirmedUserId = ref('');

const fetchUsers = async () => {
  await userStore.fetchUsersAdmin();
  users.value = userStore.users;
}

const openAddUserDialog = () => {
  isAddUserDialogVisible.value = true;
}

const editUser = (user: any) => {
  selectedUser.value = user;
  isEditUserDialogVisible.value = true;
}

const addUser = async (user: any) => {
  user.password = 'test';
  await authStore.register(user);
  isAddUserDialogVisible.value = false;
  await fetchUsers();
}

const updateUser = async (user: any) => {
  await userStore.saveUserProfileId(user.user_id, user);
  isEditUserDialogVisible.value = false;
  await fetchUsers();
}

const confirmDeleteUser = (userId: string) => {
  confirmedUserId.value = userId;
  isConfirmDialogVisible.value = true;
}

const deleteUser = async (userId: string) => {
  await userStore.deleteUser(userId);
  isConfirmDialogVisible.value = false;
  await fetchUsers();
}

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.admin-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.add-user-button {
  display: block;
  margin: 0 auto 20px auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.user-table-header {
  background-color: #f4f4f9;
}

.user-table-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.user-table-cell {
  padding: 10px;
  text-align: left;
  flex: 1;
}

.name-cell {
  flex: 1;
}

.firstname-cell {
  flex: 1;
}

.email-cell {
  flex: 2;
  overflow-wrap: anywhere;
}

.pseudo-cell {
  flex: 1;
}

.actions-cell {
  flex: 0.75;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.user-table-row:nth-child(even) {
  background-color: #f9f9f9;
}

.user-table-row:hover {
  background-color: #e9e9e9;
}

.p-button-text {
  padding: 0;
}

.confirmation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
