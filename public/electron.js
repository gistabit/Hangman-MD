const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 990,
    height: 590,
    resizable: false,
    fullscreenable: false,
    icon: path.join(__dirname, '../assets/icons/mac/hangman-icon-15.icns'),
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: false
    }
  });

  const startURL = isDev
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, '../build/index.html')}`;

  console.log('Start URL:', startURL);

win.loadURL(startURL).catch(err => {
  console.error('Failed to load:', err);
});

if (isDev) {
win.webContents.openDevTools();
}
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
});
