import type { ResourceAmountMap } from '@/types/gameTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameStore = defineStore('game', () => {
  const resources = ref<ResourceAmountMap>({});


  resources.value = {
    'resource1': { resourceId: 'resource1', amount: 100 },

  /**
   * Fügt Ressourcen hinzu.
   * @param resourceAmountMap Ressourcen und Mengen
   */
  const addResources = (resourceAmountMap: ResourceAmountMap) => {
    for (const [resourceAmountId, amount] of Object.entries(resourceAmountMap)) {
      if (!resources.value[resourceAmountId]) {
        resources.value[resourceAmountId] = { resourceId: resourceAmountId, amount: 0 };
      } else {
        resources.value[resourceAmountId].amount += amount.amount;
      }
    }
  };

  /**
   * Entfernt Ressourcen.
   * @param resourceAmountMap Ressourcen und Mengen
   * @returns true, wenn die Ressourcen erfolgreich entfernt wurden, sonst false
   */
  const removeResources = (resourceAmountMap: ResourceAmountMap): boolean => {
    const newResources: ResourceAmountMap = { ...resources.value };

    for (const [resourceAmountId, amount] of Object.entries(resourceAmountMap)) {
      if ((newResources[resourceAmountId] || 0) < amount) {
        return false; // Nicht genug Ressourcen
      }
      
      if (newResources[resourceAmountId] != null) {
        newResources[resourceAmountId].amount -= amount.amount;
      } else {
        throw new Error(`Resource ${resourceAmountId} does not exist in the store.`);
      }
    }

    resources.value = newResources;
    return true;
  };

  /**
   * Setzt alle Ressourcen zurück.
   */
  const resetResources = () => {
    resources.value = {};
  };

  // Spielstand in localStorage speichern
  const saveGame = (resources, productions, gameTime) => {
    const state = {
      resources: resources,
      productions: productions,
      gameTime: gameTime,
    };
    localStorage.setItem('incrementalGameSave', JSON.stringify(state));
  };

  // Spielstand laden
  const loadGame = () => {
    const saved = localStorage.getItem('incrementalGameSave');
    if (saved) {
      const state = JSON.parse(saved);

      return {
        resources: resources,
        productions: productions,
        gameTime: gameTime,
      };
      // resources.value = state.resources;
      // productionStore.productions = state.productions;
      // timeStore.gameTime = state.gameTime;
    } else {
      // new game
      return {
        resources: {},
        productions: {},
        gameTime: 0,
      };
    }
  };

  return {
    resources,
    addResources,
    removeResources,
    resetResources,
    saveGame,
    loadGame,
  };
});
