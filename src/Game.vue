<template>
    <div class="heading">Game</div>
    <ResourceManagerGroupWrapper />
</template>

<script lang="ts">
    // es-lint-disable-next-line 
    import ResourceManagerGroupWrapper from './components/ResourceManagerGroupWrapper.vue';
    export default {
        name: 'Game',
        mounted() {
            // run on mount
            //afunction();
        },
        components: {
            // OtherComponent, // used components
            ResourceManagerGroupWrapper,
        },
    };
</script>

<style>
    @import './assets/base.css';

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

    @media (hover: hover) {
        a:hover {
            background-color: hsla(160, 100%, 37%, 0.2);
        }
    }
</style>
