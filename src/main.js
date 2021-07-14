import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import './assets/sass/main.scss';

import mitt from 'mitt';

import { VueMasonryPlugin } from "vue-masonry/src/masonry-vue3.plugin";

import globals from './js/globals.js';
import getSettingsStore from './js/settings.js';

let browser;
let pdfLink;
switch (globals.platform) {
    case 'darwin':
        browser = 'chrome';
        pdfLink = globals.isDev ? 'file:///Users/seanspiegl/Dropbox/Fallout Core Rulebook WEB 210412.pdf' : '';
        break;
    case 'linux':
        browser = 'chromium';
        pdfLink = globals.isDev ? 'file:///home/sean/Documents/Fallout/Fallout%20Core%20Rulebook%20WEB%20210412.pdf': '';
        break;
    default:
        browser = 'chrome';
        pdfLink = '';
        break;
}

const defaultSettings = {
    browser,
    pdfLink
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