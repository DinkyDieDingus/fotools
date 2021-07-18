import globals from './globals.js';
import CookieStore from './settings-cookie';
import ElectronStore from './settings-electron';

const getSettingsStore = function(defaultSettings) {
    if (!globals.isElectron) {
        return new CookieStore(defaultSettings);
    } else {
        return new ElectronStore(defaultSettings);
    }
}

export default getSettingsStore;