import Store from 'electron-store';
import { ipcMain } from 'electron';

function initStore() {
    const store = new Store();

    ipcMain.on('set-setting', (event, setting, value) => {
        console.log('set setting', setting, value);
        store.set(setting, value);
    });

    ipcMain.on('get-setting', (event, setting) => {
        console.log('getting setting', setting);
        let result = store.get(setting);
        console.log('store result', result);
        event.returnValue = result;
    });
}

export default initStore;