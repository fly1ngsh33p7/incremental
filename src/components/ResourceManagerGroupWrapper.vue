<template>
    <div id="resource-manager-group-wrapper" class="container">
        <div class="heading">Resource Manager Group Wrapper</div>
        <ResourceManagerGroup 
            v-for="resourceTaxonomy in resourcesStore.getUnlockedResourceTaxonomyTypes()"
            :key="resourceTaxonomy"
            :resourceTaxonomy="resourceTaxonomy"
        />
    </div>
</template>

<script>
    import { useResourcesStore } from '../stores/resources';
    import ResourceManagerGroup from './ResourceManagerGroup.vue';

    export default {
        name: 'ResourceManagerGroupWrapper',
        setup() {
            const resourcesStore = useResourcesStore();

            return {
                resourcesStore,
            };
        },
        components: {
            // OtherComponent, // used components
            ResourceManagerGroup,
        },
    };
</script>

<style scoped>
    #resource-manager-group-wrapper {
        /* css */
    }
</style>