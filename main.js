// main process
const { app, BrowserWindow, Notification } = require("electron");

// create app's window
function createWindow() {
  // browser window === renderer process
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // load html file
  win.loadFile("index.html");

  // open dev tools automaticaly
  win.webContents.openDevTools();
}

// when app is ready - execute our function
// createWindow - for window creation
app.whenReady().then(() => {
  createWindow();

  const notification = new Notification({
    title: "Hello world",
    body: "My test message",
  });
  notification.show();
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
