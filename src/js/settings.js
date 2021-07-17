import globals from './globals.js';
import CookieStore from './settings-cookie';
import ElectronStore from './settings-electron';

const getSettingsStore = function() {
    if (!globals.isElectron) {
        return new CookieStore();
    } else {
        return new ElectronStore();
    }
}

export default getSettingsStore;