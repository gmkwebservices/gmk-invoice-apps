const { app, BrowserWindow, shell, Menu, dialog } = require('electron');
const path = require('path');
const cfg = require('./config');

if (!app.requestSingleInstanceLock()) { app.quit(); }

let win;

function isInternal(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && cfg.INTERNAL_HOSTS.some(h => u.hostname === h || u.hostname.endsWith('.' + h));
  } catch (e) { return false; }
}

function create() {
  win = new BrowserWindow({
    width: 1360, height: 860, minWidth: 420, minHeight: 600,
    title: cfg.TITLE,
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    backgroundColor: '#ffffff',
    autoHideMenuBar: true,
    show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: true }
  });
  Menu.setApplicationMenu(null);
  // Tells the server which app version this is, so it can offer an update when a newer release is published.
  win.webContents.setUserAgent(win.webContents.getUserAgent().replace(/ Electron\/[\d.]+/, '') + ' GMKInvoiceApp/' + app.getVersion());
  win.once('ready-to-show', () => win.show());
  win.loadURL(cfg.START_URL);

  // Anything that is not your site / PayFast (WhatsApp, mailto:, other websites) opens in the normal browser or mail app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    // "Continue with Google": Google refuses app windows, so that page opens in the normal browser (marked gmk_ext=1).
    if (url.includes('gmk_ext=1')) { shell.openExternal(url); return { action: 'deny' }; }
    if (isInternal(url)) return { action: 'allow' };
    shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (url.includes('gmk_ext=1')) { e.preventDefault(); shell.openExternal(url); return; }
    if (!isInternal(url) && !url.startsWith('file:')) { e.preventDefault(); shell.openExternal(url); }
  });
  // No internet: show a friendly page with a Retry button.
  win.webContents.on('did-fail-load', (e, code, desc, url, isMain) => {
    if (isMain && code !== -3) win.loadFile(path.join(__dirname, 'offline.html'));
  });
  win.on('page-title-updated', ev => ev.preventDefault());
}

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(() => {
  create();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) create(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
