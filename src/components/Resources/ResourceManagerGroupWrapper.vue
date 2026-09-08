<template>
    <div id="resource-manager-group-wrapper" class="container">
        <div class="heading">Resource Manager Group Wrapper</div>
        <div
        v-for="resourceTaxonomy in resourcesStore.getUnlockedResourceTaxonomyTypes()"
        :key="resourceTaxonomy"
        class="container"
        >
            <div class="heading">{{ resourceTaxonomy }}</div>
            <ResourceManagerGroup :resourceTaxonomy="resourceTaxonomy" />
        </div>
    </div>
</template>

<script>
    import { useResourcesStore } from '../../stores/resources.ts';
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