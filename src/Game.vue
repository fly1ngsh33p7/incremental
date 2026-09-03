<template>
    <i>incremental</i>
    <UniverseCanvas />
    <UI />
</template>

<script>
import UI from './components/UI.vue';
import UniverseCanvas from './components/canvas/UniverseCanvas.vue';
import { init } from "@/game";

export default {
  // eslint-disable-next-line
  name: "Game",
  mounted() {
    init();
  },
  components: {
    UniverseCanvas,
    UI,
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
</style>