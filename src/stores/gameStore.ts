import type { Production, ResourceAmount } from '@/types/gameTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameStore = defineStore('game', () => {
  const availableResources = ref<ResourceAmount[]>([]);


  availableResources.value = [
    { resource: { id: 'resource1', name: 'Resource 1', description: 'A simple resource', baseValue: 1 }, amount: 100 },
    { resource: { id: 'resource2', name: 'Resource 2', description: 'Another simple resource', baseValue: 2 }, amount: 200 },
  ];

  /**
   * Fügt Ressourcen hinzu.
   * @param resourceAmountMap Ressourcen und Mengen
   */
  const addResources = (resourceAmounts: ResourceAmount[]) => {
    for (const { resource, amount } of resourceAmounts) {
      for (const resourceAmount of resourceAmounts) {
        if (resourceAmount.resource.id === resource.id) {
          resourceAmount.amount += amount;
          return;
        }
      }
    }
  };

  /**
   * Entfernt Ressourcen.
   * @param resourceAmountMap Ressourcen und Mengen
   * @returns true, wenn die Ressourcen erfolgreich entfernt wurden, sonst false
   */
  const removeResources = (resourceAmounts: ResourceAmount[]): boolean => {
    const newResources: ResourceAmount[] = [...availableResources.value ]; // copy value

    for (const { resource, amount } of resourceAmounts) {
      for (const resourceAmount of newResources) {
        if (resourceAmount.resource.id === resource.id) {
          if (resourceAmount.amount < amount) {
            return false; // not enough ressources
          }
          resourceAmount.amount -= amount;
          return true;
        }
      }
    }

    availableResources.value = newResources;
    return true;
  };

  /**
   * Setzt alle Ressourcen zurück.
   */
  const resetResources = () => {
    availableResources.value = [];
  };

  /**
   * Speichert den aktuellen Spielstand in localStorage.
   * @param resources Die aktuellen Ressourcen
   * @param productions Die aktuellen Produktionen
   * @param gameTime Die aktuelle Spielzeit
   */
  const saveGame = (resources: ResourceAmount[], productions: Production[], gameTime: number) => {
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
        resources: state.resources,
        productions: state.productions,
        gameTime: state.gameTime,
      };
      // resources.value = state.resources;
      // productionStore.productions = state.productions;
      // timeStore.gameTime = state.gameTime;
    } else {
      // new game
      return {
        resources: [],
        productions: [],
        gameTime: 0,
      };
    }
  };

  return {
    availableResources,
    addResources,
    removeResources,
    resetResources,
    saveGame,
    loadGame,
  };
});
