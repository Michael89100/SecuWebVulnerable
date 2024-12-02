<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue';
import Button from 'primevue/button';
import { createDailyCallFrame } from './daily';
import { useRouter } from 'vue-router';

const callFrame = ref<any>(null);
const roomUrl = ref('https://challengestack.daily.co/2M4q7Hu168AQDZFsKaHS');
const isCallActive = ref(false);
const router = useRouter()

const updateSize = () => {
  const iframe = document.querySelector('iframe');
  if (!iframe) return;

  const width = Math.min(window.innerWidth, 1000);
  const height = width * (9 / 16);

  iframe.style.width = `${width}px`;
  iframe.style.height = `${height}px`;
  iframe.style.position = 'absolute';
  iframe.style.top = '50%';
  iframe.style.left = '50%';
  iframe.style.transform = 'translate(-50%, -50%)';
};

const startCall = () => {
  callFrame.value = createDailyCallFrame(document.getElementById('call-frame'), roomUrl.value);
  isCallActive.value = true;
  updateSize();
};

const leaveCall = () => {
  if (callFrame.value) {
    callFrame.value.leave();
    isCallActive.value = false;

    const callFrameElement = document.getElementById('call-frame');
    if (callFrameElement) {
      callFrameElement.innerHTML = '';
    }

    callFrame.value.destroy();
    callFrame.value = null;
    router.push("/")
  }
};

onMounted(() => {
  window.addEventListener('resize', updateSize);
  updateSize(); // Ensure size is set on load
});

onBeforeUnmount(() => {
  if (callFrame.value) {
    callFrame.value.destroy();
  }
  window.removeEventListener('resize', updateSize);
});
</script>

<template>
  <div class="video-container">
    <div v-if="!isCallActive" class="setup">
      <h2 class="description">Bienvenue sur l'application d'appel vidéo Daily. Cliquez sur le bouton ci-dessous pour démarrer votre appel.</h2>
      <Button label="Démarrer l'appel" icon="pi pi-video" @click="startCall" class="start-button" />
    </div>
    <div v-if="isCallActive" id="call-frame" class="call-frame"></div>
    <Button v-if="isCallActive" label="Quitter l'appel" icon="pi pi-times" class="leave-button" @click="leaveCall" />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.video-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1d1f27;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  color: #ffffff;
}

.setup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeIn 1s ease-in-out;
}

.description {
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
}

.call-frame-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.call-frame {
  width: 1000px;
  height: 600px;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  animation: scaleIn 0.5s ease-in-out;
}

.call-frame iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 10px;
}

.leave-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #ff4b5c;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.leave-button:hover {
  background-color: #ff2b3a;
  transform: translateY(-2px);
}

.start-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 10px;
}

.start-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
