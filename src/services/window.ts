import { app, BrowserWindow, session } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const createMainWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();

  return mainWindow;
};

export const setupCSPBypass = (): void => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const headers = details.responseHeaders;
    if (headers) {
      if (headers['content-security-policy']) {
        delete headers['content-security-policy'];
      }
      if (headers['Content-Security-Policy']) {
        delete headers['Content-Security-Policy'];
      }
    }
    callback({ cancel: false, responseHeaders: headers });
  });
};

export const setupAppLifecycle = (createWindow: () => BrowserWindow): void => {
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
};
