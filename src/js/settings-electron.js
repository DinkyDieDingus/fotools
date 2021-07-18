class ElectronSettingsStore {
    constructor(defaults) {
        this.defaults = defaults;
    }

    loadSettings() {
        let settings = {...this.defaults };

        for (let setting in settings) {
            let savedSetting = window.electron.getSetting(setting);
            if (savedSetting) {
                settings[setting] = savedSetting;
            } else {
                window.electron.setSetting(setting, settings[setting]);
            }
        }

        return settings;
    }

    saveSetting(setting, value) {
        window.electron.setSetting(setting, value);
    }

    resetSettings() {
        let settings = {...this.defaults };

        for (let setting in settings) {
            window.electron.setSetting(setting, settings[setting]);
        }

        return settings;
    }
}

export default ElectronSettingsStore;