import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import './assets/sass/main.scss';

import mitt from 'mitt';

import { VueMasonryPlugin } from "vue-masonry/src/masonry-vue3.plugin";

import globals from './js/globals.js';
import getSettingsStore from './js/settings.js';

const defaultSettings = {
    browser: 'chromium',
    pdfLink: globals.isDev ? 'file:///home/sean/Documents/Fallout/Fallout%20Core%20Rulebook%20WEB%20210412.pdf' : ''
};

console.log(globals);

const settingsStore = getSettingsStore();

const store = createStore({
    state() {
        return {
            globals: globals,
            settings: settingsStore.loadSettings(defaultSettings)
        }
    },
    mutations: {
        updateSetting(state, payload) {
            state.settings[payload.setting] = payload.value;
            settingsStore.saveSetting(payload.setting, payload.value);
        }
    }

});

const emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(VueMasonryPlugin);
app.use(store);
app.mount('#app');