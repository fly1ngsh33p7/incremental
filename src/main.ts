import { createApp } from 'vue';
import { createPinia } from 'pinia';

import Game from './Game.vue';
import { useResourcesStore } from './stores/resources.ts';
import { Resource, type CostFunction } from './Resource.ts';

const game = createApp(Game);

game.use(createPinia());

game.mount('#game');
