import {defineStore} from 'pinia';
import apiClient from '../httpRequest/apiConfig';
import Asking from "@/models/Asking";
import eventBus from '@/eventBus'

export const useAskingStore = defineStore('asking', {
  state: () => ({
    error: "",
    mentorAsking: [],
    userAsking: [],
    askings: [] as Asking[],
  }),

  actions: {
    async newAsking(asking: Asking) {
      try {
        await apiClient.post('/asking', asking);
        this.error = "";
        eventBus.emit('show-toast', {
          severity: 'success',
          summary: 'Demandes',
          detail: 'Votre demande à été créer avec succès',
          life: 3000
        });
      } catch (e) {
        this.error = 'Erreur' + e;
        eventBus.emit('show-toast', {
          severity: 'error',
          summary: 'Demandes',
          detail: 'Echec lors de la récupération des demandes',
          life: 3000
        });
        console.error('Failed:', e);
      }
    },

    async fetchAsking() {
      try {
        const response = await apiClient.get('/asking');
        this.askings = response.data;
        this.error = "";
      } catch (e) {
        this.error = 'Erreur' + e;
        eventBus.emit('show-toast', {
          severity: 'warn',
          summary: 'Demandes',
          detail: 'Il n\'y as pas de demandes dans la bdd',
          life: 3000
        });
        console.error('Failed:', e);
      }
    },

    async editAsking(id: string, asking: Asking) {
      try {
        await apiClient.patch(`/asking/${id}`, asking);
        eventBus.emit('show-toast', {
          severity: 'success',
          summary: 'Demandes',
          detail: 'Votre demande à été modifier avec succès',
          life: 3000
        });
        this.error = "";
      } catch (e) {
        this.error = 'Erreur' + e;
        eventBus.emit('show-toast', {
          severity: 'error',
          summary: 'Demandes',
          detail: 'Une erreur est survenue lors de la modification',
          life: 3000
        });
        console.error('Failed:', e);
      }
    },

    async deleteAsking(id: string) {
      try {
        await apiClient.delete(`/asking/${id}`);
        eventBus.emit('show-toast', {
          severity: 'success',
          summary: 'Demandes',
          detail: 'Votre demande à été supprimer avec succès',
          life: 3000
        });
        this.error = "";
      } catch (e) {
        this.error = 'Erreur' + e;
        eventBus.emit('show-toast', {
          severity: 'error',
          summary: 'Demandes',
          detail: 'Une erreur est survenue lors de la suppression',
          life: 3000
        });
        console.error('Failed:', e);
      }
    },

    async askingByMentorId(id : string) {
      try {
        const response = await apiClient.get(`/askings/mentor/${id}`)
        this.mentorAsking = response.data.map(el => Object.assign(new Asking(), el))
        this.error = "";
      } catch (e) {
        this.error = 'Erreur' + e;
        console.error('Failed:', e);
      }
    },
    async askingByUserId(id : string) {
      try {
        const response = await apiClient.get(`/askings/user/${id}`)
        this.userAsking = response.data.map(el => Object.assign(new Asking(), el))
        this.error = "";
      } catch (e) {
        this.error = 'Erreur' + e;
        console.error('Failed:', e);
      }
    },
    async acceptAsking(id: string, state: boolean) {
      try {
        const response = await apiClient.patch(`/accept-asking/${id}`, {state: state})
        eventBus.emit('show-toast', {
          severity: 'success',
          summary: 'Status modifié',
          detail: 'La demande a bien été modifié',
          life: 3000
        });
        this.error = "";
      } catch (e) {
        this.error = 'Erreur' + e;
        console.error('Failed:', e);
        eventBus.emit('show-toast', {
          severity: 'success',
          summary: 'Erreur',
          detail: e.msg,
          life: 3000
        });
      }
    },
  },
});
