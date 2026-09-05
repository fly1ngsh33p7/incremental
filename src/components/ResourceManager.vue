<template>
    <div id="resource-manager" class="container">
        <div class="heading">Resource Manager</div>
        <div>
            <p>Name: {{ resource.name }}</p>
            <p>Amount: {{ resource.amount }}</p>
            <p>Initial Cost: {{ resource.initialCost }}</p>
            <p>Current Cost: {{ resource.getCurrentCost() }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { Resource } from '@/Resource';
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'ResourceManager',
        mounted(): void {
            // run on mount
            // afunction();
        },
        components: {
            // OtherComponent, // used components
        },
        props: { resource: { type: Resource, required: true } }, // define props
    });
</script>

<style scoped>
    #resource-manager {
        /* css */
    }
</style>
