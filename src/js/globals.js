const globals = Object.freeze({
    isDev: process.env.NODE_ENV === 'development',
    isWebsite: process.env.VUE_APP_WEBSITE === 'true',
    isElectron: process.env.VUE_APP_ELECTRON === 'true'
});

export default globals;