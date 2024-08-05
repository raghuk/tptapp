import { app, BrowserWindow, ipcMain, session } from 'electron';
import path from 'path';


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'Transport and Insurance Portal',
    width: 800, height: 600, show: false,
    icon: path.join(__dirname, '../../resources/icons/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // setting additional configurations
  mainWindow.setMenu(null);
  mainWindow.maximize();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
};

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["*"],
      },
    });
  });
});

// Quit when all windows are closed, except on macOS. There, it's common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process code.
// You can also put them in separate files and import them here.

//------------------------------ Print & Preview Functions ------------------------------

const printOptions = {
  silent: false, printBackground: true, color: true, landscape: false, pagesPerSheet: 1, collate: false, copies: 1,
  margin: { marginType: 'printableArea', }, header: 'Page Header', footer: 'Page Footer',
};

ipcMain.handle('printComponent', async (event, url) => {
  const printWindow = new BrowserWindow({ show: false });

  printWindow.webContents.once('did-finish-load', () => {
    printWindow.webContents.print({ ...printOptions, pageSize: 'A4' }, (success, failureReason) => {
      if (!success) {
        console.log(failureReason);
      }
    });
  });

  await printWindow.loadURL(url);
  return 'shown print dialog';
});

ipcMain.handle('previewComponent', async (event, url) => {
  let previewWindow = new BrowserWindow({
    parent: mainWindow, title: 'Preview', show: false, autoHideMenuBar: true,
    icon: path.join(__dirname, '../../resources/icons/icon.png'),
    webPreferences: { nodeIntegration: true, contextIsolation: false, }
  });

  previewWindow.webContents.once('did-finish-load', () => {
    previewWindow.webContents.printToPDF({ ...printOptions, pageSize: 'A4' }).then((data) => {
      const bufferData = Buffer.from(data);
      const printData = 'data:application/pdf;base64,' + bufferData.toString('base64');

      previewWindow.once('ready-to-show', () => {
        previewWindow.once('page-title-updated', (e) => e.preventDefault());
        previewWindow.show();
      });

      previewWindow.once('closed', () => previewWindow = null);

      previewWindow.loadURL(printData);

    }).catch((error) => { console.log(error); });
  });

  await previewWindow.loadURL(url);
  return 'shown preview window';
});
