import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import './assets/sass/main.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';

import mitt from 'mitt';

import { VueMasonryPlugin } from "vue-masonry/src/masonry-vue3.plugin";

import globals from './js/globals.js';
import getSettingsStore from './js/settings.js';

const defaultSettings = globals.isDev ? require('./data/dev-settings.json')[globals.platform] : require('./data/default-settings.json')[globals.platform];

console.log(globals);
console.log(defaultSettings);

// settings store
const settingsStore = getSettingsStore(defaultSettings);

// vuex store
const store = createStore({
    state() {
        return {
            globals: globals,
            settings: settingsStore.loadSettings()
        }
    },
    mutations: {
        updateSetting(state, payload) {
            state.settings[payload.setting] = payload.value;
            settingsStore.saveSetting(payload.setting, payload.value);
        },
        resetSettings(state) {
            state.settings = settingsStore.resetSettings();
        }
    }

});

const emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(VueMasonryPlugin);
app.use(store);
app.mount('#app');