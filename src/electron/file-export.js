import { promisify } from 'util';
import { ipcMain, dialog } from 'electron';
import fs from 'fs';

const writeFileAsync = promisify(fs.writeFile);

function registerFileExport() {
    ipcMain.handle('export-file', async(event, contents) => {
        let path = await dialog.showSaveDialog({
            title: 'Choose export location',
            defaultPath: 'fo-shortcuts.json'
        });

        if (!path.canceled) {
            console.log('saving to path', path.filePath);
            try {
                let data = contents;
                if (typeof contents !== 'string') {
                    data = JSON.stringify(contents, null, 4);
                }
                await writeFileAsync(path.filePath, data);
                return true;
            } catch (err) {
                console.error(err);
                dialog.showErrorBox('Cannot Export File', err.message);
                return false;
            }
        }
        return false;
    });
}

export default registerFileExport;