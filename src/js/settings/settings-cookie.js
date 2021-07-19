import Cookies from 'js-cookie';

class CookieSettingsStore {
    constructor(defaults) {
        this.defaults = defaults;
    }

    loadSettings() {
        Cookies.defaults.expires = 365;
        let settings = {...this.defaults };

        for (let setting in settings) {
            let savedSetting = Cookies.get(setting);
            if (savedSetting) {
                settings[setting] = savedSetting;
            } else {
                Cookies.set(setting, settings[setting]);
            }
        }

        return settings;
    }

    saveSetting(setting, value) {
        Cookies.set(setting, value);
    }

    resetSettings() {
        let settings = {...this.defaults };

        for (let setting in settings) {
            Cookies.set(setting, settings[setting]);
        }

        return settings;
    }
}

export default CookieSettingsStore;