<template>
    <div class="heading">Game</div>
    <div class="container">
        <div class="heading">Productions</div>
        <ProductionButton productionId="production1" />
        <ProductionButton productionId="production2" />
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

        
    const timeStore = useTimeStore();
    const productionStore = useProductionStore();
    const gameStore = useGameStore();

    export default {
        name: 'Game',
        mounted() {
            // run on mount
            //afunction();
            gameStore.loadGame();

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

    .container {
        border: 1px solid #000;
        border-radius: 6px;
        margin: 8px;
    }

    .heading {
        font-weight: bold;
        font-size: 1.2rem;
    }
</style>
