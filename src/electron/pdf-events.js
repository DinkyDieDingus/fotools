import { ipcMain, dialog } from 'electron';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const registerEvents = function() {
    ipcMain.on('open-pdf', (event, link, browser) => {
        console.log('using', browser);
        console.log('opening', link);

        let logErrors = (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                dialog.showErrorBox('Cannot Open PDF', err.message);
                return;
            }
            console.log(stdout);
            console.log(stderr);
        }

        switch (process.platform) {
            case 'linux':
                switch (browser) {
                    case "chrome":
                    case "chromium":
                        exec(`${browser} "${link}" &`, logErrors);
                        break;
                    case "firefox":
                        exec(`firefox --newtab --url "${link}"`, logErrors);
                        break;
                }
                break;
            case 'darwin':
                let html = `<head><meta http-equiv="refresh" content="0; url=${link}"/></head>`;
                let redirectFile = 'redirect.html';
                if (process.env.NODE_ENV === 'production') {
                    redirectFile = '../../../' + redirectFile;
                }
                let absPath = path.join(__dirname + redirectFile);
                fs.writeFileSync(absPath, html);
                try {
                    switch (browser) {
                        case "chrome":
                            exec(`open -a "Google Chrome" ${absPath}`, logErrors);
                            break;
                        case "firefox":
                            exec(`open -a "Firefox" ${absPath}`, logErrors);
                            break;
                    }
                } catch (err) {
                    console.error(err);
                    dialog.showErrorBox('Cannot Open PDF', err.message);
                }

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