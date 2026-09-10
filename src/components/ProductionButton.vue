<template>
    <div class="heading">ProductionButton</div>
  <div class="production-button container">
    <template v-if="production !== null">
        <h3>{{ production.name }}</h3>
        <p>{{ production.description }}</p>
        <p><b>Kosten: </b>{{ production.cost }}</p>
        <p><b>Output: </b>{{ production.output }}</p>
        <p><b>Fortschritt: </b>{{ (production.progress / production.productionTime) * 100 }}%</p>
        <button
            @click="startProduction(production)"
            :disabled="production.isBuilt || !gameStore.availableResources || gameStore.removeResources(production.cost)"
        >
            {{ production.isBuilt ? 'built' : 'buy' }}
        </button>
        <button @click="startProduction(production)" :disabled="production.active">
            Start
        </button>
        <button @click="stopProduction(production)" :disabled="!production.active">
            Stoppen
        </button>
    </template>
    <template v-if="!production">
        <p>Production not found.</p>
    </template>
  </div>
</template>


<script lang="ts">
    import { useGameStore } from '@/stores/gameStore';

    export default {
        name: 'ProductionButton',
        props: {
            production: {
                type: Object,
                required: true,
            },
            startProduction: {
                type: Function,
                required: true,
            },
            stopProduction: {
                type: Function,
                required: true,
            }
        },
        setup() {
            // run on mount
            const gameStore = useGameStore();

            return {
                gameStore,
            };
        },
        components: {
            // OtherComponent, // used components
        },
    };
</script>


