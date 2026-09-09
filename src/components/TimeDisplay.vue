<template>
  <div class="time-display container">
    <h2>In-Game-Zeit</h2>
    <p>{{ timeStore.formattedGameTime }}</p>
    <button @click="timeStore.start()" :disabled="!timeStore.isPaused && !timeStore.startTime">
      Starten
    </button>
    <button @click="timeStore.pause()" :disabled="timeStore.isPaused">
      Pausieren
    </button>
    <button @click="timeStore.reset()">Zurücksetzen</button>
  </div>
</template>

<script setup lang="ts">
import { useTimeStore } from '@/stores/timeStore';
import { realTimeToGameTime } from '@/utils/timeUtils';
import { onMounted, onUnmounted } from 'vue';

const timeStore = useTimeStore();

// Timer-Intervall starten
onMounted(() => {
  timeStore.intervalId = setInterval(() => {
    if (!timeStore.isPaused && timeStore.startTime) {
      const currentTime = new Date();
      timeStore.gameTime += realTimeToGameTime(
        currentTime.getTime() - timeStore.startTime.getTime(),
        timeStore.timeScale
      );
      timeStore.startTime = currentTime;
    }
  }, 1000); // Aktualisierung alle 1000ms (1 Sekunde Echtzeit)
});

onUnmounted(() => {
  if (timeStore.intervalId) {
    clearInterval(timeStore.intervalId);
  }
});
</script>


