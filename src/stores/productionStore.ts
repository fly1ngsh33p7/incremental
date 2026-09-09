import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGameStore } from './gameStore';
import { useTimeStore } from './timeStore';
import type { Production, ProductionMap } from '@/types/gameTypes';

export const useProductionStore = defineStore('production', () => {
  const productions = ref<ProductionMap>({});
  const gameStore = useGameStore();
  const timeStore = useTimeStore();

  /**
   * Fügt eine neue Produktion hinzu.
   * @param production Produktionsdaten
   */
  const addProduction = (production: Omit<Production, 'active' | 'progress' | 'isBuilt'>) => {
    productions.value[production.id] = {
      ...production,
      active: false,
      progress: 0,
      isBuilt: false,
    };
  };

  /**
   * Startet eine Produktion (falls genug Ressourcen vorhanden sind).
   * @param productionId ID der Produktion
   */
  const startProduction = (productionId: string) => {
    const production = productions.value[productionId];
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
  const stopProduction = (productionId: string, refundPercentage: number = 0.5) => {
    const production = productions.value[productionId];
    if (!production || !production.isBuilt) return false;

    production.active = false;

    // Ressourcen teilweise zurückgeben
    for (const cost of production.cost) {
      gameStore.addResources({
        [cost.resourceId]: cost.amount * refundPercentage,
      });
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
            gameStore.addResources({
              [output.resourceId]: output.amount,
            });
          }
        }
      }
    });
  };

  return {
    productions,
    addProduction,
    startProduction,
    stopProduction,
    updateProductionProgress,
  };
});
