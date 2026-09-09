<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore();
</script>

<template>
  <div class="save-load">
    <button @click="gameStore.saveGame()">Speichern</button>
    <button @click="gameStore.loadGame()">Laden</button>
  </div>
</template>
