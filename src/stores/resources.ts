import { defineStore } from 'pinia';
import { Resource, ResourceTaxonomy, type CostFunction } from '@/Resource';
import { ref } from 'vue';

export const useResourcesStore = defineStore('resources', () => {
    // State: array of Resource instances
    const resources = ref<Resource[]>([]);

    // Initialization function to create resources once
    function initFunction() {
        // Linear Cost Function Example
        const linearCostFunction: CostFunction = (
            initialCost,
            amount,
        ) => Math.max(initialCost * amount, 1);
        // Piecewise Cost Function Example
        const piecewiseCostFunction: CostFunction = (
            initialCost,
            amount,
        ) => {
            if (amount < 5) {
                return initialCost * amount;
            } else if (amount < 10) {
                return initialCost * Math.pow(amount, 2);
            } else {
                return initialCost * Math.pow(amount, 3);
            }
        };
        resources.value = [
            // ResourceTaxonomy.BASE
            new Resource('Wood', ResourceTaxonomy.BASE, 0, 10, true),
            new Resource('Stone', ResourceTaxonomy.BASE,0, 5, true, linearCostFunction),
            new Resource('Gold', ResourceTaxonomy.BASE, 0, 2, true, piecewiseCostFunction),
            new Resource('Iron', ResourceTaxonomy.BASE,0, 5, true, (initialCost, amount) =>
                Math.max(initialCost * amount, 1),
            ),
            new Resource(
                'Diamond',
                ResourceTaxonomy.BASE,
                0,
                20,
                false,
                (initialCost, amount) =>
                    Math.pow(initialCost, Math.pow(amount, 2)),
            ),
            // ResourceTaxonomy.TECHNOLOGY

        ];
    }

    // Call initFunction immediately when the store is created
    initFunction();

    // Getters
    function getAllResources(resourceTaxonomy?: ResourceTaxonomy): Resource[] {
        const allResources = resources.value;
        if (resourceTaxonomy === undefined) {
            return allResources;
        } else {
            return allResources.filter(r => r.taxonomy === resourceTaxonomy);
        }
    }

    function getUnlockedResourcesByTaxonomy(resourceTaxonomy: ResourceTaxonomy): Resource[] {
        const unlockedResources = resources.value.filter(r => r.isUnlocked);
        const unlockedResourceTaxonomies = getUnlockedResourceTaxonomies(resourceTaxonomy);

        // is the provided resourceTaxonomy in the list of unlockedResourceTaxonomies? If not, return an empty array.
        if (!unlockedResourceTaxonomies.some(r => r.taxonomy === resourceTaxonomy)) {
            return [];
        } else {
            // Return the unlocked resources that match the provided resourceTaxonomy
            return unlockedResources.filter(r => r.taxonomy === resourceTaxonomy);
        }
    }

    function getUnlockedResourceTaxonomies(resourceTaxonomy?: ResourceTaxonomy): Resource[] {
        const unlockedResourceTaxonomies = resources.value.filter(r => r.isUnlocked);
        if (resourceTaxonomy === undefined) {
            return unlockedResourceTaxonomies;
        } else {
            return unlockedResourceTaxonomies.filter(r => r.taxonomy === resourceTaxonomy);
        }
    }

    function getUnlockedResourceTaxonomyTypes(): ResourceTaxonomy[] {
        const unlockedResourceTaxonomies = resources.value.filter(r => r.isUnlocked);
        const uniqueTypes = new Set<ResourceTaxonomy>();
        unlockedResourceTaxonomies.forEach(r => uniqueTypes.add(r.taxonomy));
        return Array.from(uniqueTypes);
    }

    function getResourceByName(name: string): Resource | undefined {
        return resources.value.find(r => r.name === name);
    }

    function getResourcesByType(type: ResourceTaxonomy): Resource[] {
        return resources.value.filter(r => r.taxonomy === type);
    }

    // Expose state and functions
    return {
        resources,
        getAllResources,
        getUnlockedResourceTaxonomies,
        getUnlockedResourceTaxonomyTypes,
        getUnlockedResourcesByTaxonomy,
        getResourcesByType,
        getResourceByName,
    };
});
