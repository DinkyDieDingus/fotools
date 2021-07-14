import { ipcMain, dialog } from 'electron';
import { exec } from 'child_process';

const registerEvents = function() {
    ipcMain.on('open-pdf', (event, link, browser) => {
        console.log('using', browser);
        console.log('opening', link);
        if (browser === 'firefox') {
            exec(`firefox --newtab --url "${link}"`, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(stdout);
                console.log(stderr);
            });
        } else if (browser === 'chromium' || browser === 'chrome') {
            exec(`${browser} "${link}" &`, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(stdout);
                console.log(stderr);
            });
        }
    });

    ipcMain.handle('get-pdf-path', async(event) => {
        let result = dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                { name: 'PDF Documents', extensions: ['pdf'] }
            ]
        });
        return result;
    });


}

export default registerEvents;