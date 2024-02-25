## main.js

const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
const mainWindow = new BrowserWindow({
width: 800,
height: 600,
webPreferences: {
nodeIntegration: true,
},
});

mainWindow.loadFile('index.html');
};

app.whenReady().then(() => {
createWindow();

app.on('activate', () => {
if (BrowserWindow.getAllWindows().length === 0) {
createWindow();
}
});
});

app.on('window-all-closed', () => {
if (process.platform !== 'darwin') {
app.quit();
}
});

// Escucha eventos del puerto serie aquí
const SerialPort = require('serialport');
const ReadlineParser = require('@serialport/parser-readline');

const port = new SerialPort({
path: "COM7", // EDIT AS NEEDED
baudRate: 115200, // EDIT AS NEEDED
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

parser.on('data', (data) => {
// Procesa los datos del puerto serie según sea necesario
// Puedes enviar los datos al proceso de renderizado a través de IPC
mainWindow.webContents.send('serial-data', data);
});

## preload.js

// Este código se ejecutará en el contexto de la página web antes de cargar cualquier script en el proceso de renderizado

const { contextBridge, ipcRenderer } = require('electron');

// Exponer ipcRenderer al contexto de la página
contextBridge.exposeInMainWorld('ipcRenderer', {
send: (channel, data) => {
ipcRenderer.send(channel, data);
},
// Otros métodos que quieras exponer...
});

// Puedes exponer más funcionalidades de Node.js según sea necesario

## renderer.js

// Ahora puedes acceder a ipcRenderer y otras funcionalidades de Node.js desde el contexto de la página
ipcRenderer.on('serial-data', (event, data) => {
// Procesa los datos del puerto serie en el proceso de renderizado
console.log(data);
// Actualiza el gráfico u otros elementos de la interfaz de usuario según sea necesario
});
