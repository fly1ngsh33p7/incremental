<template>
    <div id="universe-canvas-container" class="container">
        UniverseCanvas
        <canvas id="universe-canvas" class="container"></canvas>
    </div>
</template>

<script>
export default {
  name: "UniverseCanvas",
  mounted() {
    // run on mount
    this.setup();
  },
  components: {
    // OtherComponent, // used components
  },
  methods: {
    setup() {
        const canvas = document.getElementById("universe-canvas");
        const ctx = canvas.getContext("2d");

        // Example: Draw a simple rectangle
        ctx.fillStyle = "black";
        ctx.fillRect(50, 50, 200, 100);
    }
  },
};
</script>

<style scoped>
#universe-canvas-container {
    margin: 8px;
}

#universe-canvas {
    width: 800px;
    height: 600px;
    
}
</style>