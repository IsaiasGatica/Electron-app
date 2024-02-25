const { contextBridge, ipcRenderer } = require("electron");

// Exponer ipcRenderer de forma segura al contexto de la página
contextBridge.exposeInMainWorld("ipcRenderer", {
  on: (channel, listener) => {
    ipcRenderer.on(channel, listener);
  },
  // Otros métodos que quieras exponer...
});
