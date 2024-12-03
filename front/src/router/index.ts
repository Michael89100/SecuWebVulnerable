import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AdminLayout from '@/views/AdminLayout.vue'
import AdminUsers from '@/views/AdminUsers.vue'
import AdminAskings from '@/views/AdminAskings.vue'
import VideoConference from '../views/VideoConference.vue';
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  scrollBehavior: () => {
    return {
      top: 0
    }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lfi',
      name: 'Lfi',
      component: () => import('../views/LFI.vue')
    },
    {
      path: '/demo-rce',
      name: 'demoRCE',
      component: () => import('../views/Demo-RCE.vue')
    },
    {
      path: '/new-asking/:mentor_id',
      name: 'newAsking',
      component: () => import('../views/NewAskingPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterPage.vue')
    },
    {
      path: '/my-profil',
      name: 'myProfil',
      component: () => import('../views/MentorProfilePage.vue')
    },
    {
      path: '/profil/:id',
      name: 'profil',
      component: () => import('../views/ProfilPage.vue')
    },
    {
      path: '/video-conference/:id',
      name: 'video-conference',
      component: VideoConference
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: 'users',
          component: AdminUsers
        },
        {
          path: 'askings',
          component: AdminAskings
        }
      ]
    }
  ]
})

export default router;
