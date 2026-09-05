<template>
    <div id="resource-manager-group" class="container">
        <div class="heading">ResourceManagerGroup</div>
        <ResourceManager
            v-for="resource in resourcesStore.getUnlockedResources"
            :key="resource.name"
            :resource="resource"
        />
    </div>
</template>

<script lang="ts">
    import { useResourcesStore } from '../stores/resources';
    import ResourceManager from './ResourceManager.vue';

    export default {
        name: 'ResourceManagerGroup',
        setup() {
            const resourcesStore = useResourcesStore();

            return {
                resourcesStore,
            };
        },
        components: {
            ResourceManager,
        },
    };
</script>

<style scoped>
    #resource-manager-group {
        /* css */
    }
</style>
