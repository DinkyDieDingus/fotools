const isElectron = process.env.VUE_APP_ELECTRON === 'true';

let isWebsite = process.env.VUE_APP_WEBSITE === 'true';

let platform = 'local';
if (isWebsite) {
    platform = 'website';
} else if (isElectron) {
    platform = window.electron.platform;
}

let browserList;
switch (platform) {
    case 'linux':
        browserList = ['chromium', 'chrome', 'firefox'];
        break;
    case 'darwin':
        browserList = ['chrome', 'firefox'];
        break;
    case 'win32':
        browserList = ['chrome', 'firefox'];
        break;
}

const globals = Object.freeze({
    isDev: process.env.NODE_ENV === 'development',
    isWebsite,
    isElectron,
    platform,
    browserList: Object.freeze(browserList)
});

export default globals;