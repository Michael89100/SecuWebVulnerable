import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  },
});

const getAuthStore = async () => {
  const { useAuthStore } = await import('../stores/authStore');
  return useAuthStore();
};

apiClient.interceptors.request.use(
  async (config) => {
    const authStore = await getAuthStore();
    if (authStore.token) {
      config.headers['authorization'] = `${authStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
