import { createApp } from 'vue';
import { createPinia } from 'pinia';

import Game from './Game.vue';
import router from './router';
import { useResourcesStore } from './stores/resources.ts';
import { Resource, type CostFunction } from './Resource.ts';

const game = createApp(Game);

game.use(createPinia());
game.use(router);

game.mount('#game');
