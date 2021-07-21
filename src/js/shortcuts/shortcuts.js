import globals from '../globals.js';
import LocalShortcutStore from './shortcut-local';
import ElectronShortcutStore from './shortcut-electron';

const getShortcutStore = function(defaultSettings) {
    if (!globals.isElectron) {
        return new LocalShortcutStore(defaultSettings);
    } else {
        return new ElectronShortcutStore(defaultSettings);
    }
}

export default getShortcutStore;