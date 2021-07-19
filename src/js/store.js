import { createStore } from 'vuex';

const initStore = function(globals, settingsStore, shortcutStore) {
    const store = createStore({
        state() {
            return {
                globals: globals,
                settings: settingsStore.loadSettings(),
                shortcuts: shortcutStore.load(),
            }
        },
        mutations: {
            updateSetting(state, payload) {
                state.settings[payload.setting] = payload.value;
                settingsStore.saveSetting(payload.setting, payload.value);
            },
            resetSettings(state) {
                state.settings = settingsStore.resetSettings();
            },
            saveShortcuts(state) {
                shortcutStore.save(state.shortcuts);
            },
            resetShortcuts(state) {
                state.shortcuts = shortcutStore.reset();
            },
            reorderShortcuts(state, payload) {
                let temp = state.shortcuts[payload.abs + payload.rel];
                state.shortcuts[payload.abs + payload.rel] = state.shortcuts[payload.abs];
                state.shortcuts[payload.abs + payload.rel].order = payload.abs + payload.rel;
                state.shortcuts[payload.abs] = temp;
                state.shortcuts[payload.abs].order = payload.abs;
            }
        }

    });

    return store;
}

export default initStore;