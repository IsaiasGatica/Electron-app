const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const ExcelJS = require("exceljs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 1000,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("windows/index.html");
}
app.whenReady().then(() => {
  createWindow();
  handleFileOperations();
});

function handleFileOperations() {
  let datosDinamicos = [];

  ipcMain.on("agregar-datos", (event, nuevoDato) => {
    datosDinamicos.push(nuevoDato);
    actualizarArchivo();
  });

  function actualizarArchivo() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Datos");

    // Agregar encabezados al archivo Excel
    if (datosDinamicos.length === 1) {
      const headers = Object.keys(datosDinamicos[0]);
      sheet.addRow(headers);
    }

    // Agregar filas al archivo Excel
    datosDinamicos.forEach((dato) => {
      const values = Object.values(dato);
      sheet.addRow(values);
    });

    const rutaArchivo = "archivo.xlsx";

    workbook.xlsx
      .writeFile(rutaArchivo)
      .then(() => {
        console.log(`Archivo Excel actualizado en: ${rutaArchivo}`);
      })
      .catch((err) => {
        console.error("Error al escribir el archivo Excel:", err);
      });
  }
}
