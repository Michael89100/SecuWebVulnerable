<template>
  <div class="admin-layout" style="margin-top: 4rem;">
    <nav class="sidebar">
      <div class="sidebar-header">
        <RouterLink to="/admin">
          Admin Panel
        </RouterLink>
      </div>
      <ul>
        <li>
          <RouterLink to="/admin/users">
            <i class="pi pi-users"></i>
            Utilisateurs
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/askings">
            <i class="pi pi-question-circle"></i>
            Demandes
          </RouterLink>
        </li>
      </ul>
    </nav>
    <div class="content">
      <header class="admin-header">
        <h1>Bienvenue sur le Dashboard Admin</h1>
        <p>Gérez les utilisateurs et les demandes depuis ce panneau de contrôle.</p>
      </header>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f4f4f4;
}

.sidebar {
  margin-top: 0;
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-header {
  margin-bottom: 20px;
  text-align: center;
}

.sidebar h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #ecf0f1;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

.sidebar li {
  width: 100%;
}

.sidebar a {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  width: 100%;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sidebar a:hover {
  background-color: #34495e;
}

.sidebar i {
  margin-right: 10px;
}

.content {
  flex: 1;
  padding: 20px;
}

.admin-header {
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.admin-header h1 {
  margin: 0;
  font-size: 2rem;
  color: #2c3e50;
}

.admin-header p {
  color: #7f8c8d;
  margin: 0;
}
</style>
