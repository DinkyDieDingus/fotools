import globals from './globals.js';

const getSettingsStore = function() {
    if (globals.isDev || !globals.isDev) {
        let CookieStore = require('./settings-cookie.js').default;
        return new CookieStore;
    }
}

export default getSettingsStore;