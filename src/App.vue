<template>
    <div class="heading">App</div>
    <div class="container">
        <div id="game">
            <Game />
        </div>
    </div>
</template>

<script lang="ts">
    import Game from './components/Game.vue';
    export default {
        name: 'App',
        mounted() {
            // run on mount

        },
        components: {
            // OtherComponent, // used components
            Game,
        },
    };
</script>

<style>
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
