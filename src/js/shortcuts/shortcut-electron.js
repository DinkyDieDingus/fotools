class ElectronShortcutStore {
    constructor(defaults) {
        this.defaults = defaults;
    }

    load() {
        let saveShortcut = window.electron.getShortcuts();
        if (saveShortcut === null) {
            return this.reset();
        }

        return saveShortcut;
    }

    save(shortcuts) {
        let savedArray = JSON.parse(JSON.stringify(shortcuts));
        window.electron.setShortcuts(savedArray);
    }

    reset() {
        let shortcuts = [...this.defaults];

        for (let i = 0; i < shortcuts.length; i++) {
            shortcuts[i].order = i;
            shortcuts[i].isShowing = false;
        }

        window.electron.setShortcuts(shortcuts);

        return shortcuts;
    }
}

export default ElectronShortcutStore;