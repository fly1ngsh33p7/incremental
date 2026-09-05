import { defineStore } from 'pinia';
import { Resource, type CostFunction } from '@/Resource';
import { computed, ref } from 'vue';

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
            new Resource('Wood', 0, 10, true),
            new Resource('Stone', 0, 5, true, linearCostFunction),
            new Resource('Gold', 0, 2, true, piecewiseCostFunction),
            new Resource('Iron', 0, 5, true, (initialCost, amount) =>
                Math.max(initialCost * amount, 1),
            ),
            new Resource(
                'Diamond',
                0,
                20,
                false,
                (initialCost, amount) =>
                    Math.pow(initialCost, Math.pow(amount, 2)),
            ),
        ];
    }

    // Call initFunction immediately when the store is created
    initFunction();

    // Getters (as computed properties)
    const getAllResources = computed(() => resources.value);
    const getUnlockedResources = computed(() =>
        resources.value.filter(r => r.isUnlocked),
    );
    function getResourceByName(name: string): Resource | undefined {
        return resources.value.find(r => r.name === name);
    }

    // Expose state and functions
    return {
        resources,
        getAllResources,
        getUnlockedResources,
        getResourceByName,
    };
});
