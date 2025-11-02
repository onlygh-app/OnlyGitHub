import { app } from 'electron';
import { setupGitHubIPCHandlers } from './services/ipc';
import { createMainWindow, setupCSPBypass, setupAppLifecycle } from './services/window';

if (require('electron-squirrel-startup')) {
  app.quit();
}

app.whenReady().then(() => {
  setupCSPBypass();
  setupGitHubIPCHandlers();

  createMainWindow();

  setupAppLifecycle(() => createMainWindow());
});
