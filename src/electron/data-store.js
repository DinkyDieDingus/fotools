import Store from 'electron-store';
import { ipcMain } from 'electron';

function initStore() {
    const store = new Store({ name: 'data' });

    ipcMain.on('get-data', (event, key) => {
        let result = store.get(key);
        console.log('getting data', key);
        event.returnValue = result;
    });

    ipcMain.on('set-data', (event, key, value) => {
        console.log('setting data', key);
        store.set(key, value);
    });
}

export default initStore;