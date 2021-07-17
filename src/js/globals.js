const isElectron = process.env.VUE_APP_ELECTRON === 'true';

let isWebsite = process.env.VUE_APP_WEBSITE === 'true';

let platform = 'local';
if (isWebsite) {
    platform = 'website';
} else if (isElectron) {
    platform = window.electron.platform;
}

const globals = Object.freeze({
    isDev: process.env.NODE_ENV === 'development',
    isWebsite,
    isElectron,
    platform
});

export default globals;