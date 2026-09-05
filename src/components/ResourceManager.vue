<template>
    <div id="resource-manager" class="container">
        <div class="heading">Resource Manager</div>
        <div class="resource-info">
            <p>Name: {{ resource.name }}</p>
            <p>Amount: {{ resource.amount }}</p>
            <p>Initial Cost: {{ resource.initialCost }}</p>
            <p>Current Cost: {{ resource.getCurrentCost() }}</p>
        </div>
        <div class="buy-section">
            <label for="amount-input">Amount to Buy:</label>
            <input
                id="amount-input"
                v-model.number="amountToBuy"
                type="number"
                min="1"
                max="9999"
                step="1"
            />
            <button @click="buy">
                Buy {{ amountToBuy }} for {{ calculateCost() }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Resource } from '@/Resource';
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'ResourceManager',
        components: {
            // OtherComponent, // used components
        },
        props: { resource: { type: Resource, required: true } },
        data() {
            return {
                amountToBuy: 1,
            };
        },
        methods: {
            calculateCost(): number {
                let totalCost = 0;
                for (let i = 1; i <= this.amountToBuy; i++) {
                    totalCost += this.resource.costFunction(
                        this.resource.initialCost,
                        this.resource.amount + i,
                    );
                }
                return totalCost;
            },
            buy(): void {
                if (this.amountToBuy > 0) {
                    this.resource.addAmount(this.amountToBuy);
                    this.amountToBuy = 1;
                }
            },
        },
        mounted(): void {
            // run on mount
            // afunction();
        },
    });
</script>

<style scoped>
    #resource-manager > .buy-section > * {
        margin-left: 4px;
        margin-right: 4px;
    }

    #amount-input {
        width: 60px;
    }
</style>
