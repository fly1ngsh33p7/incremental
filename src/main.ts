import { createApp } from 'vue';
import { createPinia } from 'pinia';

import Game from './Game.vue';

const game = createApp(Game);

game.use(createPinia());

game.mount('#game');
