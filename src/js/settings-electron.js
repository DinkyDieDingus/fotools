class ElectronSettingsStore {
    loadSettings(defaults) {
        let settings = {...defaults };

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
}

export default ElectronSettingsStore;