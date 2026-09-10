import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGameStore } from './gameStore';
import { useTimeStore } from './timeStore';
import type { Production } from '@/types/gameTypes';
import { loadProductions } from '@/utils/configLoader';

export const useProductionStore = defineStore('production', () => {
  const productions = ref<Production[]>(loadProductions());
  const gameStore = useGameStore();
  const timeStore = useTimeStore();

  /**
   * Fügt eine neue Produktion hinzu.
   * @param production Produktionsdaten
   */
  const addProduction = (production: Production) => {
    productions.value.push(production);
  };

  /**
   * Startet eine Produktion (falls genug Ressourcen vorhanden sind).
   * @param productionId ID der Produktion
   */
  const startProduction = (production: Production) => {
    if (!production || production.isBuilt || !gameStore.removeResources(production.cost)) {
      return false; // Nicht genug Ressourcen oder Produktion bereits gebaut
    }

    production.isBuilt = true;
    production.active = true;
    production.progress = 0;
    return true;
  };

  /**
   * Stoppt eine Produktion und gibt einen Anteil der Ressourcen zurück.
   * @param productionId ID der Produktion
   * @param refundPercentage Anteil der Ressourcen, der zurückgegeben wird (0-1)
   */
  const stopProduction = (production: Production, refundPercentage: number = 0.5) => {
    if (!production || !production.isBuilt) return false;

    production.active = false;

    // Ressourcen teilweise zurückgeben
    for (const { resource, amount } of production.cost) {
      gameStore.addResources([{
        resource: resource,
        amount: amount * refundPercentage,
      }]);
    }

    return true;
  };

  /**
   * Aktualisiert den Fortschritt aller aktiven Produktionen.
   */
  const updateProductionProgress = () => {
    Object.values(productions.value).forEach((production) => {
      if (production.active && production.isBuilt) {
        production.progress += timeStore.gameTime;
        if (production.progress >= production.productionTime) {
          // Produktion ist fertig und liefert Ressourcen
          production.progress = 0;
          for (const output of production.output) {
            gameStore.addResources([{
              resource: output.resource,
              amount: output.amount,
            }]);
          }
        }
      }
    });
  };

  const getAllProductions = () => {
    return productions.value;
  };

  return {
    productions,
    getAllProductions,
    addProduction,
    startProduction,
    stopProduction,
    updateProductionProgress,
  };
});
