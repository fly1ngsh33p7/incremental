<template>
    <div id="resource-manager-group" class="container">
        <div class="heading">ResourceManagerGroup</div>
        <ResourceManager :resource="resourceWood" />
        <ResourceManager :resource="resourceStone" />
        <ResourceManager :resource="resourceGold" />
        <ResourceManager :resource="resourceIron" />
    </div>
</template>

<script lang="ts">
    import { Resource, type CostFunction } from '../Resource';
    import ResourceManager from './ResourceManager.vue';

    export default {
        name: 'ResourceManagerGroup',
        setup() {
            console.log('---');
            console.log(
                'Exponential (doubling) Cost Function Example:',
            );

            const resourceWood = new Resource('Wood', 0, 10);
            console.log(resourceWood.toString());
            resourceWood.addAmount(5);
            resourceWood.addAmount(5);
            resourceWood.addAmount(5);

            console.log('---');
            console.log('Linear Cost Function Example:');

            const linearCostFunction: CostFunction = (
                initialCost,
                amount,
            ) => Math.max(initialCost * amount, 1);
            const resourceStone = new Resource(
                'Stone',
                0,
                5,
                linearCostFunction,
            );
            console.log(resourceStone.toString());
            resourceStone.addAmount(5);
            resourceStone.addAmount(5);
            resourceStone.addAmount(5);

            console.log('---');
            console.log('Piecewise Cost Function Example:');

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

            const resourceGold = new Resource(
                'Gold',
                0,
                2,
                piecewiseCostFunction,
            );
            console.log(resourceGold.toString());
            resourceGold.addAmount(5);
            resourceGold.addAmount(5);
            resourceGold.addAmount(5);

            console.log('---');

            const resourceIron = new Resource(
                'Iron',
                0,
                5,
                (initialCost, amount) =>
                    Math.max(initialCost * amount, 1),
            );
            console.log(resourceIron.toString());
            resourceIron.addAmount(5);
            resourceIron.addAmount(5);
            resourceIron.addAmount(5);

            return {
                resourceWood,
                resourceStone,
                resourceGold,
                resourceIron,
            };
        },
        mounted(): void {
            // run on mount
            // afunction();
        },
        components: {
            // OtherComponent, // used components
            ResourceManager,
        },
    };
</script>

<style scoped>
    #resource-manager-group {
        /* css */
    }
</style>
