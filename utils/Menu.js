exports.createTemplate = (app) => {
  return [
    {
      // Name of menu point
      label: process.platform === "darwin" ? app.getName() : "Menu",
      // Array of options
      submenu: [
        // One of option
        {
          // Name
          label: "Exit",
          // Action
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      // Name of menu point
      label: "Edit",
      submenu: [
        {
          label: "Undo",
          // Hotkeys
          accelerator: "CmdOrCtrl+Z",
          // Role defined already some predefined behavior
          // More here: https://www.electronjs.org/docs/api/webview-tag#methods
          role: "undo",
        },
        {
          label: "Redo",
          accelerator: "Shift+CmdOrCtrl+Z",
          selector: "redo:",
        },
        {
          type: "separator",
        },
        {
          label: "Cut",
          accelerator: "CmdOrCtrl+X",
          selector: "cut:",
        },
        {
          label: "Copy",
          accelerator: "CmdOrCtrl+C",
          selector: "copy:",
        },
        {
          label: "Paste",
          accelerator: "CmdOrCtrl+V",
          selector: "paste:",
        },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:",
        },
      ],
    },
    {
      // Name of menu point
      label: "View",
      submenu: [
        {
          // Name
          label: "Reload",
          // Hotkey
          accelerator: "CmdOrCtrl+R",
          // Function for execute
          click: (_, focusedWindow) => {
            if (focusedWindow) {
              // on reload, start fresh and close any old
              // open secondary windows
              if (focusedWindow.id === 1) {
                // console.log('in FOCUS!');
                const { BrowserWindow } = require("electron");
                // Close all other windows
                BrowserWindow.getAllWindows().forEach((win) => {
                  if (win.id > 1) {
                    // console.log('Closing!');
                    win.close();
                  }
                });
              }
              focusedWindow.reload();
            }
          },
        },
        {
          // Name
          label: "Toggle Full Screen",
          // Hotkey
          accelerator: (() => {
            if (process.platform === "darwin") {
              return "Ctrl+Command+F";
            } else {
              return "F11";
            }
          })(),
          // Function for execute
          click: (_, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          },
        },
        {
          // Name
          label: "Toggle Developer Tools",
          // Hotkey
          accelerator: (() => {
            if (process.platform === "darwin") {
              return "Alt+Command+I";
            } else {
              return "Ctrl+Shift+I";
            }
          })(),
          // Function for execute
          click: (_, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.toggleDevTools();
            }
          },
        },
        // Horizontal line
        {
          type: "separator",
        },
        {
          // Name
          label: "App Menu Demo",
          // Hotkey
          accelerator: "F2",
          // Function for execute
          click: function (_, focusedWindow) {
            if (focusedWindow) {
              const options = {
                type: "info",
                // Window title
                title: "Application Menu Demo",
                // Buttons
                buttons: ["Ok", "Cancel"],
                // Text of window
                message:
                  "This demo is for the Menu section, showing how to create a clickable menu item in the application menu.",
              };
              const { dialog } = require("electron");
              dialog.showMessageBox(focusedWindow, options);
            }
          },
        },
      ],
    },
    {
      label: "Window",
      role: "window",
      submenu: [
        {
          label: "Minimize",
          accelerator: "CmdOrCtrl+M",
          // Role of button
          role: "minimize",
        },
        {
          label: "Close",
          accelerator: "CmdOrCtrl+W",
          role: "close",
        },
        {
          type: "separator",
        },
        {
          label: "Reopen Window",
          accelerator: "CmdOrCtrl+Shift+T",
          // Active or not (true / false)
          enabled: false,
          // app.on(event) ---> from main.js
          click: () => {
            app.emit("activate");
          },
        },
      ],
    },
    {
      // Open the website of electron
      label: "Help",
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: () => {
            // The shell module provides functions related to desktop integration.
            // An example of opening a URL in the user's default browser:
            const { shell } = require("electron");
            shell.openExternal("http://electron.atom.io");
          },
        },
      ],
    },
  ];
};
