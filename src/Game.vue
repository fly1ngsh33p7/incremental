<template>
    Game
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <UniverseCanvas />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import UniverseCanvas from './components/UniverseCanvas.vue'
import { init } from "@/game";

export default {
  // eslint-disable-next-line
  name: "Game",
  mounted() {
    init();
  },
  components: {
    HelloWorld,
    UniverseCanvas,
  },
};
</script>

<style>
#game {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>