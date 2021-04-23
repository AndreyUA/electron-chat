// main process
const { app, BrowserWindow, Notification } = require("electron");
const path = require("path");

// app.isPackaged === true -> PRODUCTION
// app.isPackaged === false -> DEVELOPMENT
const isDev = !app.isPackaged;

// create app's window
function createWindow() {
  // browser window === renderer process
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      // With nodeIntegration: true we can use node modules in index.html
      // Electron v 12 required contextIsolation: false to execute JS in html
      // nodeIntegration: true,
      // contextIsolation: false,

      // safe options
      nodeIntegration: false,
      // worldSafeExecuteJavaScript will sanitize JS code
      worldSafeExecuteJavaScript: true,
      // contextIsolation is a feature that ensures that both
      // (preload scripts and electron internal logic run
      // in separate context)
      contextIsolation: true,
    },
  });

  // load html file
  win.loadFile("index.html");

  // open dev tools automaticaly
  isDev && win.webContents.openDevTools();
}

// Auto reload in DEVELOPMENT mode
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

// when app is ready - execute our function
// createWindow - for window creation
app.whenReady().then(() => {
  createWindow();

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
