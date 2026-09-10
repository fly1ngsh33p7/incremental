<template>
    <div class="heading">Game</div>
    <div class="container">
        <div class="heading">Productions</div>
        
        <ProductionButton
            v-for="production in productionStore.getAllProductions()"
            :key="production.id"
            :production="production"
            :startProduction="() => productionStore.startProduction(production)"
            :stopProduction="() => productionStore.stopProduction(production)"
        />
        <TimeDisplay />
        <SaveLoad />
    </div>
</template>

<script lang="ts">
    import TimeDisplay from './TimeDisplay.vue';
    import SaveLoad from './SaveLoad.vue';
    import ProductionButton from './ProductionButton.vue';
    import { useGameStore } from '@/stores/gameStore.ts';
    import { useTimeStore } from '@/stores/timeStore.ts';
    import { useProductionStore } from '@/stores/productionStore.ts';
    

    export default {
        name: 'Game',
        setup() {
            // run on mount
            const timeStore = useTimeStore();
            const productionStore = useProductionStore();
            const gameStore = useGameStore();

            gameStore.loadGame();

            return {
                timeStore,
                productionStore,
                gameStore,
            };

        },
        components: {
            // OtherComponent, // used components
            TimeDisplay,
            SaveLoad,
            ProductionButton,
        },
    };
</script>

<style>
    /* Root div for the game/website */
    #game {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
