import Cookies from 'js-cookie';

class CookieSettingsStore {
    loadSettings(defaults) {
        Cookies.defaults.expires = 365;
        let settings = {...defaults };

        for (let setting in settings) {
            let savedSetting = Cookies.get(setting);
            if (savedSetting) {
                settings[setting] = savedSetting;
                Cookies.set(setting, savedSetting);
            } else {
                Cookies.set(setting, settings[setting]);
            }
        }

        return settings;
    }

    saveSetting(setting, value) {
        Cookies.set(setting, value);
    }
}

export default CookieSettingsStore;