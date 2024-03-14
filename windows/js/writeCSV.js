const { ipcRenderer } = require("electron");

function testCSV() {
  // Ejemplo de uso:
  ipcRenderer.send("agregar-datos", { id: 1, nombre: "Ejemplo", edad: 25 });
}
