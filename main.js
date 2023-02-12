const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1299,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light';
      console.log('ipcMain:nativeTheme.themeSource: light');
    } else {
      nativeTheme.themeSource = 'dark';
      console.log('ipcMain:nativeTheme.themeSource: dark');
    }
    console.log('ipcMain:nativeTheme.default');
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle('dark-mode:system', () => {
    console.log('ipcMain:nativeTheme.themeSource: system');
    nativeTheme.themeSource = 'system';
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
