const isElectron = process.env.VUE_APP_ELECTRON === 'true';
let platform = 'browser';
if (isElectron) {
    platform = window.electron.platform;
}

const globals = Object.freeze({
    isDev: process.env.NODE_ENV === 'development',
    isWebsite: process.env.VUE_APP_WEBSITE === 'true',
    isElectron,
    platform
});

export default globals;