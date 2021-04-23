// file for functions from MAIN process
// that I can use in renderer process
const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  batteryApi: {},
  fileApi: {},
});
