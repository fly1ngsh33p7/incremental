import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { useResourcesStore } from './stores/resources.ts';
import { Resource, type CostFunction } from './Resource.ts';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const resourcesStore = useResourcesStore();

app.mount('#app');

const resourceWood = new Resource('Wood', 0, 10);
console.log(resourceWood.toString());
resourceWood.addAmount(1);
console.log(resourceWood.toString());
resourceWood.addAmount(1);
console.log(resourceWood.toString());

console.log('---');

const linearCostFunction: CostFunction = (initialCost, amount) => Math.max(initialCost * amount, 1);
const resourceStone = new Resource('Stone', 0, 5, linearCostFunction);
console.log(resourceStone.toString());
resourceStone.addAmount(1);
console.log(resourceStone.toString());
resourceStone.addAmount(1);
console.log(resourceStone.toString());
resourceStone.addAmount(1);
console.log(resourceStone.toString());

console.log('---');

const piecewiseCostFunction: CostFunction = (initialCost, amount) => {
    if (amount < 5) {
        return initialCost * amount;
    } else if (amount < 10) {
        return initialCost * Math.pow(amount, 2);
    } else {
        return initialCost * Math.pow(amount, 3);
    }
};

const resourceGold = new Resource('Gold', 0, 2, piecewiseCostFunction);
resourceGold.addAmount(1);
console.log(resourceGold.toString());
resourceGold.addAmount(1);
console.log(resourceGold.toString());
resourceGold.addAmount(1);
console.log(resourceGold.toString());
