const { app, BrowserWindow } = require("electron");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const path = require("path");

let mainWindow;
let port;
let parser;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile("windows/index.html");

  mainWindow.webContents.on("did-finish-load", () => {
    console.log("Main window did finish loading");

    // Configuración del puerto serie después de que la ventana principal esté lista
    port = new SerialPort({
      path: "COM7", // EDIT AS NEEDED
      baudRate: 115200, // EDIT AS NEEDED
    });

    parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

    parser.on("data", (data) => {
      // Procesa los datos del puerto serie según sea necesario
      // Puedes enviar los datos al proceso de renderizado a través de IPC
      if (mainWindow && !mainWindow.isDestroyed() && mainWindow.webContents) {
        mainWindow.webContents.send("serial-data", data);
      } else {
        console.error("mainWindow is not available");
      }
    });
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Manejar el evento de cierre de la aplicación
  app.on("before-quit", () => {
    // Detener la lectura del puerto serie antes de cerrar la aplicación
    if (port) {
      port.close();
    }
  });
});
