import { createApp } from 'vue';
import App from './App.vue';
import './assets/sass/main.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';

import mitt from 'mitt';

import { VueMasonryPlugin } from "vue-masonry/src/masonry-vue3.plugin";

import globals from './js/globals.js';
import getSettingsStore from './js/settings/settings.js';
import getShortcutStore from './js/shortcuts/shortcuts.js';
import initStore from './js/store';

const defaultSettings = globals.isDev ? require('./data/dev-settings.json')[globals.platform] : require('./data/default-settings.json')[globals.platform];

console.log(globals);
console.log(defaultSettings);

// settings store
const settingsStore = getSettingsStore(defaultSettings);

// shortcuts store
const dataStore = getShortcutStore(require('./data/shortcuts.json'));

// vuex store
const store = initStore(globals, settingsStore, dataStore);

const emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(VueMasonryPlugin);
app.use(store);
app.mount('#app');