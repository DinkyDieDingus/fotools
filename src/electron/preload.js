const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'electron', {
        openPDF: (link, browser) => ipcRenderer.send('open-pdf', link, browser)
    }
);