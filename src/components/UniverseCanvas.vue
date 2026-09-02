<template>
    <div id="universe-canvas-container">
        UniverseCanvas
        <canvas id="universe-canvas"></canvas>
    </div>
</template>

<script>
export default {
  name: "UniverseCanvas",
  mounted() {
    // run on mount
  },
  components: {
    // OtherComponent, // used components
  },
};
</script>

<style scoped>
#universe-canvas-container {
    width: 100%;
    height: 100%;
}

#universe-canvas {
    width: 800px;
    height: 600px;
}
</style>