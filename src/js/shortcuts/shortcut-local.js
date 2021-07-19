import LocalStorage from 'local-storage';

class LocalShorcutStore {
    constructor(defaults) {
        this.defaults = defaults;
    }

    load() {
        let saveShortcut = LocalStorage.get('shortcuts');
        if (saveShortcut === null) {
            return this.reset();
        }

        return saveShortcut;
    }

    save(shortcuts) {
        LocalStorage.set('shortcuts', shortcuts);
    }

    reset() {
        let shortcuts = [...this.defaults];

        for (let i = 0; i < shortcuts.length; i++) {
            shortcuts[i].order = i;
            shortcuts[i].isShowing = false;
        }

        LocalStorage.set('shortcuts', shortcuts);

        return shortcuts;
    }
}

export default LocalShorcutStore;