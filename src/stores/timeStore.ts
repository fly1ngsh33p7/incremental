import { realTimeToGameTime } from '@/utils/timeUtils';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTimeStore = defineStore('time', () => {
  // Basis: 1 Tag Echtzeit = 1 Sekunde In-Game-Zeit
  const timeScale = ref(1);
  const startTime = ref<Date | null>(null);
  const pauseTime = ref<Date | null>(null);
  const isPaused = ref(false);

  // Aktuelle In-Game-Zeit (Sekunden)
  const gameTime = ref(0);

  // Timer-Intervall (wird in der Vue-Komponente gestartet)
  const intervalId = ref<number>(-1);

  /**
   * Startet die Zeit.
   */
  const start = () => {
    if (isPaused.value) {
      const pausedDuration = (new Date().getTime() - pauseTime.value!.getTime()) / 1000;
      gameTime.value += realTimeToGameTime(pausedDuration * 1000, timeScale.value);
      isPaused.value = false;
      pauseTime.value = null;
    } else {
      startTime.value = new Date();
    }
    isPaused.value = false;
  };

  /**
   * Pausiert die Zeit.
   */
  const pause = () => {
    if (!isPaused.value) {
      pauseTime.value = new Date();
      isPaused.value = true;
    }
  };

  /**
   * Setzt die Zeit zurück.
   */
  const reset = () => {
    startTime.value = null;
    pauseTime.value = null;
    isPaused.value = false;
    gameTime.value = 0;
  };

  /**
   * Gibt die aktuelle In-Game-Zeit als lesbare Zeichenkette zurück.
   */
  const formattedGameTime = computed(() => {
    const years = Math.floor(gameTime.value / 365.256);
    const remainingDays = gameTime.value % 365.256;
    const days = Math.floor(remainingDays);
    const hours = Math.floor((remainingDays - days) * 24);
    const minutes = Math.floor(((remainingDays - days) * 24 - hours) * 60);
    const seconds = Math.floor((((remainingDays - days) * 24 - hours) * 60 - minutes) * 60);

    return `${years} Jahre, ${days} Tage, ${hours} Stunden, ${minutes} Minuten, ${seconds} Sekunden`;
  });

  return {
    timeScale,
    startTime,
    pauseTime,
    gameTime,
    isPaused,
    start,
    pause,
    reset,
    formattedGameTime,
    intervalId,
  };
});
