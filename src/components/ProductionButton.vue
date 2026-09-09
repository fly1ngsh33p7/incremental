<template>
    <div class="heading">ProductionButton</div>
  <div class="production-button container">
    <template v-if="production">
        <h3>{{ production.name }}</h3>
        <p>{{ production.description }}</p>
        <p>Kosten: {{ production.cost }}</p>
        <p>Output: {{ production.output }}</p>
        <p>Fortschritt: {{ (production.progress / production.productionTime) * 100 }}%</p>
        <button
        @click="startProduction"
        :disabled="production.isBuilt || !gameStore.resources || gameStore.removeResources(production.cost)"
        >
        {{ production.isBuilt ? 'built' : 'buy' }}
        </button>
        <button @click="stopProduction" :disabled="!production.active">
        Stoppen
        </button>
    </template>
    <template v-if="!production">
        <p>Production not found.</p>
    </template>
  </div>
</template>


<script setup lang="ts">
import { useProductionStore } from '@/stores/productionStore';
import { useGameStore } from '@/stores/gameStore';
import { computed } from 'vue';

const productionStore = useProductionStore();
const gameStore = useGameStore();

const props = defineProps<{
  productionId: string;
}>();

const production = computed(() => productionStore.productions[props.productionId]) ?? null;

const startProduction = () => {
  productionStore.startProduction(props.productionId);
};

const stopProduction = () => {
  productionStore.stopProduction(props.productionId);
};
</script>


