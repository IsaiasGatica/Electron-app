// Escuchar eventos del proceso principal
window.ipcRenderer.on("serial-data", (event, data) => {
  // Procesar los datos del puerto serie en el script del renderizado
  console.log("Datos del puerto serie:", data);
  // Realizar acciones con los datos según sea necesario
});
