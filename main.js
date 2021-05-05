// main process
const { app, BrowserWindow, ipcMain, Notification, Menu } = require("electron");
const { resolve } = require("path");

// Image file
const dockIcon = resolve(__dirname, "assets", "images", "js-big.png");

// app.isPackaged === true -> PRODUCTION
// app.isPackaged === false -> DEVELOPMENT
const isDev = !app.isPackaged;

// create app's window
function createWindow() {
  // browser window === renderer process
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#6e707e",
    webPreferences: {
      // With nodeIntegration: true we can use node modules in index.html
      // Electron v 12 required contextIsolation: false to execute JS in html
      // nodeIntegration: true,
      // contextIsolation: false,

      // safe options

      nodeIntegration: false,
      // worldSafeExecuteJavaScript will sanitize JS code
      // worldSafeExecuteJavaScript: true,
      // contextIsolation is a feature that ensures that both
      // (preload scripts and electron internal logic run
      // in separate context)
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,

      // PRELOAD
      preload: resolve(__dirname, "preload.js"),
    },
  });

  // load html file
  win.loadFile("index.html");

  // open dev tools automaticaly
  isDev && win.webContents.openDevTools();
}

// create second window
function createSecondWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#6e707e",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
    },
  });

  // load html file
  win.loadFile("second.html");
}

// Auto reload in DEVELOPMENT mode
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: resolve(__dirname, "node_modules", ".bin", "electron"),
  });
}

// Set icon for macOS
if (process.platform === "darwin") {
  app.dock.setIcon(dockIcon);
}

// when app is ready - execute our function
// createWindow - for window creation
app.whenReady().then(() => {
  const template = require("./utils/Menu").createTemplate(app);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  createWindow();
  createSecondWindow();

  // ----------------------------
  // console.log is working here ONLY in terminal
  // const parsed = path.parse("/home/user/dir/file.txt");
  // console.log(parsed.base);
  // console.log(parsed.ext);
  // ----------------------------

  // ----------------------------
  // Notifications in system
  // const notification = new Notification({
  //   title: "Hello world",
  //   body: "My test message",
  // });
  // notification.show();
  // ----------------------------
});

// create notification
ipcMain.on("notify", (_, message) => {
  new Notification({
    title: "Notification",
    body: message,
  }).show();
});

// event for quit app
ipcMain.on("app-quit", () => {
  app.quit();
});

// .on() --> add events
// window-all-closed - close all windows of electron application
// process.platform:
// win32
// linux
// darwin
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// activate - mac os feature. click on app's icon - reopen app
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Webpack -> is a module builder,
// main purpose is to bundle JS files for
// usage in browser

// Babel -> is a JS compiler
