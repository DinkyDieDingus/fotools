const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'electron', {
        openPDF: (link, browser) => ipcRenderer.send('open-pdf', link, browser),
        getPDFPath: () => ipcRenderer.invoke('get-pdf-path').then(result => {
            return result;
        }),
        getSetting: (setting) => ipcRenderer.sendSync('get-setting', setting),
        setSetting: (setting, value) => ipcRenderer.send('set-setting', setting, value),
        platform: process.platform
    }
);